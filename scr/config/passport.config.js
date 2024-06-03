
import passport from "passport";
import local from 'passport-local'
import { UserManagerMongo } from "../dao/userManagerMongo.js";
import { createHash, isValidPassword } from "../../utils/bcrypt.js";
import GitHubStrategy from 'passport-github2'

const LocalStrategy= local.Strategy
const userServ= new UserManagerMongo()

export const  initializePassport =()=>{
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField:'email'
    },async(req, username, password, done)=>{
        const {first_name, last_name}= req.body
        try{
            let userFound= await userServ.getUserBy({email: username})
            if (userFound){
                console.log('el usuario ya existe')
                return done(null,false)
            }
            let newUser={
                first_name,
                last_name,
                email: username,
                password:createHash(password)
            }
            let result=await userServ.createUser(newUser)
            return done(null, result)

        }catch (error){
            return done ('error al registrar usuario'+error)

        }
    }))

    passport.use('/login', new LocalStrategy({
        usernameField: 'email'
    },async(email, password, done)=>{
        try{
            const user= await userServ.getUserBy({email}) 
            if (!user){
                console.log('no existe el usuario, debe registrarse')
                return done (null, false)
            }
            if (!isValidPassword(password, {password: user.password}))return done(null,false)
                return done(null,user )


        }catch(error){
            return done(error)
        }
    }))
    passport.use('github', new GitHubStrategy({
        clientID: "Iv23liE156WW9vz7UfoC",
        clientSecret:'7220a061530cae76d4892e6838f7e3fc82ccb863',
        callbackURL:'http://localhost:8080/api/session/githubcallback',
    },async( accesToken, refreshToken, profile, done)=>{
        try{
            console.log('pro',profile)
            let email = profile._json.email || `${profile._json.login}@github.com`;
          let user= await userServ.getUserBy({email:email})
          console.log('pro',email)
          if(!user){
            let newUser={
                first_name:profile._json.name || profile._json.login,
                last_name:profile._json.name || profile._json.login,
                email,
                password:''

            }
            let result=await userServ.createUser(newUser)
            done(null,result)
          }else{
            done(null,user)
          }

        }catch(error){
            return done(error)
        }
    }))

   
      
  
    passport.serializeUser((user, done)=>{
        done(null,user._id)
    }),
    passport.deserializeUser(async(id,done)=>{
        try{
            let user= await userServ.getUserBy({_id:id})
            done (null, user)

        }catch(error){
            done(error)

        }
    })
}
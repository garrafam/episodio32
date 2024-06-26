import express from 'express'

import ProductManagerMongo from './dao/productsDaoMongo.js'
import routerApp from './routes/index.js'
import {__dirname} from './utils.js'
import handlebars from 'express-handlebars'

import { productSocket } from './utils/productsSocket.js'
import {Server as ServerIO} from 'socket.io'
import{Server as ServerHttp} from 'http'
import { error } from 'console'
import { connectDb, objectConfig } from './config/index.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import FileStore from 'session-file-store'
import MongoStore from 'connect-mongo'
import  {initializePassport } from './config/passport.config.js'
import passport from 'passport'
import dotenv from 'dotenv'
import { sendMessage } from './utils/sendMessage.js'
const {port}=objectConfig
//const path='./Product.json'
//const products= new ProductManager(path);
const products= new ProductManagerMongo();

const app= express()
const httpServer = new ServerHttp(app)
const io=new ServerIO(httpServer)


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))
app.use(cookieParser('s3cr3t@Firma'))
initializePassport()
app.use(passport.initialize())
app.use (session({
        store:MongoStore.create({
           mongoUrl: 'mongodb+srv://garrafa2006:zML4OgtalsVuQJtL@cluster0.foflomd.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0',
           mongoOptions: {
            useNewUrlParser:true,
            useUnifiedTopology:true,
           
           },
           ttl: 60*60*24
        }),
        secret:'s3cr3tC@der',
        resave:true,
        saveUninitialized:true
    }))
//mongoose.connect
connectDb()
initializePassport()
app.use(passport.initialize())
app.use(passport.session())
app.use(routerApp)
app.engine('hbs', handlebars.engine({
    extname:'.hbs',
    defaultLayout: 'main',
   
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
}}))
app.set('views', __dirname+'/views')
app.set('view engine', 'hbs')
//middl
app.use(productSocket(io))


httpServer.listen(port, error=> {
    if (error)console.log(error)
    console.log('server escuchando en puerto '+ port)
})
 sendMessage(io)

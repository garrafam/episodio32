import { objectConfig } from "../config/index.js";
import { connectDb } from "../config/index.js";


export let ProductsDao
export let CartsDao
export let UsersDao
export let TicketsDao

const MEMORY = "MEMORY";
const FS = "FS";
const MONGO = "MONGO";

switch(objectConfig.persistence){
    case MEMORY:
      break;
    case FS:
       const {default :ProductManager} = await import("./FS/productManager.js")
       const {default :CarManager} = await import("./FS/carManager.js")
       const {default: UserManager}= await import("./FS/userManager.js")
    
        ProductsDao= ProductManager
        CartsDao= CarManager   
        UsersDao= UserManager
        break;
    default :
    // MONGO:
    connectDb()
    const {default :ProductDaoMongo} = await import("./MONGO/productsDaoMongo.js")
    const {default :CartDaoMongo} = await import("./MONGO/cartDaoMongo.js")
    const {default :UserDaoMongo} = await import("./MONGO/userDaoMongo.js")
    const {default :TicketDaoMongo} = await import("./MONGO/ticketDaoMongo.js")

    ProductsDao=ProductDaoMongo
    CartsDao=CartDaoMongo
    UsersDao= UserDaoMongo
    TicketsDao= TicketDaoMongo

            break;   
}

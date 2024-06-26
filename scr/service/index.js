import UserManagerMongo from "../dao/userManagerMongo.js";
import ProductsDaosMongo from "../dao/productsDaoMongo.js";
import CartDaoMongo from "../dao/cartDaoMongo.js";

export const userService   = new UserManagerMongo()
export const productService= new ProductsDaosMongo()
export const cartService= new CartDaoMongo()


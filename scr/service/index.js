

import UserRepository from "../repositories/user.repository.js";
import { CartsDao, ProductsDao, TicketsDao, UsersDao } from "../dao/factory.js";
import ProductRepository from "../repositories/product.repository.js";
import CartRepository from "../repositories/cartRepository.js";
import TicketRepository from "../repositories/ticket.repository.js";

export const userService   = new UserRepository(new UsersDao())
export const productService= new ProductRepository(new ProductsDao())
export const cartService= new CartRepository(new CartsDao())
export const ticketService= new TicketRepository(new TicketsDao)

import {connect} from "mongoose";


export class MongoSingleston{
    static #instance
    constructor(){
        connect('mongodb+srv://garrafa2006:zML4OgtalsVuQJtL@cluster0.foflomd.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0')
    }
    static getInstance(){
        if( this.#instance){
            console.log('la base de datos ya esta conectada')
            return  this.#instance
        }
      this.#instance=new MongoSingleston()
        console.log('base de datos conectada')
        return  this.#instance
    }
}
import { connect } from "mongoose";
export const connectDb =() => {
 //connect('mongodb://127.0.0.1:27017/ecommerce')  
  connect('mongodb+srv://garrafa2006:zML4OgtalsVuQJtL@cluster0.foflomd.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0')
  console.log('base de datos conectada')

}

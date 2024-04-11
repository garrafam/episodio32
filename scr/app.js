//import ProductManager from "./productManager.js";
//const path='./Product.json'
//const products= new ProductManager(path);

//export default 'app.js'
console.log('estos son',products)






/**
 * Description placeholder
 * @date 24/3/2024 - 22:30:41
 *
 * @async
 * @param {string} title
 * @param {string} description
 * @param {number} price
 * @param {string} thumbnail
 * @param {string} code
 * @param {number} stock
 * @returns {*}
 */
const main= async ()=>{
      //const response= await products.addProduct({
      //  title:'cebolla',
      //  description:'prod1', 
      //  price:339,
      //  thumbnail:'sinruta',
      //  code:'ceb33', 
      //  stock:19,


   //})

   // const response= await products.getProductById(7);
   
   //const response= await products.getProduct();
   
   const response= await products.updateProduct((5),
    {

           title:'actualizacion12',
           description:'act', 
           price:123,
           thumbnail:'',
           code:'', 
           stock:50,

   })
   //const response= await products.deleteProduct(3);
  

  console.log("esto es lo que responde" ,response)
}
main()

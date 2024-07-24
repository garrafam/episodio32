import {faker} from '@faker-js/faker'

export const generateProducts=()=>{
    return{
       id_:faker.database.mongodbObjectId(),
       title:faker.commerce.productDescription(),
       price:faker.commerce.price() ,
       thumbnail:faker.image.url(),
       description:faker.commerce.productDescription(),       
       stock: parseInt(faker.string.numeric()),
       code: faker.string.alphanumeric()
    }
}
export const generateUserError=(user)=>{
    return `Hay una de las propiedades del usuario incompleta o no valida.
    Listado de propiedades requeridas:
    *first_name:necesita ser un string, pero se recibio ${user.first_name}
    *last_name:necesita ser un string, pero se recibio ${user.last_name}
    *email:necesita ser un string, pero se recibio ${user.email}
    `
}
export const generateProductsError=(products)=>{
    return` Hay algun valor necesario para la creacion del producto incompleta o no valido.
    Listado de propiedades requeridas:    
    *title : necesita ser un string y se recibio ${products.title}
    *description : necesita ser un string y se recibio ${products.description}
    *price : necesita ser un number y se recibio ${products.price}
    *code : necesita ser un string y se recibio ${products.code}
    `
}
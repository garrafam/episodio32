export class CustomError{
    static createError({
        name='Error',cause, message, code=i
    }){
        const error= new Error(message)
        error.name=name
        error.code=code
        error.cause=cause
        throw error
    }
}
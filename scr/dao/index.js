import { get } from "mongoose"

export class DaoMongo{
    constructor(model) {
        this.model=model
    }
    getAll=async()=>await this.model.find()
    get   =async()=>await this.model.findOne()
    create=async()=>await this.model.create()
    update=async()=>await this.model.updateBy()
    delete=async()=>await this.model.delete()
}
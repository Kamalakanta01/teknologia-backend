const mongoose=require("mongoose")


const dataSchema=mongoose.Schema({

    name:String,
    file:Buffer,
    password:String,
    

})
const DataModel=mongoose.model("data",dataSchema)

module.exports={DataModel}
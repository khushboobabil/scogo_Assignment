const mongoose=require("mongoose")
const ObjectId=mongoose.Schema.Types.ObjectId

const orderSchema=new mongoose.Schema({
    userId:{
        type:ObjectId,
        ref:"Users"
    },
    pizzaId: {
        type:ObjectId,
        ref:"pizza"
    },
    orderDate: Date,
    isFulfilled: 
   { 
    type:Boolean,
    default:false

}})
module.exports=mongoose.model("order",orderSchema)
const orderModel=require("../models/orderModel.js")
const pizzaModel = require("../models/pizaaModel.js")
const userModel = require("../models/userModel.js")
const jwt=require("jsonwebtoken")
const { Console } = require("console")
const mongoose=require("mongoose")


//validations 

const isValid = function(value){
    if(typeof value ==undefined ||  value ==null)return false
    if(typeof value==='string'&&value.trim().length===0) return false
    if(typeof value===Number &&value.trim().length===0) return false
    return true
  }

  const isValidObjectId = function (ObjectId) {
    return mongoose.Types.ObjectId.isValid(ObjectId)
  }
  
//*********************************************************************************************************//

//placeOrder controller
const placeOrder=async function(req,res)
{
try{

   let pizzaId=req.body.pizzaId

   if (Object.keys(pizzaId) == 0)
   return res.status(400).send({ status: false, msg: "No input provided" })

    if (!isValid(pizzaId)) {
    return res.status(400).send({ status: false, message: "pizzaId could not be blank" });
   }

    if (!isValidObjectId(pizzaId)) {
      return res.status(400).send({ status: false, message: "pizzaId  is not valid" });
    }
    let token=req.headers["x-api-key"]
    if(!token) return res.status(400).send({status:false,msg:'enter the token in header'})

    let decodedToken = jwt.verify(token, "Secret-Key")
        
    let userId=decodedToken.userId
    const findUser=await userModel.findOne({_id:userId}).select({password:0,createdAt:0,updatedAt:0,__v:0})

    if (!findUser) {
        return res.status(400).send({status: false,msg: "No data found"})
    }
    
    const findpizza=await pizzaModel.findOne({_id:pizzaId}).select({__v:0})

    if (!findpizza) {
        return res.status(400).send({status: false,msg: "No data found"})
    }
    
    let finalorder={userId:findUser,pizzaId:findpizza,orderDate:Date.now(),isFulfilled:true}
    
    let placedOrder=await orderModel.create(finalorder)

    return res.status(201).send({status:true,data:placedOrder})

}
    catch (error) {
        res.status(500).send({status: false,msg: error.message})
    }

}
module.exports.placeOrder=placeOrder

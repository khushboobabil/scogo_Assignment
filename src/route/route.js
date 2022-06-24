const express=require("express")
const mongoose=require("mongoose")
const router=express.Router()
const UserController=require("../controller/userController.js")
const pizzaController=require("../controller/pizzaController.js")
const orderController=require("../controller/orderController.js")
const mid=require("../middleware/mid.js")

//user sign up
router.post("/api/signup",UserController.createUser)

//user-login
router.post("/api/login",UserController.login)

//Adding pizza
router.post("/api/pizzas",mid.authorisation,pizzaController.addPizza)

//List of pizza's
router.get("/api/pizzas",mid.authorisation,pizzaController.getListOfPizzas)

//update Ingredients 
router.patch("/api/pizzas/:id",mid.authorisation,pizzaController.updateIngredient)

//placeOrder
router.post("/api/pizzas/placeOrder",mid.authorisation,orderController.placeOrder)



module.exports = router;



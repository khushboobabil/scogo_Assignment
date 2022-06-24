const pizzaModel = require("../models/pizaaModel.js")


const isValid = function (value) {
    if (typeof value == undefined || value == null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    if (typeof value === Number && value.trim().length === 0) return false
    return true
}

//*************************************************************************************************//

//Adding new pizza API controller
const addPizza = async function (req, res) {
    try {
        let data = req.body
        const { name, price, ingredients } = data

        if (Object.keys(data) == 0)
            return res.status(400).send({ status: false, msg: "No input provided" })

        if (!isValid(name)) {
            return res.status(400).send({ status: false, msg: " pizza name is required" })
        }

        if (!isValid(price)) {
            return res.status(400).send({ status: false, msg: " pizza price is required" })
        }

        if (!isValid(ingredients)) {
            return res.status(400).send({ status: false, msg: " pizza ingredients is required" })
        }

        let duplicateIngredient = await pizzaModel.find({ name:name })
        if (duplicateIngredient.length>0)
            return res.status(409).send({status: false, msg:"This Pizza already exist"})

      
       
        for (let i = 0; i < ingredients.length; i++) {
            for (let j = i+1; j < ingredients.length; j++) {
                if (ingredients[i] == ingredients[j]) {
                    return res.status(409).send({ status: false, msg: "This ingredient already present,check the list.No ingredient should be repeated" })

                }
            }
        }
      
        const newAddedPizza = await pizzaModel.create(data)

        return res.status(201).send({ status: true, data: newAddedPizza })

    }

    catch (err) {
        res.status(500).send(console.log(err.message))
    }
}

module.exports.addPizza = addPizza

//***********************************************************************************************//

//list of pizza API controller
const getListOfPizzas = async function (req, res) {
    try {
        let list = await pizzaModel.find().select({ name: 1, price: 1, ingredients: 1 })

        if (!isValid(list)) {
            return res.status(404).send({ status: false, msg: "No data found" })
        }
        return res.status(200).send({ status: true, data: list })
    }
    catch (err) {
        res.status(500).send(console.log(err.message))
    }
}
module.exports.getListOfPizzas = getListOfPizzas


//*********************************************************************************************************** */

//update ingredient API controller
const updateIngredient = async function (req, res) {
    try {
        const pizzaId = req.params.id
        const data = req.body.ingredients
        const checkIngredient = await pizzaModel.findById({ _id: pizzaId })
        if (!checkIngredient) {
            return res.status(404).send({ status: false, msg: "No data found with this Id" })
        }


        let arr = checkIngredient.ingredients
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < data.length; j++) {
                if (arr[i] === data[j]) {
                    return res.status(400).send({ status: false, msg: "This ingredient already present" })

                }
            }
        }

        let updateIngredient = await pizzaModel.findOneAndUpdate({ _id: pizzaId }, { $push: { ingredients: data } }, { new: true })

        return res.status(200).send({ status: true, msg: updateIngredient })
    }
    catch (err) {
        res.status(500).send(console.log(err.message))
    }
}
module.exports.updateIngredient = updateIngredient






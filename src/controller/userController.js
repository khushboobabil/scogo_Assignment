const userModel=require("../models/userModel.js")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const mongoose=require("mongoose")


const isValid = function(value){
    if(typeof value ==undefined ||  value ==null)return false
    if(typeof value==='string'&&value.trim().length===0) return false
    if(typeof value===Number &&value.trim().length===0) return false
    return true
  }

//*************************************************************************************************//

//user sign up controller
const createUser = async function(req, res) {
    try {
        let data = req.body
        const {firstName,lastName,email,mobile,password,confirmPassword}=data
  
        if (Object.keys(data) == 0) 
           return res.status(400).send({status: false, msg: "No input provided"})

        if (!isValid(firstName)) {
            return res.status(400).send({status: false,msg: "FirstName is required"})
        }
  
        if (!isValid(lastName)) {
            return res.status(400).send({status: false,msg: "LastName is required"})
        }
  
        if (!isValid(email)) {
          return res.status(400).send({status: false,msg: "Email is required"})
        }
  
        if (!/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(data.email)) {
          return res.status(400).send({status: false,msg: "valid email is required"})
        }
  
        let dupliEmail = await userModel.find({ email: data.email })
        if (dupliEmail.length > 0) {
            return res.status(400).send({status: false,msg: "email is already exists"})
        }
  
        if (!isValid(mobile)) {
          return res.status(400).send({status: false,msg: "mobile number is required"})
        }
  
        if (!/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(data.mobile)) {
            return res.status(400).send({status: false,msg: "valid mobile number is required"})
        }
  
        if (!isValid(password)) {
            return res.status(400).send({status: false,msg: "Plz enter valid password"})
        }
        if (!isValid(confirmPassword)) {
            return res.status(400).send({status: false,msg: "Plz enter password to confirm"})
        }
  
        if(password!==confirmPassword)
        {
            return res.status(400).send({status: false,msg: "Plz enter same password"})
        }
        
  
        const salt = await bcrypt.genSalt(10);
        data.password = await bcrypt.hash(data.password, salt);


        let savedData = await userModel.create(data)
        let showUserData={
            firstName:savedData.firstName,
            lastName:savedData.lastName,
            email:savedData.email,
            mobile:savedData.mobile,

        }
        res.status(201).send({status: true,msg: "user created successfully",data: showUserData})

  } catch (error) {
      res.status(500).send({status: false,msg: error.message})
  }
}

module.exports.createUser=createUser

//***********************************************************************************************************//

//login controller
const login = async function(req, res) {
    try {
        let user = req.body
  
        if (Object.keys(user) == 0) {
            return res.status(400).send({status: false,msg: "please provide data"})
        }
  
        let userName = req.body.email
        let password = req.body.password
  
        if (!userName) {
            return res.status(400).send({status: false,msg: "Email-Id is required"})
        }
  
        if (!password) {
            return res.status(400).send({status: false,msg: "password is required"})
        }
  
        let userEmailFind = await userModel.findOne({ email: userName })
        if (!userEmailFind) {
            return res.status(400).send({status: false,msg: "userName is not correct"})
        };
  
        bcrypt.compare(password, userEmailFind.password, function(err, result) {
            if (result) {
                let token = jwt.sign({
                    userId: userEmailFind._id,
                    iat: Math.floor(Date.now() / 1000),
                    exp: Math.floor(Date.now() / 1000) + 10 * 60 * 60
                }, "Secret-Key");
                const userData = {
                    userId: userEmailFind._id,
                    token: token
                }
                res.status(201).send({status: true,message: "user login successfully",data: userData});
            } else {
                return res.status(401).send({status: true,message: "plz provide correct password"
                })
            }
        })
      
    } catch (error) {
        return res.status(500).send({status: false,msg: error.message })
    }
  
  }
module.exports.login=login
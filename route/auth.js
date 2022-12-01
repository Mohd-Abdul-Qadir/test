const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { products } = require('../data');


require('../config/db');
const User = require('../model/userSchema')

router.get('/', (req, res) => {
    res.send("hello world the server accordingto router ")
});
router.post('/register', async (req, res) => {
    try {
        const { name, email, phone, password, cpassword } = req.body;
        if (!name || !email || !phone || !password || !cpassword) {
            return res.status(422).json({ error: "plz filled the field proprly", isSuccess: false })
        }
        const userExist = await User.findOne({ email: email })
        if (userExist) {
            return res.status(422).json({ error: "email already Exist", isSuccess: false });
        }
        if (password != cpassword) {
            return res.status(422).json({ error: "password are not match", isSuccess: false });
        }

        const user = new User({ name, email, phone, password, cpassword })
        await user.save()
        return res.status(201).json({ message: "user registerd succesfuly", isSuccess: true });




    } catch (err) {
        console.log("could not register" + err)
    }

})
//Login route
router.post('/login', async (req, res) => {

    try {
        console.log(req.cookies, "SUHAIL")
        console.log("CALLED")
        let token;
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "invalid" })
        }
        const userLogin = await User.findOne({ email: email })
        if (!userLogin) {
            return res.status(400).json({ error: "Invalid Email Id", isSuccess: false })
        }
        const isMatch = await bcrypt.compare(password, userLogin.password)

        if (!isMatch) {
            return res.status(400).json({ error: "Please check your password", isSuccess: false })
        }
        token = await userLogin.genrateAUthToken();
        console.log(token);
        // res.cookie("jwtoken", token, {
        //     // expires: new Date(Date.now() + 25892000000),
        //     // httpOnly: true
        // })
        return res.status(200).json({ message: "Login successfully", data: { userLogin, token }, isSuccess: true })

    } catch (err) {
        console.log(err)

    }

})

router.get('/products', async (req, res) => {
    res.json({ data: products })
})
module.exports = router;
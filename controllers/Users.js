const express = require("express");
const router = express.Router();
const users = require('../models/users.js');
const { hashPassword, isPassMatched } = require("../middleware/helpers.js");
const jwt = require('jsonwebtoken');


const userRegister = async (req, res) => {
    try {
        const { name, mobile, email, password } = req.body;
        const hashedPassword = await hashPassword(password);
        const user =new users({ name, mobile, email, password: hashedPassword });
        await user.save();
        res.status(200).json({ status: true, message: "User Registred Successfully", user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: "Error while Registring User" });
    }
};

const userLogin = async (req,res) => {
    try {
        const { email, password } = req.body;
        const existEmail = await users.findOne({ email });
        if (!existEmail) {
            return res.status(400).json({ status: false, message: "Email not found" });
        }
        const isMatch = await isPassMatched(password, existEmail.password);
        if (!isMatch) {
            return res.status(400).json({ status: false, message: "Password not matched" });
        }
        let data = {
            userid: existEmail._id,
        }
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        jwt.sign(data, jwtSecretKey, (err, token) => {
            if (err) throw err;
            return res.status(200).json({
                success: true, message: "User Login successfully",
                token: token,
            })
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: "Error while Login User" });
    }
}

module.exports = {
    userRegister,
    userLogin
}
const mongoose = require("mongoose");

const users = new mongoose.Schema(
    {
        name: {
            type: "String",
            required: true
        },
        mobile: {
            type: "Number",
            required: false
        },
        email: {
            type: "String",
            required: true
        },
        password: {
            type: "String",
            required: true
        }
    },
    {
        timestamps: true
    }
)
module.exports = mongoose.model("users", users);
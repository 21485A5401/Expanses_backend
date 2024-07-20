const mongoose = require('mongoose');

const category = mongoose.Schema(
    {
        UserId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        name: String,
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Category', category);
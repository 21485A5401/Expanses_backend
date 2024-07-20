const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate')

const expense = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            autopopulate: true,
            required: true
        },
        date: {
            type: Date,
            require:true
        },
        amount: {
            type: Number,
            require:true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Category",
            autopopulate: true,
            require:true
        },
        description: {
            type: String,
            require:true
        }
    }
)
expense.plugin(autopopulate);

module.exports = mongoose.model('exponse', expense);
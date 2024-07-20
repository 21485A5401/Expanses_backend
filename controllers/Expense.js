const expense = require('../models/expense.js');

const createExponse = async (req, res) => {
    try {
        const { date, amount, category, description } = req.body;
        const Expense = new expense({ userId: req.userId, date, amount, category, description });
        await Expense.save();
        res.status(201).send({ status: true, message: "Expense created Successfully", Expense });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getExpense = async (req, res) => {
    try {
        const Expenses = await expense.find({ userId: req.userId });
        res.send({ status: true, message: "fetch Expanse data Successfully", Expenses });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateExpanse = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const { date, amount, category, description } = req.body;
        console.log(req.body);
        const Expense = await expense.findByIdAndUpdate(id, { date, amount, category, description }, { new: true });
        res.send({ status: true, message: "Update Expanse successfully", Expense });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteExpanse = async (req, res) => {
    try {
        const { id } = req.params;
        await expense.findByIdAndDelete(id);
        res.send('Expense deleted successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    createExponse,
    getExpense,
    updateExpanse,
    deleteExpanse
}
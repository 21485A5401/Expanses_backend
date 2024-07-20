const { default: mongoose } = require('mongoose');
const expense = require('../models/expense.js');

const totalPeriod = async (req, res) => {
    const { period } = req.params;
    const { start, end } = getPeriodDates(period);
    try {
        const expenses = await expense.find({ userId: req.userId, date: { $gte: start, $lte: end } });
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        res.send({ total });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getPeriodDates = (period) => {
    const now = new Date();
    let start, end;
    switch (period) {
        case 'daily':
            start = new Date(now.setHours(0, 0, 0, 0));
            end = new Date(now.setHours(23, 59, 59, 999));
            break;
        case 'weekly':
            start = new Date(now.setDate(now.getDate() - now.getDay()));
            end = new Date(now.setDate(now.getDate() + (6 - now.getDay())));
            break;
        case 'monthly':
            start = new Date(now.getFullYear(), now.getMonth(), 1);
            end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            break;
        default:
            throw new Error('Invalid period');
    }
    return { start, end };
};

const spending_by_categoury = async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.userId);  // Correct usage with 'new'
        const expenses = await expense.aggregate([
            { $match: { userId: userId } },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'category',
                    foreignField: '_id',
                    as: 'categoryDetails'
                }
            },
            { $unwind: '$categoryDetails' },
            {
                $group: {
                    _id: '$categoryDetails.name',
                    totalAmount: { $sum: '$amount' }
                }
            },
            { $sort: { totalAmount: -1 } }
        ]);
        res.send(expenses);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = {
    totalPeriod,
    spending_by_categoury
}
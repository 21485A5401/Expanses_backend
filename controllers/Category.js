const Category = require('../models/category.js');

const createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ status: false, message: "Category name is required" });
        }

        const UserId = req.userId;
        console.log(UserId);
        const category = await Category.create({ UserId, name });

        res.status(201).json({ status: true, message: "Category Created Successfully", category });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ status: false, message: err.message });
    }
};

const getCategory = async (req, res) => {
    try {
        const UserId = req.userId;
        const category = await Category.find({ UserId });
        res.status(200).json({ status: true, message: "Categorys Fetched Successfully", category });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message })
    }
}

module.exports = {
    createCategory,
    getCategory
}
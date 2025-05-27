const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, stock } = req.body;
        const product = new Product({ name, description, price, stock });
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) return res.status(404).json({ msg: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
};

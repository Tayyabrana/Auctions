const Product = require('../Models/productModel');
const productDataList = require('../Data/productDataList');

const seedPolicies = async () => {
    try {
        await Product.deleteMany();
        console.log('Old Products deleted successfully');
        const createdProducts = await Product.create(productDataList);
        if (createdProducts) {
            console.log('Products seeded successfully');
        } else {
            console.error('Failed to seed products');
        }
    } catch (error) {
        console.error('Error seeding products:', error.message);
    }
};

module.exports = seedPolicies;

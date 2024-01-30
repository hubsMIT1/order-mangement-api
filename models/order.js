const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem'
    }],
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment'
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    // make order more flexiable, if user don't want to go with the saved user's details
    shippingAddress: {
        type: String,
        default:'',
    },
    city: {
        type: String,
        default:'',
    },
    zip: {
        type: String,
        default:'',
    },
    country: {
        type: String,
        default:'',
    },
    phone: {
        type: String,
        default:'',
    },
    status: {
        type: String,
        required: true,
        default: 'Pending', // 
    }, 
},{ 
    timestamps: true,
 });

module.exports = mongoose.model('Order', orderSchema);

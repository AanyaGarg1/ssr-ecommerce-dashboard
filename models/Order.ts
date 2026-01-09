import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true,
    },
    customer: {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
        },
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
        name: String,
        quantity: Number,
        price: Number,
    }],
    totalAmount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'cancelled', 'shipped', 'delivered'],
        default: 'pending',
    },
    paymentMethod: {
        type: String,
        enum: ['credit_card', 'debit_card', 'upi', 'cash_on_delivery', 'net_banking'],
    },
    shippingAddress: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, {
    timestamps: true,
});

export default mongoose.models.Order || mongoose.model('Order', orderSchema);

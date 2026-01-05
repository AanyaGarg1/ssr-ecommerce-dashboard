import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    images: string[];
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide a name for this product.'],
            maxlength: [60, 'Name cannot be more than 60 characters'],
        },
        description: {
            type: String,
            required: [true, 'Please provide a description for this product.'],
        },
        price: {
            type: Number,
            required: [true, 'Please provide a price for this product.'],
        },
        stock: {
            type: Number,
            required: [true, 'Please provide the stock quantity.'],
            min: [0, 'Stock cannot be less than 0'],
        },
        category: {
            type: String,
            required: [true, 'Please provide a category for this product.'],
        },
        images: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;

import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/models/Product';
import { mockProducts, addMockProduct } from '@/lib/mock-db';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await connectDB();
        const products = await Product.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: products });
    } catch (error: any) {
        console.warn("Database connection failed, using mock data:", error.message);
        // Fallback to mock data
        return NextResponse.json({ success: true, data: mockProducts, _warning: "Using mock data (DB Disconnected)" });
    }
}

export async function POST(request: Request) {
    let body;
    try {
        body = await request.json();
    } catch (e) {
        return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 });
    }

    try {
        await connectDB();
        const product = await Product.create(body);
        return NextResponse.json({ success: true, data: product }, { status: 201 });
    } catch (error: any) {
        console.warn("Database connection failed, saving to mock data:", error.message);
        // Fallback to mock data
        try {
            const product = addMockProduct(body);
            return NextResponse.json({ success: true, data: product }, { status: 201 });
        } catch (mockError) {
            return NextResponse.json({ success: false, error: "Failed to save product" }, { status: 500 });
        }
    }
}

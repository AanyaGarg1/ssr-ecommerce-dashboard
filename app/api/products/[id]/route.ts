import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/models/Product';
import { getMockProduct, updateMockProduct, deleteMockProduct } from '@/lib/mock-db';

export const dynamic = 'force-dynamic';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        await connectDB();
        const product = await Product.findById(id);
        if (!product) {
            return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: product });
    } catch (error) {
        // Mock Fallback
        const product = getMockProduct(id);
        if (product) return NextResponse.json({ success: true, data: product });
        return NextResponse.json({ success: false, error: 'Product not found (or DB error)' }, { status: 404 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    let body;
    try {
        body = await request.json();
    } catch (e) {
        return NextResponse.json({ success: false, error: 'Invalid JSON body' }, { status: 400 });
    }

    try {
        await connectDB();
        const product = await Product.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });
        if (!product) {
            return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: product });
    } catch (error: any) {
        // Mock Fallback
        console.warn("PUT product: DB error, using mock fallback", error.message);
        const product = updateMockProduct(id, body);
        if (product) return NextResponse.json({ success: true, data: product });
        return NextResponse.json({ success: false, error: 'Product not found in mock store' }, { status: 404 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        await connectDB();
        const deletedProduct = await Product.deleteOne({ _id: id });
        if (!deletedProduct) {
            return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        // Mock Fallback
        if (deleteMockProduct(id)) {
            return NextResponse.json({ success: true, data: {} });
        }
        return NextResponse.json({ success: false, error: 'Failed to delete product' }, { status: 400 });
    }
}

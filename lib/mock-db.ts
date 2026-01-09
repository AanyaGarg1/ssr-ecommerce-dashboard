// lib/mock-db.ts

// Declare the global type to avoid TS errors
declare global {
    var _mockProducts: any[] | undefined;
    var _mockOrders: any[] | undefined;
}

// Initialize the global store if it doesn't exist
if (!global._mockProducts) {
    global._mockProducts = [
        {
            _id: 'prd-001',
            name: 'Nike Air Max 270',
            description: 'Premium sports shoes with maximum cushioning and style.',
            price: 12900,
            stock: 15,
            category: 'Footwear',
            images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff'],
            createdAt: new Date(),
            updatedAt: new Date(),
            sales: 142,
        },
        {
            _id: 'prd-002',
            name: 'Apple Watch Series 9',
            description: 'The ultimate device for a healthy life is now even more powerful.',
            price: 45900,
            stock: 8,
            category: 'Wearables',
            images: ['https://images.unsplash.com/photo-1546868871-70c122469d8b'],
            createdAt: new Date(),
            updatedAt: new Date(),
            sales: 89,
        },
        {
            _id: 'prd-003',
            name: 'ASUS VivoBook 15',
            description: 'Powerful and stylish laptop for everyday computing.',
            price: 107190,
            stock: 5,
            category: 'Computer and Accessories',
            images: ['https://images.unsplash.com/photo-1593642702821-c8da6771f0c6'],
            createdAt: new Date(),
            updatedAt: new Date(),
            sales: 85,
        },
        {
            _id: 'prd-004',
            name: 'Bose Smart Speaker 500',
            description: 'Fill any room with wall-to-wall stereo sound.',
            price: 44900,
            stock: 12,
            category: 'Smart Home and Gadgets',
            images: ['https://images.unsplash.com/photo-1589003077984-894e133dabab'],
            createdAt: new Date(),
            updatedAt: new Date(),
            sales: 42,
        },
        {
            _id: 'prd-005',
            name: 'Logitech G502 Hero',
            description: 'High performance wired gaming mouse with 25K DPI sensor.',
            price: 5495,
            stock: 25,
            category: 'Computer and Accessories',
            images: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf'],
            createdAt: new Date(),
            updatedAt: new Date(),
            sales: 432,
        }
    ];
}

// Initialize mock orders
if (!global._mockOrders) {
    const now = new Date();
    const getRandomDate = (daysAgo: number) => {
        const date = new Date(now);
        date.setDate(date.getDate() - daysAgo);
        date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
        return date;
    };

    global._mockOrders = [
        {
            _id: 'ord-001',
            orderId: 'ORD-1767757582476-925',
            customer: {
                name: 'Anjali Mehra',
                email: 'anjali.mehra@example.com',
                avatar: 'https://i.pravatar.cc/100?img=1',
            },
            items: [
                { name: 'Nike Air Max 270', quantity: 1, price: 12900 }
            ],
            totalAmount: 12989,
            status: 'completed',
            paymentMethod: 'upi',
            createdAt: getRandomDate(0),
            updatedAt: getRandomDate(0),
        },
        {
            _id: 'ord-002',
            orderId: 'ORD-1767756912579-706',
            customer: {
                name: 'Riya Jain',
                email: 'riya.jain@example.com',
                avatar: 'https://i.pravatar.cc/100?img=5',
            },
            items: [
                { name: 'Apple Watch Series 9', quantity: 1, price: 45900 },
                { name: 'Logitech G502 Hero', quantity: 1, price: 5495 }
            ],
            totalAmount: 13389,
            status: 'cancelled',
            paymentMethod: 'credit_card',
            createdAt: getRandomDate(0),
            updatedAt: getRandomDate(0),
        },
        {
            _id: 'ord-003',
            orderId: 'ORD-1767754951538-266',
            customer: {
                name: 'Nina malik',
                email: 'nina.malik@example.com',
                avatar: 'https://i.pravatar.cc/100?img=9',
            },
            items: [
                { name: 'ASUS VivoBook 15', quantity: 1, price: 107190 },
                { name: 'Logitech G502 Hero', quantity: 2, price: 5495 }
            ],
            totalAmount: 126400,
            status: 'completed',
            paymentMethod: 'net_banking',
            createdAt: getRandomDate(0),
            updatedAt: getRandomDate(0),
        },
        {
            _id: 'ord-004',
            orderId: 'ORD-1767754783910-959',
            customer: {
                name: 'Meher Gupta',
                email: 'meher.gupta@example.com',
                avatar: 'https://i.pravatar.cc/100?img=16',
            },
            items: [
                { name: 'Bose Smart Speaker 500', quantity: 2, price: 44900 }
            ],
            totalAmount: 959,
            status: 'completed',
            paymentMethod: 'upi',
            createdAt: getRandomDate(0),
            updatedAt: getRandomDate(0),
        },
        {
            _id: 'ord-005',
            orderId: 'ORD-1767683986849-106',
            customer: {
                name: 'Vikram Nair',
                email: 'vikram.nair@example.com',
                avatar: 'https://i.pravatar.cc/100?img=12',
            },
            items: [
                { name: 'Nike Air Max 270', quantity: 2, price: 12900 },
                { name: 'Apple Watch Series 9', quantity: 1, price: 45900 }
            ],
            totalAmount: 38499,
            status: 'completed',
            paymentMethod: 'debit_card',
            createdAt: getRandomDate(1),
            updatedAt: getRandomDate(1),
        },
        {
            _id: 'ord-006',
            orderId: 'ORD-1767682156234-442',
            customer: {
                name: 'Priya Sharma',
                email: 'priya.sharma@example.com',
                avatar: 'https://i.pravatar.cc/100?img=24',
            },
            items: [
                { name: 'Bose Smart Speaker 500', quantity: 1, price: 44900 }
            ],
            totalAmount: 44900,
            status: 'shipped',
            paymentMethod: 'credit_card',
            createdAt: getRandomDate(1),
            updatedAt: getRandomDate(0),
        },
        {
            _id: 'ord-007',
            orderId: 'ORD-1767598234567-123',
            customer: {
                name: 'Arjun Patel',
                email: 'arjun.patel@example.com',
                avatar: 'https://i.pravatar.cc/100?img=33',
            },
            items: [
                { name: 'ASUS VivoBook 15', quantity: 1, price: 107190 }
            ],
            totalAmount: 107190,
            status: 'processing',
            paymentMethod: 'upi',
            createdAt: getRandomDate(2),
            updatedAt: getRandomDate(1),
        },
        {
            _id: 'ord-008',
            orderId: 'ORD-1767512345678-890',
            customer: {
                name: 'Kavya Reddy',
                email: 'kavya.reddy@example.com',
                avatar: 'https://i.pravatar.cc/100?img=47',
            },
            items: [
                { name: 'Logitech G502 Hero', quantity: 3, price: 5495 }
            ],
            totalAmount: 16485,
            status: 'delivered',
            paymentMethod: 'cash_on_delivery',
            createdAt: getRandomDate(3),
            updatedAt: getRandomDate(2),
        },
    ];
}

export const getMockProducts = () => {
    return global._mockProducts || [];
};

export const addMockProduct = (product: any) => {
    const newProduct = {
        ...product,
        _id: 'mock-' + Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    if (global._mockProducts) {
        global._mockProducts.unshift(newProduct);
    }
    return newProduct;
};

export const updateMockProduct = (id: string, updates: any) => {
    if (!global._mockProducts) return null;
    const index = global._mockProducts.findIndex(p => p._id === id);
    if (index !== -1) {
        const { _id, ...rest } = updates;
        global._mockProducts[index] = { ...global._mockProducts[index], ...rest, updatedAt: new Date() };
        return global._mockProducts[index];
    }
    return null;
};

export const deleteMockProduct = (id: string) => {
    if (!global._mockProducts) return false;
    const index = global._mockProducts.findIndex(p => p._id === id);
    if (index !== -1) {
        global._mockProducts.splice(index, 1);
        return true;
    }
    return false;
};

export const getMockProduct = (id: string) => {
    return global._mockProducts?.find(p => p._id === id);
};

export const mockProducts = global._mockProducts!;

// Order helper functions
export const getMockOrders = () => {
    return global._mockOrders || [];
};

export const getMockOrder = (id: string) => {
    return global._mockOrders?.find(o => o._id === id || o.orderId === id);
};

export const addMockOrder = (order: any) => {
    const newOrder = {
        ...order,
        _id: 'ord-' + Date.now().toString(),
        orderId: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    if (global._mockOrders) {
        global._mockOrders.unshift(newOrder);
    }
    return newOrder;
};

export const updateMockOrder = (id: string, updates: any) => {
    if (!global._mockOrders) return null;
    const index = global._mockOrders.findIndex(o => o._id === id || o.orderId === id);
    if (index !== -1) {
        const { _id, orderId, ...rest } = updates;
        global._mockOrders[index] = { ...global._mockOrders[index], ...rest, updatedAt: new Date() };
        return global._mockOrders[index];
    }
    return null;
};

export const mockOrders = global._mockOrders!;

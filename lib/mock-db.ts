// lib/mock-db.ts

// Declare the global type to avoid TS errors
declare global {
    var _mockProducts: any[] | undefined;
}

// Initialize the global store if it doesn't exist
if (!global._mockProducts) {
    global._mockProducts = [
        {
            _id: 'prd-001',
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
            _id: 'prd-002',
            name: 'Boat Rockerz 450',
            description: 'Wireless on-ear headphones with 15 hours of battery life.',
            price: 4999,
            stock: 8,
            category: 'Mobile and Accessories',
            images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e'],
            createdAt: new Date(),
            updatedAt: new Date(),
            sales: 320,
        },
        {
            _id: 'prd-003',
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
            _id: 'prd-004',
            name: 'Samsung Odyssey G7',
            description: '27-inch curved gaming monitor with 240Hz refresh rate.',
            price: 85900,
            stock: 3,
            category: 'Computer and Accessories',
            images: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf'],
            createdAt: new Date(),
            updatedAt: new Date(),
            sales: 12,
        },
        {
            _id: 'prd-005',
            name: 'Razer BlackWidow V4',
            description: 'Mechanical gaming keyboard with customizable RGB lighting.',
            price: 18499,
            stock: 12,
            category: 'Computer and Accessories',
            images: ['https://images.unsplash.com/photo-1511467687858-23d96c32e4ae'],
            createdAt: new Date(),
            updatedAt: new Date(),
            sales: 156,
        },
        {
            _id: 'prd-006',
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

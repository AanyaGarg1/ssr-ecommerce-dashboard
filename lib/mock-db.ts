// lib/mock-db.ts

// Declare the global type to avoid TS errors
declare global {
    var _mockProducts: any[] | undefined;
}

// Initialize the global store if it doesn't exist
if (!global._mockProducts) {
    global._mockProducts = [
        {
            _id: 'mock-1',
            name: 'Demo Product (Mock)',
            description: 'This is a mock product shown because the database connection failed.',
            price: 99.99,
            stock: 10,
            category: 'Demo',
            images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff'],
            createdAt: new Date(),
            updatedAt: new Date(),
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
        // Handle ID coming from updates
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

// Export the array as well for existing imports, it will point to the same global reference
export const mockProducts = global._mockProducts!;

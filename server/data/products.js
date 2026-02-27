const products = [
    {
        name: 'Fresh Apples',
        image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6caa6?w=600&auto=format&fit=crop&q=60',
        description: 'Fresh picked apples from the local orchard, sweet and juicy.',
        category: 'Fruits',
        price: 4.99,
        countInStock: 50,
    },
    {
        name: 'Organic Bananas',
        image: 'https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=600&auto=format&fit=crop&q=60',
        description: 'A bunch of organic, ripe bananas perfect for a healthy snack.',
        category: 'Fruits',
        price: 3.49,
        countInStock: 100,
    },
    {
        name: 'Whole Wheat Bread',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=60',
        description: 'Freshly baked whole wheat bread, high in fiber.',
        category: 'Bakery',
        price: 5.99,
        countInStock: 20,
    },
    {
        name: 'Almond Milk',
        image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&auto=format&fit=crop&q=60',
        description: 'Creamy and unsweetened almond milk.',
        category: 'Dairy Alternate',
        price: 6.50,
        countInStock: 0, // Out of stock
    },
    {
        name: 'Avocado',
        image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&auto=format&fit=crop&q=60',
        description: 'Ripe hass avocados perfect for guacamole or toast.',
        category: 'Produce',
        price: 2.99,
        countInStock: 45,
    },
    {
        name: 'Organic Eggs (Dozen)',
        image: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=600&auto=format&fit=crop&q=60',
        description: 'Farm fresh organic brown eggs.',
        category: 'Dairy',
        price: 7.99,
        countInStock: 30,
    },
    {
        name: 'Greek Yogurt',
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&auto=format&fit=crop&q=60',
        description: 'Plain greek yogurt, rich in protein.',
        category: 'Dairy',
        price: 4.49,
        countInStock: 25,
    },
    {
        name: 'Roasted Almonds',
        image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=600&auto=format&fit=crop&q=60',
        description: 'Lightly salted roasted almonds for a healthy snack.',
        category: 'Snacks',
        price: 8.99,
        countInStock: 15,
    },
    {
        name: 'Extra Virgin Olive Oil',
        image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop&q=60',
        description: 'Cold-pressed extra virgin olive oil.',
        category: 'Pantry',
        price: 14.99,
        countInStock: 10,
    },
    {
        name: 'Spinach Bunch',
        image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&auto=format&fit=crop&q=60',
        description: 'Fresh organic spinach leaves.',
        category: 'Produce',
        price: 3.49,
        countInStock: 60,
    }
];

module.exports = products;

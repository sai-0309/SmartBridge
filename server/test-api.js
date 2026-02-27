const http = require('http');

async function testApis() {
    console.log('--- Starting API Automated Tests ---');
    let token;
    const baseUrl = 'http://localhost:5000/api';

    try {
        // 1. Get Products
        console.log('Testing GET /api/products...');
        const productsRes = await fetch(`${baseUrl}/products`);
        if (!productsRes.ok) throw new Error('Failed to fetch products');
        const products = await productsRes.json();
        console.log(`✅ Fetched ${products.length} products successfully.`);

        // 2. Auth User (Login with admin from seeder)
        console.log('Testing POST /api/users/login...');
        const loginRes = await fetch(`${baseUrl}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@example.com', password: 'password123' })
        });
        if (!loginRes.ok) throw new Error('Failed to login');
        const user = await loginRes.json();
        token = user.token;
        console.log(`✅ Logged in successfully. Token received.`);

        // 3. Get User Profile
        console.log('Testing GET /api/users/profile...');
        const profileRes = await fetch(`${baseUrl}/users/profile`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!profileRes.ok) throw new Error('Failed to fetch profile');
        const profile = await profileRes.json();
        console.log(`✅ Fetched profile successfully. Welcome ${profile.name}.`);

        console.log('--- All API Tests Passed! ---');
    } catch (error) {
        console.error(`❌ API Test failed: ${error.message}`);
        process.exit(1);
    }
}

testApis();

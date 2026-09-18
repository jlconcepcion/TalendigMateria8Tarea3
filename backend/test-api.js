import app from './src/app.js';
import { connectDB } from './src/config/db.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const PORT = 3001; // use separate port for test server if needed

async function runTests() {
  await connectDB();

  const server = app.listen(PORT, async () => {
    console.log(`Test server running on port ${PORT}\n`);
    const baseUrl = `http://localhost:${PORT}/products`;
    const loginUrl = `http://localhost:${PORT}/login`;

    try {
      console.log('=== TEST 0: POST /login (Get JWT) ===');
      const loginRes = await fetch(loginUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: process.env.AUTH_USERNAME || 'admin',
          password: process.env.AUTH_PASSWORD || 'admin123',
        }),
      });
      const loginData = await loginRes.json();
      console.log(`Status: ${loginRes.status}`);
      const { token } = loginData;
      const authHeaders = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };

      console.log('\n=== TEST 0b: POST /products without token (Expect 401) ===');
      const unauthorizedRes = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Sin token', price: 10, stock: 1 }),
      });
      console.log(`Status: ${unauthorizedRes.status}`);

      console.log('\n=== TEST 1: POST /products (Invalid Data - Negative Price & Stock) ===');
      const invalidRes = await fetch(baseUrl, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({ name: 'Teclado mecánico', price: -10, stock: -2 }),
      });
      const invalidData = await invalidRes.json();
      console.log(`Status: ${invalidRes.status}`);
      console.log('Response:', JSON.stringify(invalidData, null, 2));

      console.log('\n=== TEST 2: POST /products (Valid Product Creation) ===');
      const createRes = await fetch(baseUrl, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({ name: 'Teclado mecánico RGB', price: 85.5, stock: 15 }),
      });
      const createdProduct = await createRes.json();
      console.log(`Status: ${createRes.status}`);
      console.log('Created Product:', createdProduct);

      const productId = createdProduct._id;

      console.log('\n=== TEST 3: GET /products (Get All Products) ===');
      const getAllRes = await fetch(baseUrl);
      const allProducts = await getAllRes.json();
      console.log(`Status: ${getAllRes.status}`);
      console.log(`Total Products: ${allProducts.length}`);

      console.log('\n=== TEST 4: GET /products/:id (Get Product By ID) ===');
      const getByIdRes = await fetch(`${baseUrl}/${productId}`);
      const productById = await getByIdRes.json();
      console.log(`Status: ${getByIdRes.status}`);
      console.log('Fetched Product:', productById);

      console.log('\n=== TEST 5: GET /products/:id (Invalid ID Format) ===');
      const invalidIdRes = await fetch(`${baseUrl}/12345invalidid`);
      const invalidIdData = await invalidIdRes.json();
      console.log(`Status: ${invalidIdRes.status}`);
      console.log('Response:', invalidIdData);

      console.log('\n=== TEST 6: GET /products/:id (Non-existent Product 404) ===');
      const fakeId = new mongoose.Types.ObjectId().toString();
      const notFoundRes = await fetch(`${baseUrl}/${fakeId}`);
      const notFoundData = await notFoundRes.json();
      console.log(`Status: ${notFoundRes.status}`);
      console.log('Response:', notFoundData);

      console.log('\n=== TEST 7: PUT /products/:id (Update Product) ===');
      const updateRes = await fetch(`${baseUrl}/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Teclado mecánico Wireless', price: 99.99, stock: 20 }),
      });
      const updatedProduct = await updateRes.json();
      console.log(`Status: ${updateRes.status}`);
      console.log('Updated Product:', updatedProduct);

      console.log('\n=== TEST 8: DELETE /products/:id (Delete Product) ===');
      const deleteRes = await fetch(`${baseUrl}/${productId}`, {
        method: 'DELETE',
      });
      const deleteData = await deleteRes.json();
      console.log(`Status: ${deleteRes.status}`);
      console.log('Response:', deleteData);

      console.log('\n✅ ALL API TESTS COMPLETED SUCCESSFULLY!');
    } catch (err) {
      console.error('Test Execution Error:', err);
    } finally {
      server.close();
      await mongoose.connection.close();
      process.exit(0);
    }
  });
}

runTests();

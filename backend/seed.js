const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

const connectDB = require("./config/db");

const User = require("./model/User");
const Product = require("./model/product");
const Order = require("./model/order");

dotenv.config();

const seedData = async () => {
    try {
        await connectDB();

        // Delete old data
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        console.log("Cleared existing data");

        // ==========================
        // Hash Passwords
        // ==========================

        const adminPassword = await bcrypt.hash("Admin@123", 10);
        const userPassword = await bcrypt.hash("User@123", 10);

        // ==========================
        // Products
        // ==========================

        const products = await Product.insertMany([
            {
                name: "iPhone 16 Pro",
                description: "Apple flagship smartphone",
                price: 129999,
                category: "Mobile",
                stock: 15,
                ImageUrl: "https://dummyimage.com/300x300/000/fff&text=iPhone+16+Pro",
            },
            {
                name: "Samsung Galaxy S25 Ultra",
                description: "Samsung flagship smartphone",
                price: 119999,
                category: "Mobile",
                stock: 20,
                ImageUrl: "https://dummyimage.com/300x300/000/fff&text=Samsung+S25",
            },
            {
                name: "OnePlus 13",
                description: "Latest OnePlus smartphone",
                price: 69999,
                category: "Mobile",
                stock: 18,
                ImageUrl: "https://dummyimage.com/300x300/000/fff&text=OnePlus+13",
            },
            {
                name: "Google Pixel 9 Pro",
                description: "Google AI Smartphone",
                price: 99999,
                category: "Mobile",
                stock: 12,
                ImageUrl: "https://dummyimage.com/300x300/000/fff&text=Pixel+9",
            },
            {
                name: "MacBook Air M4",
                description: "Apple Laptop",
                price: 149999,
                category: "Laptop",
                stock: 10,
                ImageUrl: "https://dummyimage.com/300x300/000/fff&text=MacBook",
            },
            {
                name: "Dell XPS 15",
                description: "Dell Premium Laptop",
                price: 139999,
                category: "Laptop",
                stock: 8,
                ImageUrl: "https://dummyimage.com/300x300/000/fff&text=Dell+XPS",
            },
            {
                name: "HP Pavilion 15",
                description: "HP Laptop",
                price: 69999,
                category: "Laptop",
                stock: 16,
                ImageUrl: "https://dummyimage.com/300x300/000/fff&text=HP+Pavilion",
            },
            {
                name: "Sony WH-1000XM5",
                description: "Noise Cancelling Headphones",
                price: 29999,
                category: "Accessories",
                stock: 25,
                ImageUrl: "https://dummyimage.com/300x300/000/fff&text=Sony+XM5",
            },
            {
                name: "Apple Watch Series 10",
                description: "Apple Smart Watch",
                price: 49999,
                category: "Wearables",
                stock: 14,
                ImageUrl: "https://dummyimage.com/300x300/000/fff&text=Apple+Watch",
            },
            {
                name: "iPad Air M3",
                description: "Apple Tablet",
                price: 64999,
                category: "Tablet",
                stock: 11,
                ImageUrl: "https://dummyimage.com/300x300/000/fff&text=iPad+Air",
            },
        ]);

        console.log(`✔ Seeded ${products.length} products`);

        // ==========================
        // Users
        // ==========================

        const users = await User.insertMany([
            {
                name: "Admin",
                email: "admin@shopnest.com",
                password: adminPassword,
                role: "admin",
                verified: true,
            },
            {
                name: "John",
                email: "john@example.com",
                password: userPassword,
                role: "user",
                verified: true,
            },
            {
                name: "Rahul",
                email: "rahul@example.com",
                password: userPassword,
                role: "user",
                verified: true,
            },
            {
                name: "Aman",
                email: "aman@example.com",
                password: userPassword,
                role: "user",
                verified: true,
            },
        ]);

        console.log(`✔ Seeded ${users.length} users`);

        // ==========================
        // Dummy Order
        // ==========================

        await Order.create({
            user: users[1]._id,
            items: [
                {
                    productId: products[0]._id,
                    quantity: 2,
                    price: products[0].price,
                },
                {
                    productId: products[1]._id,
                    quantity: 1,
                    price: products[1].price,
                },
            ],
            totalAmount: products[0].price * 2 + products[1].price,
            address: {
                fullName: "John Doe",
                street: "MG Road",
                city: "Bangalore",
                postalCode: "560001",
                country: "India",
            },
            paymentId: "PAY123456789",
            status: "pending",
        });

        console.log("\n✅ Database seeded successfully!\n");

        console.log("Login Credentials:");
        console.log("Admin: admin@shopnest.com / Admin@123");
        console.log("User : john@example.com / User@123");

        process.exit(0);

    } catch (error) {
        console.error("Seed Error:", error);
        process.exit(1);
    }
};

seedData();
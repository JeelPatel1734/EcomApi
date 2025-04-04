const mongoose = require("mongoose");
const express = require("express");
const Product = require("./src/models/product");  // Import the product model
const menuItem=require("./src/models/menuItem");
const cart=require("./src/models/cart");
const user=require("./src/models/user");
const guestUser=require("./src/models/guestUser");
const booking=require("./src/models/booking");
const Catering=require("./src/models/catering");
const book=require("./src/models/book");
const profile=require("./src/models/profile");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));
app.use(express.static('public'));

let gridBucket;

// Determine the MongoDB connection string based on the environment
const dbURI = "mongodb+srv://jeelppatel1734:qujVQqVpWgWoSlS3@cluster0.8hj1t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";  

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected successfully to MongoDB");
        gridBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: "fs" });
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
    });

// CORS setup
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});


app.get('/getproducts', async (req, res) => {
    try {
        // Fetch all products from the database
        const products = await Product.find();
        console.log("Fetched products:", products);
        
        // If products are found, return them
        res.status(200).json({ message: "Products fetched successfully", products });
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({ message: "Error fetching products", error: err.message });
    }
});
//----------------------POST

app.post('/addBooking', async (req, res) => {
    try {
        const { name, price, image, username,address, number,} = req.body;

        // Validate input
        if (!name || !price || !image || !username || !address || !number) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Create a new product
        const newProduct = new booking({
            name,
            price,
            image,
            username,address, number,
        });

        // Save the product to the database
        await newProduct.save();
        
        res.status(201).json({ message: "Product added successfully", product: newProduct });
    } catch (err) {
        console.error("Error adding product:", err);
        res.status(500).json({ message: "Error adding product", error: err.message });
    }
});
app.get('/getbooking', async (req, res) => {
    try {
        // Fetch all products from the database
        const products = await booking.find();
        console.log("Fetched products:", products);
        
        // If products are found, return them
        res.status(200).json({ message: "Products fetched successfully", products });
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({ message: "Error fetching products", error: err.message });
    }
});

app.get('/getmenuItem', async (req, res) => {
    try {

        const menuItemm = await menuItem.find();
        console.log("Fetched menuItem:", menuItemm);
        
        // If products are found, return them
        res.status(200).json({ message: "menuItem fetched successfully", menuItemm });
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({ message: "Error fetching products", error: err.message });
    }
});
//user---
app.post('/addCatering', async (req, res) => {
    try {
        const { location, eventType, guests, requirements, date, time } = req.body;

        // Validate input
        if (!location || !eventType || !guests || !date || !time) {
            return res.status(400).json({ message: "All required fields must be filled." });
        }

        // Create a new booking
        const newBooking = new Catering({
            location,
            eventType,
            guests,
            requirements,
            date,
            time
        });

        // Save the booking to the database
        await newBooking.save();

        res.status(201).json({ message: "Catering added successfully", Catering: newBooking });
    } catch (err) {
        console.error("Error adding booking:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
});
app.post('/addUser', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password ) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Create a new product
        const newProduct = new user({
            username,
            password,
        });

        // Save the product to the database
        await newProduct.save();
        
        res.status(201).json({ message: "User added successfully", product: newProduct });
    } catch (err) {
        console.error("Error adding User:", err);
        res.status(500).json({ message: "Error adding User", error: err.message });
    }
});
app.post('/addEndUser', async (req, res) => {
    try {
        const { username, email,password } = req.body;

        // Validate input
        if (!username || !email|| !password ) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Create a new product
        const newProduct = new guestUser({
            username,email,
            password,
        });

        // Save the product to the database
        await newProduct.save();
        
        res.status(201).json({ message: "User added successfully", product: newProduct });
    } catch (err) {
        console.error("Error adding User:", err);
        res.status(500).json({ message: "Error adding User", error: err.message });
    }
});
app.get('/getEndUser', async (req, res) => {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ message: "Email is required." });
        }
 
        // Find a user with the given email
        const user = await guestUser.findOne({ email });

        if (user) {
            return res.status(200).json({ exists: true, message: "Email already exists." });
        } else {
            return res.status(200).json({ exists: false, message: "Email is available." });
        }
    } catch (err) {
        console.error("Error checking email:", err);
        res.status(500).json({ message: "Error checking email", error: err.message });
    }
});
app.get('/getAllEndUSer', async (req, res) => {
    try {
        // Fetch all products from the database
        const products = await guestUser.find();
        console.log("Fetched products:", products);
        
        // If products are found, return them
        res.status(200).json({ message: "Products fetched successfully", products });
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({ message: "Error fetching products", error: err.message });
    }
});
app.get('/validateUser', async (req, res) => {
    try {
        const { email, password } = req.query;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        // Find user with matching email and password
        const user = await guestUser.findOne({ email, password });

        if (user) {
            return res.status(200).json({ exists: true, message: "User exists." });
        } else {
            return res.status(200).json({ exists: false, message: "User does not exist." });
        }
    } catch (err) {
        console.error("Error validating user:", err);
        res.status(500).json({ message: "Error validating user", error: err.message });
    }
});



app.get('/getUser', async (req, res) => {
    try {
        // Fetch all products from the database
        const products = await user.find();
        console.log("Fetched cart:", products);
        
        // If products are found, return them
        res.status(200).json({ message: "cart fetched successfully", products });
    } catch (err) {
        console.error("Error fetching cart:", err);
        res.status(500).json({ message: "Error fetching products", error: err.message });
    }
});
//user---
// POST API to add a product

app.post('/product', async (req, res) => {
    try {
        const { product_image, product_name, product_price } = req.body;

        // Validate input
        if (!product_image || !product_name || !product_price) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Create a new product
        const newProduct = new Product({
            product_image,
            product_name,
            product_price
        });

        // Save the product to the database
        await newProduct.save();
        
        res.status(201).json({ message: "Product added successfully", product: newProduct });
    } catch (err) {
        console.error("Error adding product:", err);
        res.status(500).json({ message: "Error adding product", error: err.message });
    }
});
// cart------------------------------------------
app.post('/addCart', async (req, res) => {
    try {
        const { email,name, price, image, quantity } = req.body;

        // Validate input
        if (!email || !name || !price || !image || !quantity) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Create a new Cart
        const newCart = new cart({
            email,
            name,
            price,
            image,
            quantity
        });

        // Save the Cart to the database
        await newCart.save();
        
        res.status(201).json({ message: "Cart added successfully", cart: newCart });
    } catch (err) {
        console.error("Error adding Cart:", err);
        res.status(500).json({ message: "Error adding Cart", error: err.message });
    }
});

app.get('/getCart', async (req, res) => {
    try {
        const { email } = req.query; // Get email from query parameters

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        // Fetch cart items for the specific user
        const products = await cart.find({ email });

        console.log(`Fetched cart for ${email}:`, products);
        
        // If products are found, return them
        res.status(200).json({ message: "Cart fetched successfully", products });
    } catch (err) {
        console.error("Error fetching cart:", err);
        res.status(500).json({ message: "Error fetching cart", error: err.message });
    }
});


app.delete('/clearCart', async (req, res) => {
  try {
    const { email } = req.query; // Get email from query params

    if (!email) {
      return res.status(400).json({ message: "Email is required to clear the cart" });
    }

    // Delete only the cart items for the provided email
    const result = await cart.deleteMany({ email: email });
    console.log(`Cart cleared for ${email}:`, result);

    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (err) {
    console.error("Error clearing cart:", err);
    res.status(500).json({ message: "Error clearing cart", error: err.message });
  }
});

app.post('/addBook', async (req, res) => {
    try {
        const { email, items, total, gst, deliveryFee, discount, finalTotal, paymentMethod, status } = req.body;

        // Validate required fields
        if (!email || !items || !total || !gst || !deliveryFee || !finalTotal || !paymentMethod) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Create a new booking
        const newBooking = new book({
            email,
            items,
            total,
            gst,
            deliveryFee,
            discount,
            finalTotal,
            paymentMethod,
            status: 'Paid' // Default to 'Paid' if not provided
        });

        // Save to database
        await newBooking.save();

        res.status(201).json({ message: "Booking added successfully", booking: newBooking });
    } catch (error) {
        console.error("Error adding booking:", error);
        res.status(500).json({ message: "Error adding booking", error: error.message });
    }
});
app.get('/getAllBook', async (req, res) => {
    try {
        // Fetch all products from the database
        const products = await book.find();
        console.log("Fetched products:", products);
        
        // If products are found, return them
        res.status(200).json({ message: "Products fetched successfully", products });
    } catch (err) {
        console.error("Error fetching products:", err);
        res.status(500).json({ message: "Error fetching products", error: err.message });
    }
});
app.get('/getBook', async (req, res) => {
    try {
        const { email } = req.query; // Get email from query parameters

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        // Fetch books where email matches
        const books = await book.find({ email });

        console.log("Fetched books for email:", email, books);

        // If books are found, return them
        res.status(200).json({ message: "Books fetched successfully", books });
    } catch (err) {
        console.error("Error fetching books:", err);
        res.status(500).json({ message: "Error fetching books", error: err.message });
    }
});

app.post('/addProfile', async (req, res) => {
    try {
        const { name, photo, birthdate, address, email, phone } = req.body;

        // Find and update if email exists, otherwise create a new profile
        const updatedProfile = await profile.findOneAndUpdate(
            { email }, // Search by email
            { name, photo, birthdate, address, email, phone }, // Update fields
            { new: true, upsert: true } // Return the updated document & create if not found
        );

        res.status(200).json({ message: 'Profile saved successfully', profile: updatedProfile });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});
app.get('/getProfile', async (req, res) => {
    try {
        const { email } = req.query; // Get email from query parameters

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const userProfile = await profile.findOne({ email });

        if (!userProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.status(200).json({ message: 'Profile fetched successfully', profile: userProfile });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});
app.post('/updateOrderStatus', async (req, res) => {
    try {
        const { email, status } = req.body;

        console.log("🔍 Received Email:", email);
        console.log("🔍 Received Status:", status);

        // Validate required fields
        if (!email || !status) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Find and update the order by email
        const updatedOrder = await book.findOneAndUpdate(
            { email },  // Find by email
            { status }, // Update status
            { new: true } // Return updated document
        );

        if (!updatedOrder) {
            console.log("❌ Order Not Found for Email:", email);
            return res.status(404).json({ message: "Order not found" });
        }

        console.log("✅ Updated Order:", updatedOrder);

        res.status(200).json({ message: "Order status updated successfully", order: updatedOrder });
    } catch (error) {
        console.error("❌ Error updating order status:", error);
        res.status(500).json({ message: "Error updating order status", error: error.message });
    }
});

// Start the server
const PORT =  8093;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;

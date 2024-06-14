const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const path = require("path");
const mongoose = require('mongoose');
require('dotenv').config();
const UserRoutes = require("./Routes/userRoutes");
const ProductRoutes = require("./Routes/productRoutes");
const ArtworkAuthRoutes = require("./Routes/artworkAuthRoutes");
const CommisionArtworkRoutes = require("./Routes/commisionArtwork")
const seedProducts = require('./Seeds/productSeeder');

//Express Server Setup
const app = express();
const port = process.env.PORT || 5001;

//Express Middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Connection URL
const DB = process.env.DB_URI;
mongoose.connect(DB)
    .then(() => {
        console.log('Connected to MongoDB Atlas');

        //Server status endpoint
        app.get('/', (req, res) => {
            res.send('Server is Up!');
        });

        //Serve Images
        app.use('/uploads', express.static(path.join(__dirname, 'Photos')));

        // Routes
        app.use("/users", UserRoutes);
        app.use("/products", ProductRoutes);
        app.use("/artwork/auth", ArtworkAuthRoutes);
        app.use("/artwork/commision", CommisionArtworkRoutes);

        // Call the seed function to populate the database
        // seedProducts();

        app.listen(port, () => {
            console.log(`Node/Express Server is Up......\nPort: localhost:${port}`);
        });
    })
    .catch((error) => console.error('Error connecting to MongoDB Atlas:', error));
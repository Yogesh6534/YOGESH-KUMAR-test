const mongoose = require('mongoose');

// Define MongoDB URI string
const mongoURI = 'mongodb+srv://yogikumar2002:Wd9jOqtnlCkHLSki@cluster0.gcvmhp2.mongodb.net/'; // Replace 'mydatabase' with your actual database name

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        // Start your server or perform other operations here
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

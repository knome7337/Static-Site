const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the public directory
app.use(express.static('public'));

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// Serve the blog page
app.get('/blog', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/blog/index.html'));
});

// Serve the about page
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/about/index.html'));
});

// Serve the contact page
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/contact/index.html'));
});

// Handle 404 errors
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../../public/404.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 
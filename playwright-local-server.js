const express = require('express');
const path = require('path');

const app = express();
app.use('/css', express.static(path.join(__dirname, 'frontend/css')));
app.use('/js', express.static(path.join(__dirname, 'frontend/js')));
app.use('/External_Modules', express.static(path.join(__dirname,
     'frontend/External_Modules')));
app.use('/assets/images', express.static(path.join(__dirname,
    'assets/images')));


const rootDir = { root: path.join(__dirname, 'frontend')}

// Serve the root page
app.get('/', (req, res) => {
    res.sendFile('index.html',rootDir);
});

app.get('/signup.html', (req, res) => {
    res.sendFile('signup.html', rootDir);
});

app.get('/login.html', (req, res) => {
    res.sendFile('login.html', rootDir);
});

app.get('/home', (req, res) => {
    res.send("k")
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

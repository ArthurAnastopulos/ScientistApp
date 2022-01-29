const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(port, () => {
    console.log("Serving in port 3000");
});
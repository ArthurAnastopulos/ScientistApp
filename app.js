const express = require('express');
const port = process.env.PORT || 3000;
const path = require('path');
const ejsMate = require('ejs-mate');


const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use("/public", express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(port, () => {
    console.log("Serving in port 3000");
});
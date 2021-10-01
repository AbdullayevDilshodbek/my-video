// load the things we need
var express = require('express');
var app = express();


// set the view engine to ejs
app.set('view engine', 'ejs');

app.use('/files', express.static('./files'));

// use res.render to load up an ejs view file
const main = require('./routers/video.routes')

app.use('/', main)
// about page
// app.get('/about', function(req, res) {
//     res.render('pages/about');
// });

app.listen(8000,"192.168.13.80");
console.log(`Server is running on 8000`);
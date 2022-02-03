const express = require('express');
const app = express();
const cors = require('cors')
app.use(express.json())
app.use(cors())

const { sequelize } = require('./models')


// set the view engine to ejs
app.set('view engine', 'ejs');

app.use('/files', express.static('./files'));

// use res.render to load up an ejs view file
const videos = require('./routers/video.routes')
const users = require('./routers/user.routes')

// client site
app.use('/videos', videos)
app.get('/', function(req, res) {
    return res.redirect('/videos');
});
app.get('/login', function(req, res) {
    res.render('admin-panel/login');
});

// admin panel
app.use('/api/users', users)

app.listen(8000,"192.168.13.14", async () => {
    try {
        await sequelize.authenticate()
    } catch (error) {
        console.log('Error occured while syncing models with database', error)
    }
    console.log(`Server is running on 8000 PORT`);
})
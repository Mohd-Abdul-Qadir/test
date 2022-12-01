const mongoose = require('mongoose');
const DB = process.env.DATABASE;

mongoose.connect(DB, {
}).then(() => {
    console.log('connection sucsussful')
}).catch((err) => console.log('no conection', err))
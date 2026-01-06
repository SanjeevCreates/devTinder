const mongoose = require('mongoose');

const connectDB = async () =>{
    await mongoose.connect(
        'mongodb+srv://sanjubaby214388_db_user:W8qXZpaHMgxTZLAW@namastenode.xgggioe.mongodb.net/devTinder'
    );
};

module.exports = connectDB;




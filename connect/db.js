const mongoose = require('mongoose')
// const config = require('config')



const connectDB = async () => {
  
    try {
        await mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex : true
        });
        console.log('DB CONNECTED');
    } catch (err) {
        console.log(err.message);
        process.exit(1)
    }
};
module.exports = connectDB;
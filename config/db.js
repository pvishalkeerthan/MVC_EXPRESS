const mongoose = require('mongoose');

module.exports.connect = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/Student', { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.error('MongoDB connection error:', err));
};

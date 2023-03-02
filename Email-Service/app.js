const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const MessageBroker = require('./broker')

// import routes
const emailRoutes = require('./routes/email');
const { sendMail } = require('./mailer');

// app
const app = express();

setup = async () => {
    try {
        mongoose.connect(process.env.DATABASE, {
            family: 4
        })
        const instance = await MessageBroker.getInstance()

        //prepare the listener
        instance.listen('email_queue', sendMail)
        
        // middlewares
        app.use(cors());
        app.use(morgan('dev'));
        app.use(express.json());
        app.use(cookieParser());

        // routes middleware
        app.use('/api', emailRoutes);

        const port = process.env.PORT || 8000;

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });

    } catch (e) {
        console.error(e)
        process.exit(1)
    }
}
// setup DB and MessageQueue, then start server and exit process if could not be set up
setup()

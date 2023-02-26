const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema(
    {
        emailAddress: {
            type: String,
            required: true
        },
        sentDate: {
            type: Date,
            default: 0
        },
        status: {
            type: String
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Email', emailSchema);
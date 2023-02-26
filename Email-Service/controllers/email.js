const Email = require('../models/email');

const broker = require('../broker')

exports.sendEmail = async (req, res) => {
    // for now, declaring the email as sent already
    const now = new Date()
    const email = new Email({...req.body, sentDate: now.toISOString().split('T')[0], status: "SENT"})

    //save to db
    email.save((err, data) => {
        if (err) {
            console.log(err)
            return res.status(500).json({"message": "Something went wrong"})
        }
        res.json(data);
    });
};
const Email = require('../models/email');

const broker = require('../broker')

exports.sendEmail = async (req, res) => {
    // for now, declaring the email as sent already
    const now = new Date()
    const email = new Email({ ...req.body, sentDate: now.toISOString().split('T')[0], status: "SENT" })

    // send message to queue
    instance = await broker.getInstance()
    instance.send('email_queue', Buffer.from(JSON.stringify(email)))

    //save to db
    try {
        const data = await email.save(email)
        return res.json(data)
    } catch(err) {
        console.error(err)
        return res.status(500).json({ "message": "Something went wrong" })
    }
};

exports.getEmails = async (req, res) => {
    const email = req.query.email
    const start = req.query.start
    const end = req.query.end

    let filter = {}
    if (email) {
        filter = { ...filter, emailAddress: email }
    }
    if (start) {
        filter = {
            ...filter,
            sentDate: {
                ...filter.sentDate,
                $gt: start
            }
        }
    }
    if (end) {
        filter = {
            ...filter,
            sentDate: {
                ...filter.sentDate,
                $lt: end
            }
        }
    }

    try {
        const data = await Email.find(filter).exec()
        return res.json(data)

    } catch (err) {
        console.error(err)
        return res.status(500).json({
            "message": "Something went wrong"
        });
    }
}
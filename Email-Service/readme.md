# Email Service API

Email Service API is an API for sending email, query based on time range provided, query based on email address and query based on both time range and email address. Written in NodeJS

### Programming Language and Framework Used:
- Nodejs, Express.js

### Database Used:
- Mongoose

### Message broker
- RabbitMq

- You can find the information of above tech stack by clicking the following links

[https://mongoosejs.com/](mongoose)

[https://nodejs.org/en/](nodejs)

[https://expressjs.com/](express.js)


## Prerequisites

You need to have node and npm installed.

## Up and Running
```console
foo@bar:~$ git clone https://github.com/prashant3286/Grepsr-Assignment.git
foo@bar:~$ cd Grepsr-Assignment/
foo@bar:~/Grepsr-Assignment$ cd Email-Service
foo@bar:~/email-service$ npm install
foo@bar:~/email-service$ npm start
```
You will need to configure .env file at the root of the project to configure. Sample .env file can be as follows:
```console
DATABASE=mongodb://mongo:27017/emaildb
RABBIT_URL=amqp://rabbitmq:5672
```
The server should be running locally then...

You can test this through [POSTMAN](https://www.postman.com/)

## Endpoints

### Create and Send Email API

POST Method

/email/sendemail

### Get Email API

GET Method

/email/getemails

** queryby:**

timerange

email address

both timerange and email address


Architecture Diagram:

                                  +---------------+
                                  |               |
                                  |   API Server  |
                                  |               |
                                  +---------------+
                                           |
                                           | HTTP
                                           |
                                  +---------------+
                                  |               |
                                  |   sendEmail |
                                  |     Queue     |
                                  |               |
                                  +---------------+
                                           |
                                           | AMQP
                                           |
                                  +---------------+
                     +---------->|               |
                     |            | RabbitMQ      |
                     |            | Message Broker|
                     |            |               |
                     |            +---------------+
                     |                     |
                     |                     | AMQP
                     |                     |
           +---------------+      +---------------+
           |               |      |               |
           |   MongoDB     |<-----|  getEmails     |
           |   Database    |      |     Queue     |
           |               |      |               |
           +---------------+      +---------------+

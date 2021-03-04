const mongoose = require('mongoose')

const Message = require('./models/message')

exports.handler = async (event, request, context) => {

    const senderId = event.queryStringParameters['senderId']
    const mongodb_username = process.env.MONGODB_USER
    const mongodb_password = process.env.MONGODB_PASSWORD
    const mongodb_database = process.env.MONGODB_DATABASE

    const uri = `mongodb+srv://${mongodb_username}:${mongodb_password}@abhikatlasmumbaiin.16jmi.mongodb.net/${mongodb_database}?retryWrites=true&w=majority`;

    mongoose.connect(uri, { useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:true})
    const messages = await Message.find({senderId: `${senderId}`}).sort({ "timeStamp": 1 })

    return{
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
          },
        body: JSON.stringify(messages)
    }
}
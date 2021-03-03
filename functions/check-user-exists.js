const mongoose = require('mongoose')

const User = require('./models/user')

exports.handler = async (event, request, context) => {

    const username = event.queryStringParameters['username']
    const mongodb_username = process.env.MONGODB_USER
    const mongodb_password = process.env.MONGODB_PASSWORD
    const mongodb_database = process.env.MONGODB_DATABASE

    const uri = `mongodb+srv://${mongodb_username}:${mongodb_password}@abhikatlasmumbaiin.16jmi.mongodb.net/${mongodb_database}?retryWrites=true&w=majority`;

    mongoose.connect(uri, { useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:true})
    const user = await User.findOne({username})

    let resp
    console.log(user)
    if(!user) resp = `${username} doesn't exist`
    else resp = `${username} exists`
    return{
        statusCode: 200,
        headers: {
            /* Required for CORS support to work */
            'Access-Control-Allow-Origin': '*',
            /* Required for cookies, authorization headers with HTTPS */
            'Access-Control-Allow-Credentials': true
          },
        body: JSON.stringify(resp)
    }
}
const mongoose = require('mongoose')

const User = require('./models/user')

exports.handler = async (event, request, context) => {
    if (event.httpMethod == "POST") {
        const mongodb_username = process.env.MONGODB_USER
        const mongodb_password = process.env.MONGODB_PASSWORD
        const mongodb_database = process.env.MONGODB_DATABASE

        const uri = `mongodb+srv://${mongodb_username}:${mongodb_password}@abhikatlasmumbaiin.16jmi.mongodb.net/${mongodb_database}?retryWrites=true&w=majority`;

        mongoose.connect(uri, { useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex: true, useFindAndModify:true})
        
        let data = JSON.parse(event.body)
        let user = new User({
            username: data.username,
            contacts: [],
            groups: []
        })
        user = await user.save()
        return{
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify(user)
        }
    } else {
        return{
            statusCode: 404,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
              },
            body: 'Get method not allowed'
        }
    }
}
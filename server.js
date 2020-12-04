import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import users from './dbUser.js'

// APP CONFIG
const app = express();
const port = process.env.PORT || 8001
const ConnectionURL = "mongodb+srv://admin:Ria4zCTB6sDA8za8@cluster0.gd6io.mongodb.net/users?retryWrites=true&w=majority"

// MIDDLEWARES
app.use(express.json())
app.use(cors());


// DB CONFIG
mongoose.connect(ConnectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

// API ENDPOINTS
app.get('/', (request, response) => response.status(200).send('Server here !'))

app.post('/signup', (request, response) => {
    const dbUser = request.body

    users.create(dbUser, (err, data) => {
        if (err) {
            response.status(201).send({ "error": "Can't create database entry" })
        } else {
            response.status(201).send(data)
        }
    })

})

app.get(/\/login\/[a-zA-Z@\.-_]+/, (request, response) => {
    const email = request.url.split('/')[2]

    users.findOne({ "email": email }, (err, data) => {
        if (err) {
            response.status(200).send({ "error": "Error Occured !" })
            console.log("Error")
        } else if (data) {
            response.status(200).send(data)
        } else {
            response.status(200).send({ "error": "Can't find it" })
        }
    })

})

// LISTENER
app.listen(port, () => console.log(`Listening on PORT: ${port}`))
const express = require('express')
const mongoose = require('mongodb')
const cors = require('cors')
require('dotenv').config()

const userRouter = require('./routes/user')
const productRouter = require('./routes/product')
const categoryRouter = require('./routes/category')

const auth = require('./middlewares/authentication')

const app = express()
mongoose.connect(process.env.DbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
})
    .then(() => { console.log('Databse Server Connected Successfully!') })
    .catch((err) => { console.log(err) })

app.use(cors('*'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))  //reads the data sent by client to the server

app.get('/', (req, res, next) => {
    res.send('Welcome to the application.')
})

app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/category', categoryRouter)

app.use((req, res, next) => {
    let err = new Error('Not Found!')
    err.status = 404
    next(err)
})

app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(err.status || 500)
    res.json({
        status: 'error',
        message: err.message
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running at localhost:${process.env.PORT}`)
})

module.exports = productRouter
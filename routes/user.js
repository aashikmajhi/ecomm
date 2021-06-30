const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validation = require('../middlewares/validation')

const User = require('../models/User')

router.post('/register', (req, res, next) => {
    const { errors, isValid } = validation.registerInput(req.body)
    if (!isValid) {
        return res.status(400).json({
            status: 'error',
            message: errors
        })
    }

    let { username, password, firstName, lastName, role } = req.body
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (user) {
                return res.status(401).json({
                    status: 'error',
                    message: 'User already exists'
                })
            }

            bcrypt.hash(password, 10)
                .then(hashed => {
                    User.create({ username, password: hashed, firstName, lastName, role })
                        .then((user) => {
                            res.json({ status: 'Registration Successful' })
                        }).catch(next)
                }).catch(next)
        })
})

router.post('/login', (req, res, next) => {
    let { username, password } = req.body
    User.findOne({ username })
        .then((user) => {
            if (!user) {
                return res.status(401).json({
                    status: 'error',
                    message: 'User not found'
                })
            }
            bcrypt.compare(password, user.password)
                .then((isMatched) => {
                    if (!isMatched) {
                        return res.status(401).json({
                            status: 'error',
                            message: 'Password does not exist'
                        })
                    }

                    let payload = {
                        id: user.id,
                        username: user.username,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        role: user.role
                    }
                    jwt.sign(payload, process.env.SECRET, (err, token) => {
                        if (err) {
                            return (err)
                        }
                        res.json({
                            status: 'Login Successful',
                            token:'Bearer ${token}'
                        })
                    })
                }).catch(next)
        }).catch(next)
})

module.exports = router
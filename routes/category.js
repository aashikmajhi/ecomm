const express = require('express')
const router = express.Router()
const Category = require('../models/Category')
const auth = require('../middlewares/authentication')

router.route('/')
    .get((req, res, next) => {
        Category.find()
            .then((categories) => {
                res.json(categories);
            }).catch(next);
    })
    .post(auth.verifyAdmin,(req, res, next) => {
        Category.create(req.body)
            .then(category => {
                res.status(201).json(category);
            }).catch(next);
    })
    .delete(auth.verifyAdmin,(req, res, next) => {
        Category.deleteMany()
            .then(reply => {
                res.json(reply);
            }).catch(next);
    })

router.route('/:category_id')
    .get((req, res, next) => {
        Category.findById(req.params.category_id)
            .then(categories => {
                res.json(categories);
            }).catch(next);
    })
    .put(auth.verifyAdmin,(req, res, next) => {
        Category.findByIdAndUpdate(req.params.category_id, { $set: req.body }, { new: true })
            .then(category => {
                res.json(category);
            }).catch(next);
    })
    .delete(auth.verifyAdmin,(req, res, next) => {
        Category.deleteOne({ _id: req.params.category_id })
            .then(reply => {
                res.json(reply);
            }).catch(next);
    })

    module.exports = router;
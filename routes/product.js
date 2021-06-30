const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const auth = require('../middlewares/authentication')

router.route('/')
    .get((req, res, next) => {
        Product.find()
            .then((product) => {
                res.json(product)
            }).catch(next)
    })

    .post(auth.verifyAdmin, (req, res, next) => {
        let { name, desc, done } = req.body
        Product.create({ name, desc, done })
            .then(product => {
                res.status(201).json(product)
            }).catch(next)
    })

    .delete(auth.verifyAdmin, (req, res, next) => {
        Product.deleteMany()
            .then(reply => {
                res.json(reply)
            }).catch(next)
    })

router.route('/:product_id')
    .get((req, res, next) => {
        Product.findOne(req.params.product_id)
            .then(product => {
                res.json(product)
            }).catch(next)
    })

    .put(auth.verifyAdmin, (req, res, next) => {
        Product.findByIdAndUpdate(req.params.product_id, { $set: req.body }, { new: true })
            .then(product => {
                req.json(product)
            }).catch(next)
    })

    .delete(auth.verifyAdmin, (req, res, next) => {
        Product.deleteOne({ _id: req.params.product_id })
            .then(reply => {
                res.json(reply)
            }).catch(next)
    })

router.route('/:product_id/queries')
    .get((req, res, next) => {
        Product.findById(req.params.product_id)
            .then(product => {
                res.json(product.query)
            })
    })

    .post(auth.verifyUser, (req, res, next) => {
        Product.findById(req.params.product_id)
            .then(product => {
                res.json(product.queries)
            }).catch(next)
    })

    .delete(auth.verifyUser, (req, res, next) => {
        Product.findById(req.params.product_id)
            .then(product => {
                product.queries = []
                product.save()
                    .then(updateQuery => {
                        res.json(updateQuery.queries)
                    }).catch(next)
            }).catch(next)
    })

router.route('/:product_id/queries/query_id')
    .get((req, res, next) => {
        Product.findById(req.params.product_id)
            .then(product => {
                res.json(product.queries.id(req.params.query_id))
            }).catch(next)
    })

    .put(auth.verifyUser, (req, res, next) => {
        Product.findById(req.params.product_id)
            .then(product => {
                let query = product.queries.id(req.params.query_id)
                query.text = req.body.text
                product.save()
                    .then(updateQuery => {
                        res.status(200).json(product.queries.id(req.params.query_id))
                    }).catch(next)
            }).catch(next)
    })

    .delete(auth.verifyUser, (req, res, next) => {
        Product.findById(req.params.product_id)
            .then(product => {
                product.queries = product.queries.filter((query) => {
                    return query.id !== req.params.query_id
                })
                product.save()
                    .then(updateProduct => {
                        res.json(product.queries)
                    }).catch(next)
            }).catch(next)
    })

router.route('/:question_id/queries/:query_id/replies')
    .get((req, res, next) => {
        Product.findById(req.params.product_id.query_id)
            .then(query => {
                res.json(query.replies)
            }).catch(next)
    })

    .post(auth.verifyAdmin, (req, res, next) => {
        Product.findById(req.params.product_id.query_id)
            .then(query => {
                query.replies.push(req.body)
                query.save()
                    .then(updateQuery => {
                        res.json(updateQuery.replies)
                    }).cathch(next)
            }).catch(next)
    })

    .delete(auth.verifyAdmin, (req, res, next) => {
        Product.findById(req.params.product_id.query_id)
            .then(query => {
                query.replies = []
                product.save()
                    .then(updateQuery => {
                        res.json(updateQuery.replies)
                    }).catch(next)
            }).catch(next)
    })

router.route('/:question_id/queries/:query_id/replies/:reply_id')

    .get((req, res, next) => {
        Product.findById(req.params.product_id.query_id)
            .then(product => {
                res.json(product.replies.id(req.params.reply_id))
            }).catch(next)
    })

    .put(auth.verifyAdmin, (req, res, next) => {
        Product.findById(req.params.product_id.query_id)
            .then(product => {
                let reply = product.replies.id(req.params.reply_id)
                reply.text = req, body.text
                product.save()
                    .then(updateProduct => {
                        res.json(updateProduct.replies.id(req.params.reply_id))
                    }).catch(next)
            }).catch(next)
    })

    .delete(auth.verifyAdmin, (req, res, next) => {
        Product.findById(req.params.product_id.query_id)
            .then(product => {
                product.replies = product.replies.filter((reply) => {
                    return replies.id !== req.params.reply_id
                })

                product.save()
                    .then(updateProduct => {
                        res.json(updateProduct.replies)
                    }).catch(next)
            }).catch(next)
    })

module.exports = router;

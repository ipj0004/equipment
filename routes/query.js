const router = require('express').Router()
const {Eq} = require('../models/Eq')

router.post('/add', (req, res) => {
    const post = new Eq(req.body)
    post.save((err) => {
        if(err) return res.status(400).json({success: false, error: err})
        return res.status(200).json({success: true})
    })
})

router.get('/', (req, res) => {
    Eq.find().exec((err, docs) => {
        if(err) return res.status(400).json({success: false, error: err})
        return res.status(200).json({success: true, found: docs})
    })
})

router.get('/detail/:id', (req, res) => {
    let id = req.params.id

    Eq.findById(id, function (err, doc) {
        if(err) return res.status(400).json({success: false, error: err})
        return res.status(200).json({success: true, found: doc})
    })
})

router.put('/update/:id', (req, res) => {
    Eq.findByIdAndUpdate(
        req.params.id, {
            $set:req.body
        },
        (err, doc) => {
            if(err) return res.status(400).json({success: false, err})
            return res.status(200).json({success: true, before: doc})
        }
    )
})

router.put('/pushRentalHistory/:id', (req, res) => {
    Eq.findByIdAndUpdate(
        req.params.id, {
            $push:{rentalHistory: req.body}
        },
        (err, doc) => {
            if(err) return res.status(400).json({success: false, err})
            return res.status(200).json({success: true, before: doc})
        }
    )
})

router.delete('/delete/:id', (req, res) => {
    Eq.findByIdAndRemove(req.params.id).exec((err, deletedItem) => {
        if(err) {
            res.send(err)
        }
        return res.json(deletedItem)
    })
})

module.exports = router

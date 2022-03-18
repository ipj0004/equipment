const router = require('express').Router()
const {Eq} = require('../models/Eq')


/*************************************************************************/
/******************* To add a new document into DB ***********************/
/*************************************************************************/
router.post('/add', (req, res) => {
    const post = new Eq(req.body)
    post.save((err) => {
        if(err) return res.status(400).json({success: false, error: err})
        return res.status(200).json({success: true})
    })
})


/*************************************************************************/
/********************* To get all documents in DB ************************/
/* disable and find another solution if your collection is huge so that response time exceeds 20s */
/*************************************************************************/
router.get('/', (req, res) => {
    Eq.find().exec((err, docs) => {
        if(err) return res.status(400).json({success: false, error: err})
        return res.status(200).json({success: true, found: docs})
    })
})


/*************************************************************************/
/********************* To get a document from DB *************************/
/*************************************************************************/
router.get('/detail/:id', (req, res) => {
    let id = req.params.id

    Eq.findById(id, function (err, doc) {
        if(err) return res.status(400).json({success: false, error: err})
        return res.status(200).json({success: true, found: doc})
    })
})


/*************************************************************************/
/************ To edit one or multiple data of a document  ****************/
/*************************************************************************/
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


/*************************************************************************/
/******* To add a new record onto the Rental History of a document  ******/
/*************************************************************************/
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


/*************************************************************************/
/************************* To delete a document  *************************/
/*************************************************************************/
router.delete('/delete/:id', (req, res) => {
    Eq.findByIdAndRemove(req.params.id).exec((err, deletedItem) => {
        if(err) {
            res.send(err)
        }
        return res.json(deletedItem)
    })
})

module.exports = router

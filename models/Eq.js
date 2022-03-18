const mongoose = require('mongoose')
const Schema = mongoose.Schema


/*************************************************************************/
/*********************** Defines your DB here ****************************/
/*************************************************************************/
const EqSchema = new Schema({
    no: {
        type: String,
        unique: true,
        required: true
    },
    discarded: {
        type: Boolean,
        default: false
    },
    discardedReason: String,
    registrated: String,
    description: String,
    unitPrice: Number,
    qty: Number,
    department: String,
    owner: String,
    location: String,
    rentalHistory: [{user: String, since: String}],
    note: String,
    phoneNo: String,
    appearance: String,
    label: String
})

module.exports = {
    Eq: mongoose.model('things', EqSchema)
}

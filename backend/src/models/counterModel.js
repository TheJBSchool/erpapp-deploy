const mongoose = require('mongoose');

const CounterSchema = new mongoose.Schema({
    name: { type: String, default: 'invoiceCount' }, 
    count: { type: Number, default: 0 }, 
    underBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
});

const Counter = mongoose.model('Counter', CounterSchema);

module.exports = Counter;

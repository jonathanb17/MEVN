const { model, Schema } = require('mongoose');

const employeeSchema = new Schema({
   // _id: String,
    name: String,
    position: String,
    office: String,
    salary: Number
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model('Employee', employeeSchema);
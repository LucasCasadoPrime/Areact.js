const { ObjectID, ObjectId } = require('bson');
const mongoose = require('mongoose');

const areaSchema = new mongoose.Schema({
    id: { type: String, require: true },
    name: { type: String, require: true },
    action: {
        name: { type: String, require: true },
        service: { type: String, require: true },
        cron: { type: String },
        paramsType: { type: Array, require: true }, 
        params: { type: Array, require: true },
        callback: { type : String, require: true },
    },
    reaction: {
        name: { type: String, require: true },
        service: { type: String, require: true },
        paramsType: { type: Array, require: true }, 
        params: { type: Array, require: true },
        callback: { type : String, require: true },
    },
    cronJob : {
        active: { type: Boolean, require: true ,default: false},
        cron: { type: Object, require: true },
    },
    user: { type: ObjectID, require: true },
    data: { type: Object }
});

const Area = mongoose.model('Area', areaSchema);
module.exports = Area;
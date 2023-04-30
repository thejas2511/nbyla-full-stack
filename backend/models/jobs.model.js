const mongoose = require('mongoose');

const Schema=mongoose.Schema;

const jobSchema=new Schema({
    title:{type:String},
    location:{type:String},
    description:{type:String},
    deadline:{type:Date},
    contactPhoneNumber:{type:String},
    contactEmail:{type:String},
    isArchived:{type:Boolean},
    interested:{type:Array}
    
});


const Job=mongoose.model('Job',jobSchema);

module.exports=Job;
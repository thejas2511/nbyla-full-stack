const router=require('express').Router();

let Job=require('../models/jobs.model');

router.route('/add').post((req,res)=>{
    const title=req.body.title;
    const location=req.body.location;
    const deadline=Date.parse(req.body.deadline);
    const description=req.body.description;
    const contactPhoneNumber=req.body.contactPhoneNumber;
    const contactEmail=req.body.contactEmail;
    const isArchived=false
    const interested=[]; 
    
    const newJob=new Job({
        title,location,deadline,description,contactPhoneNumber,contactEmail,isArchived,interested
    });

    newJob.save()
    .then(()=>res.json("New job added"))
    .catch(err=>res.status(400).json("Error"+err))
});

router.route("/get").get((req,res)=>{
    Job.find()
    .then((jobs)=>res.json(jobs))
    .catch(err=>res.status(400).json("Error"+err))

});

router.route("/getApplicant").get((req,res)=>{
    Job.find({isArchived:false})
    .then((jobs)=>res.json(jobs))
    .catch(err=>res.status(400).json("Error"+err))

});



router.route("/archive").post((req,res)=>{
    Job.findById(req.body._id)
    .then((job)=>{
        job.isArchived=!job.isArchived;
        job.save()
        .then((job1)=>res.json(job1))
        
    });
    
    
})

router.route("/interested").post((req,res)=>{
    Job.findById(req.body._id)
    .then((job)=>{

        if(job.interested.includes(req.body.user)){
            job.interested.splice(job.interested.indexOf(req.body.user),1)
        }
        else{
            job.interested.push(req.body.user);
        }
        job.save()
        .then((job1)=>res.json(job1))
        
    });
    
    
})

module.exports=router;

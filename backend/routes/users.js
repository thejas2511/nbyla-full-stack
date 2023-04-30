const router=require('express').Router();

let User=require('../models/users.model');

router.route('/add').post((req,res)=>{
    const name=req.body.name;
    const password=req.body.password;
    const role=req.body.role;
    
    const newUser=new User({
        name,password,role
    });

    newUser.save()
    .then((user)=>res.json({validate:true,name:user.name,role:user.role,_id:user._id}))
    .catch(err=>res.status(400).json("Error"+err))
});



router.route('/validate').post((req,res)=>{
    const name=req.body.name;
    const password=req.body.password
    User.findOne({"name":name})
    .then(user=>
        {if(user.password==password)
            {res.json({validate:true,name:user.name,role:user.role,_id:user._id})}
         else{
            res.json({validate:false})
         }

    })
    .catch(err=>res.status(400).json("Error"+err))
    
});

module.exports=router;
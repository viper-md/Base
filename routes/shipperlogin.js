const shippermodel=require('../models/shipper').shipper;
let async=require("async");


exports.shipper_register=function(req,res,next){
    console.log("body -----"+JSON.stringify(req.body));
    var data={};
    data.name=req.body.name;
    data.email=req.body.email;
    data.country_code=req.body.country_code;
    data.mobile=req.body.mobile;
    data.password=req.body.password;
    data.company_name=req.body.company_name;


     let shipper= shippermodel.build(data);
     shipper.save().then(saveduser=>{
            res.send(saveduser);
            next(null);
     }).catch(err=>{
         res.send(err);
         next(err);
     })
    



}
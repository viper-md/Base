let express = require("express");
let bodyParser = require("body-parser");
let shippercontroller=require('./routes/shipperlogin');
let jwt = require("jsonwebtoken");
let shipper= require("./models/shipper").shipper;
let passport=require('passport');
let passportService = require('./config/passport');


let app = express();
//let jwt = require("jsonwebtoken");
//let auth = require("./config/auth.js");
//let users = require("./app/model/users.js");
//let User=require("./app/model/database.js");
//let cfg = require("./config/cfg.js");
let api=express.Router();

let port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

app.use(passport.initialize());


const requireAuth = passport.authenticate('jwt', { session: false });
//const requireLogin = passport.authenticate('local', { session: false });



function generateToken(user) {  
//	res.json("woring"+ user);
console.log("====generating token====")
	 return jwt.sign(user,"abcabc", {
    	expiresIn: 10080 // in seconds
  });
}

function setUserInfo(request) {

  let getUserInfo = {
		id: request.shipper_id,
		email: request.email,
		password:request.password,
		
  }

  return getUserInfo;
}
app.get('/get',requireAuth,function(req,res,next){
        res.send("authorised");
})
app.post('/register',shippercontroller.shipper_register);
app.post("/login",function(req,res){
	let email=req.body.email;
	let password=req.body.password;
	shipper.findOne( {where :{email : email , password : password }}  ).then(function (user) {
		if(user){
			console.log("inside");
			let userinfo=setUserInfo(user);
			//res.send(userinfo);
            console.log(generateToken(userinfo));

			res.json({token : generateToken(userinfo)});
            
			
		 }
		
		}).catch(function(error){
			return res.send(error);
		});
	//find in databse
	// if exsit , check the password .else error. 

});



app.listen(port,function(err,res){
    if(err){
        console.log(err);
    }
    else{
        console.log("running"+port);
    }
})
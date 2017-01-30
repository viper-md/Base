var Sequelize=require("sequelize");
var DataTypes = require('sequelize/lib/data-types');
var sequelize = new Sequelize('test', 'root', 'mukul', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

});
var shipper=sequelize.define('shipper',{
    shipper_id : {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
    },
    access_token:{
        type:DataTypes.INTEGER,
        defaultValue : 0
    },
    name :{
        type:DataTypes.STRING,
        allowNull:false
    
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        validate:{
            isEmail:true
        }
    },
    country_code:{
         type:Sequelize.INTEGER,
        allowNull:false
    },
    mobile:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    company_name:{
         type:Sequelize.STRING,
        allowNull:false
    },
    fb_id:{
         type:Sequelize.STRING,
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    registeration_type:{
        type:Sequelize.STRING
    },
    company_address:{
        type:Sequelize.STRING
    },
    device_token:{
        type:Sequelize.STRING
        
    },
    lat:{
        type:Sequelize.DECIMAL,
        allowNull:true
    },
    long:{
        type:Sequelize.DECIMAL,
        allowNull:true
    },
    user_type:{
        type:DataTypes.ENUM('0','1','2'),
        defaultValue:'0'
    },
    OTP:{
        type:DataTypes.INTEGER
    },
    forgot_password_set:{
        type:Sequelize.STRING
        
    },
    email_verification_code:{
        type:Sequelize.STRING
        
    },
    isblock:{
        type:DataTypes.ENUM('0','1')
        
    },
    invitation_code:{
        type:Sequelize.STRING
        
    },
    invitation_used:{
        type:Sequelize.STRING
        
    },
    max_invitations:{
        type:Sequelize.INTEGER
        
    }
    
    

},{
    
    freezeTableName: true // Model tableName will be the same as the model name
})
var User = sequelize.define('user', {
  email: {
    type: Sequelize.STRING,
   // unique:true,
    field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
  },
  password: {
    type: Sequelize.STRING
  }
},

 {
    
    freezeTableName: true // Model tableName will be the same as the model name
});

shipper.sync({force: false}).then(function () {
  // Table created
  return shipper.create({
    email: 'mukul@mail.com',
    password: 'mukuldev',
    name:"mukul",
    country_code:10,
    mobile:99999,
    company_name:"abc",
  });
});
//dummy data for testing 

module.exports={
    User,
    sequelize,
    shipper
}


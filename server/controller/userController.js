const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
const crypto = require("crypto");
const UserModal = require("../model/user");


exports.signup = (req, res) => {
 async function uidGenerate(len) {
    return crypto
      .randomBytes(Math.ceil(len / 2))
      .toString("hex")
      .slice(0, len);
  }
  const {first_name, last_name, email, password, mobile, role} = req.body;


  const uid = await   uidGenerate(13);
  const data = await  UserModal.find({})
  const id=data.length +1;
  try {

    if(!first_name ||!last_name||!email||!password||mobile||role){
        return res.status(400).json({message: "All files required"});
    }
    if(mobile.length != 10){
        return res.status(400).json({message: "mobile number must be 10 digits"});
    }
    if(password.length<8){
        return res.status(400).json({message: "password must be atleast 8 characters"});
    }
    let olduser = await UserModal.findOne({email});
    if(!olduser){
        olduser=await UserModal.findOne({mobile});
    } 
    if (olduser) {
      return res.status(400).json({message: "user already exists"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await UserModal.create({
      id,
      uid,
      first_name,
      last_name,
      password: hashedPassword,
      mobile,
      role,
      status:active
      
    });
    const token = jwt.sign({id:uid}, secret, {expiresIn: "30d"});
    return res.status(200).json({token , message:"Account successfully created"});
  } catch (error) {
    res.status(500).json({message: "something went wrong"});
    console.log(error);
  }
};

exports.login = async (req, res) => {

    async function uidGenerate(len) {
        return crypto
          .randomBytes(Math.ceil(len / 2))
          .toString("hex")
          .slice(0, len);
      }
    const {email, password} = req.body;
    try {
      const olduser = await UserModal.findOne({email});
      if (!olduser) {
        return res.status(400).json({message: "User doesn't exist"});
      }
      
      isPasswordCorrect = await bcrypt.compare(password, olduser.password);
      if (!isPasswordCorrect) {
        return res.status(501).json({message: "Validation failed"});
      }
      const uid = await   uidGenerate(13);
      const token = jwt.sign({id:uid ,email:email}, secret, {expiresIn: "30d"});
      return res.status(200).json({data: olduser, token ,message:"Logged in successfully"});
    } catch (err) {
      console.log(err);
      res.status(500).json({message: "something went wrong"});
    }
  };

  exports. getUserData=(req,res)=>{
    
    try {
        let token=req.body.token
        if (token) {
          decodeData = jwt.verify(token, secret);
          uid= decodeData.uid

          let olduser = await UserModal.findOne({uid});
     
    if (olduser) {
      return res.status(200).json({data:olduser,message:"user data fetched successfully"});
    }

        }
  }catch(err){
    res.status(500).json({message: "something went wrong"});
  }

}

exports.getAllUsers=(req,res)=>{
try { 
let userslist=UserModal.find({},{name:1,email:1,mobile:1,status:1,role:1})
if(userslist){
    res.status(200).json(userslist)
}

}
catch(err){console.log(err) 
    res.status(500).json({message: "something went wrong"});}
}
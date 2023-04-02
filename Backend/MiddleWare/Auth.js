

const jwt = require("jsonwebtoken");


const User = require("../Modal/UserSchema");

const auth = async function (req, res, next) {
  const cookies = req.headers.cookie;
  if (!cookies) {
    return res.status(400).json({ error: "cookie not found" });
  }
  const token = cookies.split("=")[1];
  if (!token) {
    return res.status(400).json({ error: "cookie not found" });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    req.userId = decode.userId;

   
  } catch (err) {
    console.log(err);
    return res.status(500).json({ massege: "server error" });
  }
  next();
};



const getUser = async function (req, res, next) {
  const UserId = req.userId;
  let user;
  try {
    user = await User.findById(UserId).select('-password -cpassword');
    if (!user) {
      return res.status(401).json({ massage: "user not found" });
    }
    return res.status(200).json({ user });
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "unauthorize" });
  }
  next()
};




module.exports = { auth, getUser };

const User = require('../Modal/UserSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signUp = async (req, res) => {
  const { firstName, email, phone, password, cpassword } = req.body
  if (!firstName || !email || !phone || !password || !cpassword) {
    return res.status(403).json({ error: 'please fill all field' })
  }
  try {
    const userExit = await User.findOne({ email })
    if (userExit) {
      return res.status(402).json({ error: 'user alreafy exits' })
    }
    if (password != cpassword) {
      return res.status(401).json({ error: 'password does not match' })
    } else {
      const user = new User({
        firstName,
        email,
        phone,
        password,
        cpassword,
      })
      await user.save()
      return res.status(200).json({ massage: 'user sign up successfull' })
    }
  } catch (error) {
    return res.status(500).json(error)
  }
}

const signin = async (req, res) => {
  let token

  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(403).json({ error: 'please fill all field' })
    }
    const isUser = await User.findOne({ email })

    if (!isUser) {
      return res.status(402).json({ error: 'user does not found' })
    }
    const user = await User.findById(isUser._id).select('-password -cpassword')
    const isMatch = await bcrypt.compare(password, isUser.password)
    if (!isMatch) {
      return res.status(401).json({ error: 'invalid user info' })
    } else {
      token = jwt.sign({ userId: isUser._id }, process.env.JWT_SECRET_TOKEN, {
        expiresIn: '10m',
      })

      res.cookie('tokens', token, {
        maxAge: 1000 * 600,
        sameSite: 'none',
        httpOnly: true,
        secure: true,
      })

      return res
        .status(200)
        .json({ token, massage: ' user log in successfully', user })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ massage: 'server error' })
  }
}

module.exports = { signUp, signin }

const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })
const cookieParser = require('cookie-parser')
const router = require('../Route/route')
const PORT = process.env.PORT
const cors = require('cors')
app.use(cors({ origin: /.*/, credentials: true }))
app.use(express.json())
app.use(cookieParser())

require('../DB/index')

app.use('/api/v1', router)
app.listen(PORT, () => {
  console.log(`app is listen http://localhost:${PORT}`)
})

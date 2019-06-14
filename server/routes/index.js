const express = require('express')
const anime = require('./anime')
const router = express.Router()
const userRouter = require('./user')

router.use('/animes', anime)
router.use('/users',userRouter)


module.exports = router
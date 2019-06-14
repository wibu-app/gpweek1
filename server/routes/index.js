const express = require('express')
const router = express()
const anime = require('./anime')

router.use('/animes', anime)

module.exports = router
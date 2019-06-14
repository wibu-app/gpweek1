const express = require('express')
const router = express()
const anime = require('../controllers/anime')
// const authentication = require('../middlewares/authentication')

// router.use(authentication)
router.get('/', anime.fetch)
router.get('/search', anime.search)
router.get('/details', anime.findOne)

module.exports = router
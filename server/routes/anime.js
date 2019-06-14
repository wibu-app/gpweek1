const express = require('express')
const router = express()
const anime = require('../controllers/anime')
// const authentication = require('../middlewares/authentication')

// router.use(authentication)
router.get('/', anime.fetch)
router.get('/search/:name', anime.search)
router.get('/genre/:genre', anime.searchgenre)
router.get('/details/:id', anime.findOne)

module.exports = router
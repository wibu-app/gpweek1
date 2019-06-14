const Fav = require('../models/fav')

module.exports = function (req, res, next) {
    console.log(req.params)
    Fav.findOne({
            idAlbum: req.params.id
        })
        .then(response => {
            console.log(response, 'author')
            if (response) {
                if (req.decoded.id == String(response.userId)) {
                    next()
                } else {
                    throw({
                        status: 401,
                        msg: 'Not Authorized'
                    })
                }
            } else {
                throw({
                    status: 404,
                    msg: 'Not Found'
                })
            }
        })
        .catch(next)
}
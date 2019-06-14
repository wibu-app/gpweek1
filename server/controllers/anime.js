const axios = require('axios')

let ax = axios.create({
    baseURL: `https://kitsu.io/api/edge`,
})

class Controller{
    static search(req, res, next){
        ax.get(`/anime?filter[text]=${req.params.name}`)
        .then(({data}) => {
            res.status(200).json(data)
        })
        .catch(next)
    }
    static searchgenre(req, res, next){
        ax.get(`/anime?filter[genres]=${req.params.genre}`)
        .then(({data}) => {
            res.status(200).json(data)
        })
        .catch(next)
    }
    static fetch(req, res, next){
        ax.get(`/trending/anime`)
        .then(({data}) => {
            // console.log(data.data[0].id)
            // console.log(Controller.getOne(data.data[0].id))
            var arr = []
            for (let i = 0; i < data.data.length; i++){
                arr.push(Controller.getOne(data.data[i]))
            }
            return Promise.all(arr)
        })
        .then(data => {
            var haha = []
            for (let i = 0; i < data.length; i++){
                haha.push(data[i].data.data)
            }
            res.status(200).json({
                anime: haha
            })
        })
        .catch(next)
    }
    static findOne(req, res, next){
        ax.get(`/anime/${req.params.id}`)
        .then(({data}) => {
            console.log(data)
            res.status(200).json(data)
        })
        .catch(next)
    }
    static getOne(input){
        return ax.get(`/anime/${input.id}`)
    }
    static music(req,res,next){
        ax.get(`https://api.deezer.com/search?q=track=${req.params.title}`)
        .then(({data}) => {
            let musics = []
            for(let i=0;i<data.data.length;i++){
                musics.push({
                    title: data.data[i].title,
                    preview: data.data[i].preview
                })
            }
            console.log(musics)
            res.status(200).json(musics)
        })
        .catch(next)
    }
}

module.exports = Controller
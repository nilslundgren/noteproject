const Article = require('./../models/Note')
const User = require('./../model/User')
const fs = require('fs')
const cloudinary = require('cloudinary')

module.exports = {
    addArticle: (requ, res, next) => {
        let { text, title, star, description } = req.body
        if (req.files.image) {
            cloudinary.uploader.upload(reqfiles.image.path, (result) => {
                //let obj = { text, title, star, description, feature_img: result.url != nuull ? result.url : '' }
                saveNote(obj)
                }
            })
        }
    }
}

/** */
const Note = require('./../models/Note')
const User = require('./../models/User')
const fs = require('fs')
const cloudinary = require('cloudinary')

module.exports = {
    addNote: (req, res, next) => {
        let { text, title, star, description } = req.body
        //let obj = { text, title, star, description, feature_img: _feature_img != null ? `/uploads/${_filename}` : '' }
        if (req.files.image) {
            cloudinary.uploader.upload(req.files.image.path, (result) => {
                let obj = { text, title, star, description, feature_img: result.url != null ? result.url : '' }
                saveNote(obj)
                /*(new Student({...{url: result.url},...req.body})).save((err, newStudent) => {
                const cloud_res = {
                    url: result.url
                }
                const newS = newStudent.toObject()
                console.log({...{url: result.url},...req.body})
                if(err)
                    res.send(err)
                else if (!newStudent)
                    res.send(400)
                else
                    res.send({...newS,...cloud_res})
                next()
            })*/
            },{
                resource_type: 'image',
                eager: [
                    {effect: 'sepia'}
                ]
            })
        }else {
            saveNote({ text, title, star, description, feature_img: '' })
        }
        function saveNote(obj) {
            new Note(obj).save((err, note) => {
                if (err)
                    res.send(err)
                else if (!note)
                    res.send(400)
                else {
                    return Note.addAuthor(req.body.author_id).then((_note) => {
                        return res.send(_note)
                    })
                }
                next()
            })
        }
        /*let base64Data = null
        const _feature_img = req.body.feature_img
        _feature_img != null ? base64Data = _feature_img.replace(/^data:image\/png;base64,/, "") : null
        const _filename = `medium-clone-${Date.now()}.png`;
        let { text, title, star, description } = req.body
        let obj = { text, title, star, description, feature_img: _feature_img != null ? `/uploads/${_filename}` : '' }
        fs.writeFile(`/uploads/${_filename}`, base64Data, 'base64', function(err) {
            if(err)
                console.log(err)
            new Note(obj).save((err, Note) => {
                if (err)
                    res.send(err)
                else if (!Note)
                    res.send(400)
                else {
                    return Note.addAuthor(req.body.author_id).then((_Note) => {
                        return res.send(_Note)
                    })
                }
                next()
            })
        })*/
        /*new Note(obj).save((err, Note) => {
            if (err)
                res.send(err)
            else if (!Note)
                res.send(400)
            else {
                return Note.addAuthor(req.body.author_id).then((_Note) => {
                    return res.send(_Note)
                })
            }
            next()
        })*/

        /*var storage = multer.diskStorage({
            destination: function (req, file, callback) {
                callback(null, './uploads')
            },
            filename: function () {
                callback(null, )
            }
        })
        var upload = multer({
            storage: storage
        }).single('userFile')
        upload(req, res, function(err) {
        })*/
    },
    getAll: (req, res, next) => {
        Note.find(req.params.id)
        .populate('author')
        .populate('comments.author').exec((err, note)=> {
            if (err)
                res.send(err)
            else if (!note)
                res.send(404)
            else
                res.send(note)
            next()            
        })
    },

    /**
     * Note_id
     */
    clapNote: (req, res, next) => {
        Note.findById(req.body.Note_id).then((Note)=> {
            return Note.clap().then(()=>{
                return res.json({msg: "Done"})
            })
        }).catch(next)
    },

    /**
     * comment, author_id, Note_id
     */
    commentNote: (req, res, next) => {
        Note.findById(req.body.note_id).then((note)=> {
            return Note.comment({
                author: req.body.author_id,
                text: req.body.comment
            }).then(() => {
                return res.json({msg: "Done"})
            })
        }).catch(next)
    },

    /**
     * Note_id
     */
    getNote: (req, res, next) => {
        Note.findById(req.params.id)
        .populate('author')
        .populate('comments.author').exec((err, note)=> {
            if (err)
                res.send(err)
            else if (!note)
                res.send(404)
            else
                res.send(note)
            next()            
        })
    }
}
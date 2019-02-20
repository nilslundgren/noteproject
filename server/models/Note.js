const mongoose = require('mongoose')
let NoteSchema = new mongoose.Schema(
    {
        text: String, 
        title: String, 
        description: String,
        feture_img: String,
        star: { type: Boolean,
                default: false
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        comments: [
            {
                author: {
                    type: mongoose.Scehma.Types.ObjectId,
                    ref: 'User'
                },
                text: String
            }
        ]
    }
);
NoteSchema.methods.star = function() {
    if (this.star === false) {
        this.star = true
    } else {
        this.star = false
    }
    return this.save()
}
NoteSchema.methods.comment = function(c) {
    this.comments.push(c)
    return this.save()
}
NoteSchema.methods.addAuthor = function (author_id) {
    this.author = author_id 
    return this.save()
}
NoteSchema.methods.getUserNote = funtion(_id) {
    ArticleSchema.find({'author': _id}).then((note) => {
        return note
    })
}

module.exports = mongoose.model('Note', NoteSchema)


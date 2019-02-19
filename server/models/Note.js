const mongoose = require('mongoose')
let NoteSchema = new mongoose.Schema(
    {
        text: String, 
        title: String, 
        description: String,
        feture_img: String,
        star: Boolean,
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
ArticleSchema.methods.star = function() {
    this.
}
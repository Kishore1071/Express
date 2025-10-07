import mongoose from 'mongoose'
const { Schema, model } = mongoose

const NoteSchema = new Schema(
    {
    title: {
        type: String,
        required: true,
        maxlength: 100
    },
    content: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    }
    }, 
    { 
        timestamps: true
    }
)

export default model('Note', NoteSchema)

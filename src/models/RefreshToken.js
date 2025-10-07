import mongoose from 'mongoose'
const { Schema, model } = mongoose

const RefreshTokenSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        token: {
            type: String,
            required: true
        },
        expiresAt: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export default model('RefreshToken', RefreshTokenSchema)

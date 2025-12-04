import 'dotenv/config'
import express, { json } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import authRoutes from './routes/auth.js'
import notesRoutes from './routes/notes.js'
import crypto from 'crypto'


const app = express()
app.use(cors())
app.use(json())

const PORT = process.env.PORT || 3000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/notesdb'

mongoose.connect(MONGO_URI)
    .then(()=> console.log('Connected to MongoDB'))
    .catch(err => {
      console.error('MongoDB connection error:', err)
      process.exit(1)
})

app.use('/api', authRoutes)
app.use('/notes', notesRoutes)

app.get('/key', (requestuest, response) => {
    const key = crypto.randomBytes(64).toString('hex')
    response.json({ key: key })
})

app.get('/', (request,response) => response.json({ message: 'Express Notes API (ES Modules)' }))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

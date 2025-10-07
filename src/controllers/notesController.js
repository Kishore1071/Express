import Note from '../models/Note.js'

export const listNotes = async (request, response) => {

    try {

        const notes = await Note.find({ author: request.user.id }).sort({ createdAt: -1 })
        return response.json(notes)

    } catch (err) {

        console.error(err)
        return response.status(500).json({ detail: 'server error' })
      
    }
}

export const createNote = async (request, response) => {

    try {

        const { title, content } = request.body

        if (!title) return response.status(400).json({ detail: 'title is required' })

        const note = new Note({ title, content, author: request.user.id })
        await note.save()

        return response.status(201).json(note)

    } catch (err) {

        console.error(err)
        return response.status(500).json({ detail: 'server error' })

    }

}

export const deleteNote = async (request, response) => {

    try {
        
        const note = await Note.findOne({ _id: request.params.id, author: request.user.id })

        if (!note) return response.status(404).json({ detail: 'note not found' })

        await note.deleteOne()
        return response.status(204).send()

    } catch (err) {

        console.error(err)
        return response.status(500).json({ detail: 'server error' })
        
    }

}

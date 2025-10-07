import jwt from 'jsonwebtoken'
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'access_secret'

export default function auth(request, response, next) {
  
    const authHeader = request.headers.authorization

    if (!authHeader) return response.status(401).json({ detail: 'Authentication credentials were not provided.' })

    const parts = authHeader.split(' ')

    if (parts.length !== 2 || parts[0] !== 'Bearer') return response.status(401).json({ detail: 'Invalid authorization header' })

    const token = parts[1]

    try {

        const payload = jwt.verify(token, JWT_ACCESS_SECRET)
        request.user = { id: payload.userId, username: payload.username }
        return next()

    } catch (err) {
        
        return response.status(401).json({ detail: 'Invalid or expired token' })
    }
}

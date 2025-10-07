import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import RefreshToken from '../models/RefreshToken.js'

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || 'access_secret'
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret'
const ACCESS_EXP = process.env.ACCESS_TOKEN_EXPIRE_MINUTES || 15 // minutes
const REFRESH_EXP = process.env.REFRESH_TOKEN_EXPIRE_DAYS || 7 // days

const generateTokens = (user) => {

    const accessToken = jwt.sign(
        { userId: user._id, username: user.username },
        ACCESS_SECRET,
        { expiresIn: `${ACCESS_EXP}m` }
    )

    const refreshToken = jwt.sign(
        { userId: user._id },
        REFRESH_SECRET,
        { expiresIn: `${REFRESH_EXP}d` }
    )

    return { accessToken, refreshToken }
}

export const register = async (request, response) => {

    try {

        const { username, password } = request.body

        if (!username || !password) return response.status(400).json({ detail: 'username and password required' })

        const existing = await User.findOne({ username })

        if (existing) return response.status(400).json({ detail: 'username already taken' })

        const hashed = await bcrypt.hash(password, 10)
        const user = new User({ username, password: hashed })
        await user.save()

        return response.status(201).json({ id: user._id, username: user.username })

    } catch (err) {

        console.error(err)
        return response.status(500).json({ detail: 'server error' })

    }
}

export const token = async (request, response) => {

    try {
        
        const { username, password } = request.body

        if (!username || !password) return response.status(400).json({ detail: 'username and password required' })

        const user = await User.findOne({ username })

        if (!user) return response.status(401).json({ detail: 'invalid credentials' })

        const ok = await bcrypt.compare(password, user.password)

        if (!ok) return response.status(401).json({ detail: 'invalid credentials' })

        const { accessToken, refreshToken } = generateTokens(user)
        const exp = new Date(Date.now() + REFRESH_EXP * 24 * 60 * 60 * 1000)
        await RefreshToken.create({ user: user._id, token: refreshToken, expiresAt: exp })

        return response.json({ access: accessToken, refresh: refreshToken })

    } catch (err) {

        console.error(err)
        return response.status(500).json({ detail: 'server error' })

    }
}

export const refresh = async (request, response) => {

    const { refresh } = request.body

    if (!refresh) return response.status(400).json({ detail: 'refresh token required' })

    try {

        const payload = jwt.verify(refresh, REFRESH_SECRET)
        const saved = await RefreshToken.findOne({ user: payload.userId, token: refresh })

        if (!saved) return response.status(401).json({ detail: 'invalid refresh token' })

        if (saved.expiresAt < new Date()) return response.status(401).json({ detail: 'refresh token expired' })

        const user = await User.findById(payload.userId)

        if (!user) return response.status(401).json({ detail: 'user not found' })

        const accessToken = jwt.sign({ userId: user._id, username: user.username }, ACCESS_SECRET, { expiresIn: `${ACCESS_EXP}m` })

        return response.json({ access: accessToken })

    } catch (err) {

        console.error(err)
        return response.status(401).json({ detail: 'invalid or expired refresh token' })

    }
}

export const revoke = async (request, response) => {

    const { refresh } = request.body

    if (!refresh) return response.status(400).json({ detail: 'refresh token required' })

    try {

        await RefreshToken.deleteOne({ token: refresh })
        return response.json({ detail: 'refresh token revoked' })

    } catch (err) {

        console.error(err)
        return response.status(500).json({ detail: 'server error' })
        
    }
}

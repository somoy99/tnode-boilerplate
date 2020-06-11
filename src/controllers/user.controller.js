import { User } from '../models/user.model'
import { hash, compare } from 'bcrypt'
import { sign, verify } from 'jsonwebtoken'

export const login = async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })

    if (!user) {
      return createUser(req, res)
    }

    const psMatch = await compare(password, user.password)

    if (!psMatch) {
      return res.status(200).json({ psMatch })
    }
    const accessToken = sign({ username }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_LIFE
    })

    const refreshToken = sign({ username }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_LIFE
    })

    return res.status(200).json({ username, accessToken, refreshToken })
  } catch (error) {
    console.log(error)
  }
}

export const createUser = async (req, res) => {
  const { username, password } = req.body
  console.log({ username, password })
  try {
    const hashPass = await hash(password, 10)

    await User.create({
      username,
      password: hashPass
    })

    const accessToken = sign({ username }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_LIFE
    })
    const refreshToken = sign({ username }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_LIFE
    })

    return res.status(200).json({ username, accessToken, refreshToken })
  } catch (error) {
    console.log(error)
  }
}

export const refreshAccessToken = async (req, res) => {
  const { accessToken, refreshToken } = req.body
  try {
    verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    return res.status(200).json({ accessToken })
  } catch (error) {
    if (error.name !== 'TokenExpiredError') {
      res.status(401).json({ error: 'invalid access token' })
    }
    try {
      const { username } = verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      )
      const accessToken = sign({ username }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_LIFE
      })
      return res.status(200).json({ username, accessToken })
    } catch (error) {
      res.status(401).json({ error: 'invalid refresh token' })
    }
  }
}

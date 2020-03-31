import { User } from '../models/user.model';
import { hash, compare } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { jwtSecrets } from '../config';

export const login = async (req, res) => {

    let { username, password } = req.body;

    try {
        let user = await User.findOne({ username });

        if (!user) {
            return createUser(req, res);
        }

        let psMatch = await compare(password, user.password);

        if (!psMatch) {
            return res.status(200).json({ psMatch });
        }
        let accessToken = sign({ username }, jwtSecrets.acessTokenSecret, { expiresIn: jwtSecrets.accessTokenLife });

        let refreshToken = sign({ username }, jwtSecrets.refreshTokenSecret, { expiresIn: jwtSecrets.refreshTokenLife });

        return res.status(200).json({ username, accessToken, refreshToken });

    } catch (error) {
        console.log(error);
    }
}

export const createUser = async (req, res) => {
    let { username, password } = req.body;
    console.log({ username, password });
    try {
        let hashPass = await hash(password, 10);

        let newUser = await User.create({
            username,
            password: hashPass
        })

        let accessToken = sign({ username }, jwtSecrets.acessTokenSecret, { expiresIn: jwtSecrets.accessTokenLife });
        let refreshToken = sign({ username }, jwtSecrets.refreshTokenSecret, { expiresIn: jwtSecrets.refreshTokenLife });

        return res.status(200).json({ username, accessToken, refreshToken });

    } catch (error) {
        console.log(error);
    }
}

export const refreshAccessToken = async (req, res) => {
    let { accessToken, refreshToken } = req.body;
    try {
        verify(accessToken, jwtSecrets.acessTokenSecret);
        return res.status(200).json({ accessToken });
    } catch (error) {
        if (error.name != 'TokenExpiredError') {
            res.status(401).json({ error: "invalid access token" });
        }
        try {
            let { username } = verify(refreshToken, jwtSecrets.refreshTokenSecret);
            let accessToken = sign({ username }, jwtSecrets.acessTokenSecret, { expiresIn: jwtSecrets.accessTokenLife });
            return res.status(200).json({ username, accessToken });
        } catch (error) {
            res.status(401).json({ error: "invalid refresh token" });
        }
    }
}

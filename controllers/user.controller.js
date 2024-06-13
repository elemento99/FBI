import { UserModel } from '../models/user.model.js'
import jwt from 'jsonwebtoken'

const compare = (plainPassword, storedPassword) => {
    return plainPassword === storedPassword;
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await UserModel.findOneByEmail(email)

        if (!user) return res.status(400).json({
            ok: false,
            msg: "El email no está registrado"
        })

        const passwordIsValid = await compare(password, user.password)
        if (!passwordIsValid) return res.status(401).json({
            ok: false,
            msg: "Contraseña incorrecta"
        })

        const token = jwt.sign(
            { email: user.email },
            process.env.SECRET_JWT,
            { expiresIn: '2m' }
        )

        return res.json({
            token,
            email: user.email,
        })


    } catch (error) {
        console.log(error)
        return res.status(code).json({ ok: false, msg })
    }
}




export const UserController = {
    login,
}
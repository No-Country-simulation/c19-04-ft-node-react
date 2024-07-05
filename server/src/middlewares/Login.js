import jwt from 'jsonwebtoken'

const validarRol = async (req, res, next) => {
    const { mail, password } = req.body
    try {
        const userObject = await Usuario.findOne({ mail: mail })
        if (!userObject) {
            return res.status(401).json({ msg: "Combinacion de usuario y contraseña incorrectos", type: "error" })
        }
        if (await bcrypt.compare(password, userObject.password) === false) {
            return res.status(401).json({ msg: "Combinacion de usuario y contraseña incorrectos", type: "error" })
        }
        //Se crea payload del usuario
        const payload = { name: userObject.mail, id: userObject._id, rol: userObject.userType }
        const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '35m'
        })
        next()
        return res.status(200).json({ msg: "Usuario Logueado correctamente", type: "success", token, isAdmin: userObject.isAdmin })
    } catch (error) {
        return res.status(500).json({ msg: "Error interno del servidor", type: "error" });
    }
}

export default validarRol
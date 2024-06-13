import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import { UserController } from "./controllers/user.controller.js";
import { verifyTokenJWT } from "./middlewares/jwt.middleware.js";

export const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));


app.post('/login', UserController.login)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/index.html'))
})

app.get('/agent', (req, res) => {
    res.sendFile(__dirname + '/public/agent.html');
});

app.get('/protecte-verification', verifyTokenJWT, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/protected.html'))
})
app.get('/protected', (req, res) => {
    res.status(200).json({ message: 'Acceso concedido', user: req.user });
});

app.use('*', (_, res) => {
    res.status(404).json({ ok: false, msg: 'ruta no configurada 😐' })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`)
})
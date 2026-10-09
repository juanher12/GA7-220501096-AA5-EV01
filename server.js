
const express = require('express');

const app = express();
const PORT = 3000;

// Permite recibir datos en formato JSON.
app.use(express.json());

// Almacenamiento temporal de usuarios para realizar las pruebas.
const usuarios = [];

// Servicio para registrar un usuario.
app.post('/registro', (req, res) => {
    const { usuario, contrasena } = req.body;

    // Comprueba que se hayan enviado los datos requeridos.
    if (!usuario || !contrasena) {
        return res.status(400).json({
            mensaje: 'Debe ingresar un usuario y una contraseña.'
        });
    }

    // Evita registrar dos veces el mismo usuario.
    const usuarioExiste = usuarios.find(
        (item) => item.usuario === usuario
    );

    if (usuarioExiste) {
        return res.status(409).json({
            mensaje: 'El usuario ya está registrado.'
        });
    }

    // Guarda el usuario para las pruebas del servicio.
    usuarios.push({ usuario, contrasena });

    return res.status(201).json({
        mensaje: 'Usuario registrado correctamente.'
    });
});

// Servicio para iniciar sesión.
app.post('/login', (req, res) => {
    const { usuario, contrasena } = req.body;

    // Comprueba que se hayan enviado las credenciales.
    if (!usuario || !contrasena) {
        return res.status(400).json({
            mensaje: 'Debe ingresar un usuario y una contraseña.'
        });
    }

    // Busca un usuario con las credenciales recibidas.
    const usuarioValido = usuarios.find(
        (item) =>
            item.usuario === usuario &&
            item.contrasena === contrasena
    );

    // Devuelve el resultado de la autenticación.
    if (usuarioValido) {
        return res.status(200).json({
            mensaje: 'Autenticación satisfactoria.'
        });
    }

    return res.status(401).json({
        mensaje: 'Error en la autenticación.'
    });
});

// Inicia el servidor web.
app.listen(PORT, () => {
    console.log(`Servicio web disponible en http://localhost:${PORT}`);
});

const UserController = require("../controllers/usuarios.controller");
const express = require("express");
const passport = require('passport');
const rutasProtegidasJWT = require("../middlewares/jwt.mw");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Endpoints para la administración de usuarios
 */



/* Administracion */
/**
 * @swagger
 * /api/v2/usuarios/getAllUser:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida con éxito
 *       401:
 *         description: No autorizado
 */
router.get("/getAllUser", /*rutasProtegidasJWT(['ADMIN']), */UserController.buscarTodosUsuarios);


/**
 * @swagger
 * /api/v2/usuarios/getUserDetailByID/{id}:
 *   get:
 *     summary: Obtener detalles de un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles del usuario obtenidos con éxito
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Usuario no encontrado
 */
router.get("/getUserDetailByID/:id", /*rutasProtegidasJWT(['ADMIN']),*/UserController.buscarPorId);


/**
 * @swagger
 * /api/v2/usuarios/saveUser:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del usuario
 *               apellido:
 *                 type: string
 *                 description: Apellido del usuario
 *               username:
 *                 type: string
 *                 description: Nombre de usuario único
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *               telefono:
 *                 type: integer
 *                 description: Número de teléfono del usuario
 *               rol:
 *                 type: string
 *                 description: Rol del usuario (por ejemplo, 'ADMIN', 'USER', etc.)
 *     responses:
 *       200:
 *         description: Usuario creado con éxito
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno del servidor
 */
router.post("/saveUser", /*rutasProtegidasJWT(['ADMIN']),*/UserController.crearUsuario);


/**
 * @swagger
 * /api/v2/usuarios/editUser/{id}:
 *   put:
 *     summary: Actualizar información de un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del usuario
 *               apellido:
 *                 type: string
 *                 description: Apellido del usuario
 *               username:
 *                 type: string
 *                 description: Nombre de usuario único
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *               telefono:
 *                 type: integer
 *                 description: Número de teléfono del usuario
 *               rol:
 *                 type: string
 *                 description: Rol del usuario (por ejemplo, 'ADMIN', 'USER', etc.)
 *     responses:
 *       200:
 *         description: Usuario actualizado con éxito
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */ 
router.put("/editUser/:id", /*rutasProtegidasJWT(['ADMIN']),*/UserController.actualizarUsuario);


/**
 * @swagger
 * /api/v2/usuarios/deleteUserByID/{id}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado con éxito
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno del servidor
 */ 
router.delete("/deleteUserByID/:id", /*rutasProtegidasJWT(['ADMIN']),*/UserController.eliminarUsuario);




/*---------- Tradicional ----------*/
//Crear/Registrar usuario
router.post('/register', UserController.register);


//Autenticar
router.post("/login",UserController.login)

// Logout
router.post("/logout", UserController.logout);




/*---------- GOOGLE ----------*/
// Ruta para iniciar sesión con Google
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

// Ruta de callback para manejar la respuesta de Google
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    //console.log('User logged from Google:', req.user); // Muestra información del usuario
    req.session.userLogued = req.user;  // Asegúrate de que esto se está asignando correctamente
    res.redirect('/usuarios/personal-area');
});




/*---------- GITHUB ----------*/
// Ruta para iniciar sesión con GitHub
router.get('/auth/github',
  passport.authenticate('github'));

// Ruta de callback para manejar la respuesta de GitHub
router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Inicio de sesión exitoso, redirige a la zona personal.
    req.session.userLogued = req.user;
    res.redirect('/usuarios/personal-area');
});

module.exports = router
const UserController = require("../controllers/usuarios.controller");
const express = require("express");
const passport = require('passport');
const rutasProtegidasJWT = require("../middlewares/jwt.mw");
const router = express.Router();

/* Administracion */
router.get("/getAllUser", /*rutasProtegidasJWT(['ADMIN']), */UserController.buscarTodosUsuarios);
router.get("/getUserDetailByID/:id", /*rutasProtegidasJWT(['ADMIN']),*/UserController.buscarPorId);
router.post("/saveUser", /*rutasProtegidasJWT(['ADMIN']),*/UserController.crearUsuario);
router.put("/editUser/:id", /*rutasProtegidasJWT(['ADMIN']),*/UserController.actualizarUsuario);
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
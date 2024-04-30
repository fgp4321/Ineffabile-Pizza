const UserController = require("../controllers/usuarios.controller");
const express = require("express");
const passport = require('passport');
const rutasProtegidasJWT = require("../middlewares/jwt.mw");
const router = express.Router();

router.get("/getAllUser", UserController.buscarTodosUsuarios);
router.get("/getUserDetailByID/:id", UserController.buscarPorId);
router.post("/saveUser", UserController.crearUsuario);
router.put("/editUser/:id", UserController.actualizarUsuario);
router.delete("/deleteUserByID/:id", UserController.eliminarUsuario);


//Crear/Registrar usuario
router.post('/register', UserController.register);


//Autenticar
router.post("/login",UserController.login)

// Logout
router.post("/logout", UserController.logout);

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

module.exports = router
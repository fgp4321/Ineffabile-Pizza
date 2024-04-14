const UserController = require("../controllers/usuarios.controller");
const express = require("express");
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

/*
//Cargar la vista de registro
router.get("/register", UserController.showRegister)

//Crear/Registrar usuario
router.post("/register", UserController.register)

//Cargar la vista de login
router.get("/login", UserController.showLogin)

//Autenticar


router.get("/guess-list",UserController.showListGuess)

router.get("/jwt",rutasProtegidasJWT, UserController.showList)
router.get("/logout",UserController.logout)


router.get("/edit-users/:id",UserController.showEdit)
router.patch("/edit-users/:id",UserController.actualizarUser)
router.delete("/:id",UserController.eliminarUser)

router.get('*', (req, res) => {
    res.render("pageNotFound.ejs")
})
*/

module.exports = router
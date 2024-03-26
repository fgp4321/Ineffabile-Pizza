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
router.post("/usuarios/login",UserController.login)

//Log Out
router.get("/logout",UserController.logout)

/*
router.get("/guess-list",UserController.showListGuess)

router.get("/jwt",rutasProtegidasJWT, UserController.showList)



router.get("/edit-users/:id",UserController.showEdit)
router.patch("/edit-users/:id",UserController.actualizarUser)
router.delete("/:id",UserController.eliminarUser)

router.get('*', (req, res) => {
    res.render("pageNotFound.ejs")
})
*/
module.exports = router
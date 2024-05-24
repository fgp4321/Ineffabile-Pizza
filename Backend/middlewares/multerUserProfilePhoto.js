// middleware/multer.js
const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento de Multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        let dir = 'public/images/utils/profiles';
        cb(null, dir);
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre del archivo único
    }
});

const upload = multer({ storage: storage });

module.exports = upload;

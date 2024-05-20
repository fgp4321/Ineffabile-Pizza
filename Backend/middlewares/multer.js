const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento de Multer con función para elegir el directorio de destino
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        let category = req.body.categoria_nombre.toLowerCase();
        let dir = `public/images/${category}`;

        // Validar categoría y asignar directorio
        if (!['pizzas', 'pastas', 'complementos', 'bebidas'].includes(category)) {
            category = 'otros';
            dir = `public/images/${category}`;
        }

        cb(null, dir);
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre del archivo único
    }
});

const upload = multer({ storage: storage });

module.exports = upload;

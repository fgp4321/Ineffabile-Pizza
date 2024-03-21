## Compilar Backend:
1. cd Backend
2. node index.js O nodemon
3. Acceder a localhost:9100

## Ejecutar seed de usuarios:
1. cd Backend/seeds
2. node usuarios.seed.js
3. node categorias.seed.js
4. node pedidos.seed.js
5. node productos.seed.js
6. node estado-pedido.seed.js

## Compilar Frontend:
1. cd Frontend/adminCRUD
2. npm i -force (Forzar instalación de dependencias ya que algunas están muy anticuadas)
3. npx ng serve
4. Acceder a http://localhost:4200

## Páginas realizadas y visibles con CSR (Angular13):

- Home (Listado de usuarios) ->  http://localhost:4200/Home
- ViewUser (Detalles de usuario) ->  http://localhost:4200/ViewUser/{user_id}
- AddUser (Añadir usuario) ->  http://localhost:4200/AddUser
- EditUser (Editar usuario) ->  http://localhost:4200/EditUser/{user_id}
- (Eliminar usuario) No tiene ruta específica. Icono de papelera roja


## Páginas realizadas y visibles con SSR (EJS Views):
Partials: navbar y footer. (Estarán en casi todas las páginas)

Home -> http://localhost:9100/
- Se verá un banner de promociones u ofertas destacadas de nuestros productos
- Posible vídeo
- Filas de nuestros productos donde vayan moviendose tipo SlideBar

Productos -> http://localhost:9100/productos (* Sujeto a cambios)
- Te preguntará que que desea consumir y se podrá consultar la carta en PDF

Pizzas -> http://localhost:9100/productos/pizzas (* Sujeto a cambios)
- Así es como se verían los productos. El icono del ojo mostraría una ventana
Pop-Up con todos los detalles del producto. El icono del carrito lo añadiria al pedido.

Login y registro -> http://localhost:9100/usuarios/login-register
- El usuario accederá a su zona privada a través de este login o se creará una cuenta a través del register. La idea es agregar OAuth2 y Login con GitHub

Contacto -> http://localhost:9100/contacto
- Formulario de contacto que enviará un simulacro de mensaje al administrador. También tiene insertado un mapa. (* Probar que "funciona")

Valoraciones -> http://localhost:9100/valoraciones (* Sujeto a cambios)
- Formulario de valoraciones donde se pedirá un rating al usuario. La idea es añadir las tipicas 5 estrellas en vez de una barra de checkpoints pero de momento no ha sido posible. Simulacro (* Probar que "funciona")

Condiciones Generales -> http://localhost:9100/condiciones-generales
- Condiciones generales donde el usuario está relativamente obligado a leerlas antes de realizar cualquier pedido. Información estática.

Newsletter (Footer)
- Simulacro de mensaje de newsletter al introducir correo electrónico. (* Probar que "funciona")



# ---------- TODO Pages ----------
Carrito, política de privacidad, aviso legal, tabla de alérgenos (pdf), páginas de cada producto, gastos de envío, como comprar, redes sociales y pasarela de pago ficticio.

# ---------- TODO Funcionalidad ----------
Login, register, logout, area personal, sistema de carrito
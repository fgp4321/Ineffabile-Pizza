# Ineffabile Pizza

## Descripción
Este repositorio contiene el código fuente de Ineffabile Pizza, una aplicación web desarrollada con Angular en el frontend y Node.js & Express en el backend.

## Requisitos
Asegúrate de tener instaladas las siguientes herramientas antes de comenzar:
- Node.js v14.15.5 & v21.6.0 OR NVM.
- Docker & Docker-compose.
- Insomnia u otra aplicación para solicitudes API.
- Angular CLI v13.2.
- Nodemon (Opcional para compilación).

## Elasticsearch

1. Creación de índices y mapeo

# ------------------

## Configuración del Frontend

1. Abre una terminal en Frontend/adminCRUD e instala las dependencias.
- npm i -force

2. Una vez que hayas configurado el frontend, puedes ejecutar la aplicación con el siguiente comando:
- npx ng serve

Esto iniciará el servidor de desarrollo frontend y podrás acceder a la aplicación desde http://localhost:4200/ en tu navegador.

# ------------------

## Configuración del Backend
1. Abre una terminal en Backend/ e instala las dependencias.
- npm i

2. Crear bases de datos:
- cd Backend/seeds
- node usuarios.seed.js
- node categorias.seed.js
- node pedidos.seed.js
- node productos.seed.js
- node estado-pedido.seed.js

3. Ejecución Backend:
Con nodemon (recomendado para desarrollo):
- nodemon index.js

Con Node.js:
- node index.js

# ------------------

Esto iniciará el servidor de desarrollo backend y podrás acceder a la aplicación desde http://localhost:9100/ en tu navegador.
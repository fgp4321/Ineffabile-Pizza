GESTOR-PIZZERIA

Descripción: 
Este repositorio contiene el código fuente de GESTOR-PIZZERIA, una aplicación web desarrollada con Angular en el frontend y Node.js & Express en el backend.

Requisitos: 
Asegúrate de tener instaladas las siguientes herramientas antes de comenzar:

- Node.js v14.15
- Angular CLI v13.2

Configuración del Frontend: 
- Abre una terminal en la carpeta del frontend.

Ejecuta el siguiente comando para instalar las dependencias:
- npm i

Compila la aplicación Angular con Node.js v14.15 utilizando el siguiente comando:
- npx ng build



Ejecución del Frontend: 

Una vez que hayas configurado el frontend, puedes ejecutar la aplicación con el siguiente comando:
- npx ng serve

Esto iniciará el servidor de desarrollo y podrás acceder a la aplicación desde http://localhost:4200/ en tu navegador.

Configuración del Backend: 
- Abre una terminal en la carpeta del backend.

Ejecuta el siguiente comando para instalar las dependencias:
- npm i

Ejecuta el siguiente comando para crear los datos en la base de datos:
- cd Backend/seeds
- node usuarios.seed.js


Para ejecutar el backend, utiliza alguno de los siguientes comandos:
Con nodemon (recomendado para desarrollo):
- nodemon index.js

Con Node.js:
- node index.js

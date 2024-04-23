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

1. Para empezar a crear documentos e índices en elasticsearch se tendrán que seguir los siguientes pasos:

- Levantar servicio: 
Antes de crear el índice, levantaremos el servicio de elasticsearch con Docker. Para ello nos situaremos en el directorio elasticsearch-site/ y ejecutaremos: docker-compose up
Este comando levantará elasticsearch y estará disponible para realizar búsquedas. Si hay algún problema de memoria, mirar "Memoria Docker y Elasticsearch.pdf, Página 5"

- Creación de índice: 
Para crear el índice, se copiará todo el contenido de mapping.txt en el JSON del body y como URL se indicará "http://localhost:9200/productos" en método PUT. Insomnia permite copiar cURLs para agilizar el proceso: 
```bash
curl --request PUT \
  --url http://localhost:9200/productos \
  --header 'User-Agent: insomnia/8.6.1' \
  --cookie connect.sid=s%253A3Jq5y6d3pTUfpt15QeS7AbOjQKNFQSuI.NRDvdU0bVBTncYwOSiWGwimryapHY0OmjsI01FAXmnA
```

- En caso de haber creado el índice sin el mapeo, podemos eliminar el índice con:
```bash
curl --request DELETE \
  --url http://localhost:9200/productos \
  --header 'User-Agent: insomnia/8.6.1' \
  --cookie connect.sid=s%253A3Jq5y6d3pTUfpt15QeS7AbOjQKNFQSuI
  NRDvdU0bVBTncYwOSiWGwimryapHY0OmjsI01FAXmnA
```

- Ejecución de script: 
Una vez creado el índice, ejecutaremos el script situado en Elasticsearch/ para crear todos los documentos.

Para comprobar que todo ha ido correctamente, visitaremos http://localhost:9200/productos/_search o haremos una petición GET a esta URL y se deberían de ver todos los productos indexados en JSON.

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
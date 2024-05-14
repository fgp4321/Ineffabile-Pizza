# Ineffabile Pizza

## Descripción
Este repositorio contiene el código fuente de Ineffabile Pizza, una aplicación web desarrollada con Angular en el frontend y Node.js & Express en el backend.

## Requisitos
Asegúrate de tener instaladas las siguientes herramientas antes de comenzar:
- Node.js v14.15.5 & v21.6.0 (Recomendado utilizar NVM para gestionar las versiones de NodeJS).
- Docker & Docker-compose.
- Insomnia u otra aplicación para solicitudes API.
- Angular CLI v13.2
- Nodemon (Opcional para compilación).

## Elasticsearch
*Es preferible seguir la guía "Guia-Docker-Elasticsearch.pdf" situada en Elasticsearch/ para realizar todos los pasos.

1. Para empezar a crear documentos e índices en elasticsearch se tendrán que seguir los siguientes pasos:

- Levantar servicio: 
Antes de crear el índice, levantaremos el servicio de elasticsearch con Docker. Para ello nos situaremos en el directorio elasticsearch-site/ y ejecutaremos: docker-compose up
Este comando levantará elasticsearch y estará disponible para realizar búsquedas. Si hay algún problema puede seguir la guía "Guia-Docker-Elasticsearch.pdf"

- Creación de índice: 
Para crear el índice, abriremos nuestra aplicacion para solicitudes API y se copiará todo el contenido de mapping.txt en el JSON del body de la petición y como URL se indicará "http://localhost:9200/productos" en método PUT. Insomnia permite copiar cURLs para agilizar el proceso. También puede copiar directamente el código cURL aqui abajo:
```bash
curl --request PUT \
  --url http://localhost:9200/productos \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/8.6.1' \
  --cookie connect.sid=s%253A6wacH8qx2gVMWcfWV2n8hsUlYPZYDFX6.sqi9fTjQcHWR%252Ff3G7QTfX2PvCjVRtgpvotGLSfC7E%252Bk \
  --data '{
  "settings": {
    "analysis": {
      "analyzer": {
        "custom_lowercase_analyzer": {
          "tokenizer": "standard",
          "filter": ["lowercase", "asciifolding"]
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "nombre": {
        "type": "text",
        "analyzer": "custom_lowercase_analyzer"
      },
      "categoria_nombre": {
        "type": "text",
        "analyzer": "custom_lowercase_analyzer"
      },
      "descripcion": {
        "type": "text",
        "index": false
      },
      "precio_pvp": {
        "type": "float",
        "index": false 
      },
      "imagen1": {
        "type": "keyword",
        "index": false
      },
      "imagen2": {
        "type": "keyword",
        "index": false
      },
      "imagen3": {
        "type": "keyword",
        "index": false
      }
    }
  }
}
'
```

- En caso de haber creado el índice sin el mapeo, podemos eliminar el índice copiando el siguiente codigo cURL:
```bash
curl --request DELETE \
  --url http://localhost:9200/productos \
  --header 'User-Agent: insomnia/8.6.1' \
  --cookie connect.sid=s%253A3Jq5y6d3pTUfpt15QeS7AbOjQKNFQSuI
  NRDvdU0bVBTncYwOSiWGwimryapHY0OmjsI01FAXmnA
```

- Ejecución de script: 
Una vez creado el índice, ejecutaremos el script situado en Elasticsearch/ para indexar todos los documentos en el índice previamente creado.

Para comprobar que todo ha ido correctamente, visitaremos http://localhost:9200/productos/_search o haremos una petición GET a esta URL y se deberían de ver todos los productos indexados en JSON.


## Configuración del Frontend

1. Abre una terminal en Frontend/adminCRUD e instala las dependencias.
- npm i -force

2. Una vez que hayas configurado el frontend, puedes ejecutar la aplicación con el siguiente comando:
- npx ng serve

Esto iniciará el servidor de desarrollo frontend y podrás acceder a la aplicación desde http://localhost:4200/ en tu navegador.


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


Esto iniciará el servidor de desarrollo backend y podrás acceder a la aplicación desde http://localhost:9100/ en tu navegador.
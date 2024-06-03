# Ineffabile Pizza

## Descripción
Este repositorio contiene el código fuente de Ineffabile Pizza, una aplicación web desarrollada con Angular en el frontend y Node.js & Express en el backend.

Destacamos que el backend de la aplicación está construido con Node.js y Express, mientras que la parte pública de la aplicación se ha desarrollado utilizando vistas EJS, HTML, CSS y JavaScript. El backoffice de la aplicación se ha implementado utilizando Angular. Además, hemos integrado Elasticsearch para mejorar las búsquedas de productos en la web.

## Demo
![Home](https://i.imgur.com/rV2JYTc.png)
![Pizzas](https://i.imgur.com/7ymOPwX.png)
![Carrito](https://i.imgur.com/RuGXDG7.png)
![Backoffice](https://i.imgur.com/XiayJ8t.png)

## Requisitos
Antes de comenzar, asegúrate de tener instaladas las siguientes herramientas:

- Node.js v14.15.5 o superior (Se recomienda el uso de NVM para gestionar las versiones de Node.js).
- Docker y Docker Compose para el entorno de desarrollo y despliegue.
- Insomnia u otra herramienta similar para realizar solicitudes a la API.
- Angular CLI v13.2 para el desarrollo del frontend.
- Nodemon (opcional) para facilitar el proceso de desarrollo y compilación en el backend.

## 1. Elasticsearch
*Es preferible seguir la guía "Guia-Docker-Elasticsearch.pdf" situada en Elasticsearch/ para realizar todos los pasos.

Para empezar a crear documentos e índices en elasticsearch se tendrán que seguir los siguientes pasos:

- Levantar servicio: 
Antes de crear el índice, levantaremos el servicio de elasticsearch con Docker. Para ello nos situaremos en el directorio elasticsearch-site/ y ejecutaremos: docker-compose up
Este comando levantará elasticsearch y estará disponible para realizar búsquedas. Si hay algún problema puede seguir la guía "Guia-Docker-Elasticsearch.pdf"

<details>
- <summary> Creación de índice: </summary>

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
</details>

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

Sistemas Linux
```bash
./script.sh
```

Sistemas Windows
```bash
script.bat
```

Para comprobar que todo ha ido correctamente, visitaremos http://localhost:9200/productos/_search o haremos una petición GET a esta URL y se deberían de ver todos los productos indexados en JSON.


## 2. Variables de Entorno
Estando situados en ./Backend, generaremos el archivo .env.example a .env y modificaremos el contenido del archivo para indicar nuestras credenciales.
```bash
cp .env.example .env
```


## 3. Configuración del Frontend

1. Abre una terminal en Frontend/adminCRUD e instala las dependencias.
```bash
npm i -force
```

2. Una vez que hayas configurado el frontend, puedes ejecutar la aplicación con el siguiente comando:
```bash
npx ng serve
```

Esto iniciará el servidor de desarrollo frontend y podrás acceder a la aplicación desde http://localhost:4200/ en tu navegador.


## 4. Configuración del Backend
1. Abre una terminal en Backend/ e instala las dependencias.
```bash
npm i
```

2. Accede a /seeds para poblar las bases de datos:

```bash
node usuarios.seed.js && node pedidos.seed.js && node productos.seed.js
```

3. Situado en ./Backend, ejecutar el servidor:

Con nodemon (recomendado para desarrollo):
```bash
nodemon index.js
```
Con Node.js:

```bash
node index.js
```

Esto iniciará el servidor de desarrollo backend y podrás acceder a la aplicación desde http://localhost:9100/ en tu navegador.

Si desea ver o probar las APIs funcionales de Ineffabile Pizza, podrá visitar la documentación desde http://localhost:9100/api-docs en tu navegador.
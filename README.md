# Ilumno React App

Este repositorio contiene la aplicación React de Ilumno.

## Prerrequisitos

- [Docker](https://www.docker.com/) instalado en tu máquina.

## Instrucciones para Ejecutar la Aplicación con Docker

1. **Clonar el repositorio:**

   ```sh
   git clone https://github.com/davidmenlop/ilumno-react.git
   cd ilumno-react
   
2. Crear un Dockerfile en la raíz del proyecto:

    Asegúrate de que el archivo Dockerfile tenga el siguiente contenido:
    ```sh
    # Utiliza una imagen base de Node
    FROM node:14-alpine
    
    # Establece el directorio de trabajo
    WORKDIR /app
    
    # Copia el archivo package.json y package-lock.json
    COPY package*.json ./
    
    # Instala las dependencias
    RUN npm install
    
    # Copia el resto del código de la aplicación
    COPY . .
    
    # Construye la aplicación para producción
    RUN npm run build
    
    # Instala una imagen de servidor web Nginx
    FROM nginx:alpine
    
    # Copia los archivos de compilación al directorio de Nginx
    COPY --from=0 /app/build /usr/share/nginx/html
    
    # Expone el puerto 80
    EXPOSE 80
    
    # Inicia el servidor Nginx
    CMD ["nginx", "-g", "daemon off;"]

3. Construir la imagen de Docker:
    ```sh
    docker build -t ilumno-react-app .
4. Ejecutar el contenedor de Docker:

    ```sh
    Copiar código
    docker run -p 3000:80 ilumno-react-app
5. Verificar que la aplicación esté corriendo:

    Abre tu navegador y visita http://localhost:3000.



Notas

- Para detener el contenedor de Docker, utiliza el comando docker stop <container_id>.
- Asegúrate de tener los permisos necesarios para ejecutar Docker en tu entorno.

Autor
David Menlop

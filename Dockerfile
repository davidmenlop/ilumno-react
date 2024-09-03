# Etapa de construcción
FROM node:18 AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todo el código fuente al contenedor
COPY . .

# Compila la aplicación Angular en modo de producción
RUN npm run build --prod

# Etapa de producción
FROM nginx:stable-alpine

# Copia los archivos compilados de la etapa de construcción a la carpeta de Nginx
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

# Expone el puerto 3000 para el tráfico HTTP
EXPOSE 3000

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
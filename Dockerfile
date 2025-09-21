# Usa una imagen oficial de Node.js
FROM node:18

# Define el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del proyecto
COPY . .

# Expone el puerto 3001
EXPOSE 3001

# Comando de inicio
CMD ["node", "index.js"]

FootTech - Instrucciones mínimas

Requisitos
- Node.js y npm instalados.

Instalación
- Desde la raíz del proyecto instala dependencias:

  npm install

- Para arrancar la aplicación:

  npm start

- Si quieres arrancar sólo el backend:

  cd foottech-backend
  npm install
  npm start

Base de datos
- Archivo SQL: foottech_db.sql (en la raíz del proyecto).
- Importar la base de datos (reemplaza `<DB_USER>` y `<DB_NAME>`):

  mysql -u <DB_USER> -p <DB_NAME> < foottech_db.sql

Inicio de sesión (admin)
- Usa las credenciales de administrador:

  Usuario: urkoarroyorivas@gmail.com

  Contraseña: prueba2

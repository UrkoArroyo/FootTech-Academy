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
- Usa las credenciales que figuren en la base de datos. Reemplaza los valores por los reales:

  Usuario: <ADMIN_USER>
  
  Contraseña: <ADMIN_PASSWORD>

- Ejemplo (si quieres un ejemplo de prueba, cámbialo por las credenciales del SQL):

  Usuario: admin@ejemplo.com
  Contraseña: admin123

Notas
- Sustituye los placeholders por los datos reales antes de usar.

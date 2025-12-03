Tp final de Nicanor Gatti para la materia de programacion 3

El sistema consiste en una web de venta de dados y miniaturas, escencialmente, articulos de tabletop rpgs.

Prerequisitos:
  crear una base de datos en MySQL
    CREATE DATABASE dadisimo

  en /backend crear un archivo .env con las siguientes variables de entorno:
  
    DB_HOST=localhost
    DB_NAME=dadisimo
    DB_USER=*tuusuario*
    DB_PASSWORD=*tucontraseña*
    
    DB_DIALECT=mysql
    DB_PORT=3306
    
    PORT = 3000

  desde el commandpromt (NO POWERSHELL) ejecutar:
  
      cd backend
      
      npm install
      
      node test_data.js (llenar la base de datos con elementos de prueba)
      
      npm start (para levantar el servidor en el puerto)

Hecho esto, el sistema ya puede ser probado:
  
  clientes: con vscode live server frontend/bienvenida/index.html 
  
  admin: http://localhost:3000/api/admin/login

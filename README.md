## Configuración de PostgreSQL para Desarrollo Local

Para ejecutar este proyecto, instala y configura PostgreSQL en tu máquina local.


### Crear Base de Datos y Usuario
Accede a PostgreSQL:
```sh
psql -U postgres
```
Ejecuta:
```sql
CREATE DATABASE "OrdenSuprema";
CREATE USER postgres WITH PASSWORD 'postgres123';
GRANT ALL PRIVILEGES ON DATABASE "OrdenSuprema" TO postgres;
```

También puedes entrar a `backend/database/sequelize.js` y modificar los parametros para usar otra base de datos

### Para correr el proyecto:
Se requiere ejecutan los siguientes comandos en la terminal

Correr el Front:
```sh
cd OrdenSuprema
npm install --legacy-peer-deps
npm run dev
```
Correr el  Back:
```sh
cd OrdenSuprema
npm run back
```






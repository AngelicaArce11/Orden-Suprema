# Orden Suprema 
La Orden Suprema es un proyecto de desarrollo web, ambientado en la saga de películas de John Wick. Este proyecto permite la gestión de órdenes y asesinos dentro del sistema de "Orden Suprema". A continuación, encontrarás instrucciones para crear una orden y las credenciales de administrador.

## Contextualización
- **Deudas:** Compromisos entre asesinos registrados en el sistema, generalmente relacionados con favores pendientes, como la realización de un asesinato. Cada deuda tiene un deudor (quien debe realizar el favor) y un acreedor (quien solicita el favor). Las deudas incluyen detalles como la descripción del favor y su estado (completada o sin completar).
- **Misiones:** Tareas que involucran la ejecución de un objetivo, como el asesinato de una persona. Las misiones tienen un nombre de objetivo, una descripción, un pago ofrecido en monedas de asesinos, y un estado que evoluciona (sin asignar, en progreso, en revisión, completada o fracasada).
- **Moneda de Asesinos:** Unidad virtual utilizada dentro del sistema para pagar por servicios o acceder a funcionalidades premium. Un millón de pesos en dinero real equivale a una moneda de asesinos. Estas monedas son esenciales para publicar misiones, entre otros.
- **Evidencia:** Imagen que los asesinos deben cargar como prueba para validar la ejecución de una misión o el cumplimiento de una deuda. Es revisada por la Orden Suprema o el acreedor de una deuda para confirmar el cumplimiento de esta.
- **Historial:** Registro detallado de las misiones asignadas a un asesino, incluyendo información sobre los objetivos, descripción, estado y pago asociado. También incluye información básica del asesino, como nombre, ID e imagen.

## Funcionalidades
- **Gestión de usuarios:** Creación y administración de usuarios con roles de "order" y "assassin".
- **Asignación de misiones:** Creación de misiones con un objetivo, descripción y recompensa.
- **Gestión de deudas:** Registro de deudas entre usuarios con descripción y valores específicos.
- **Autenticación de usuarios:** Inicio de sesión con email y contraseña.

## Requisitos
- Node.js instalado

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
cd backend
npm run back
```

## Inicio de Sesión como Administrador
Para acceder con privilegios de administrador, puedes usar las siguientes credenciales:
- **Correo:** `chanci@gmail.com`
- **Contraseña:** `securepassword123`

Dentro de la aplicación podrás registrar usuarios Asesinos, y al correo de estos se le enviará las credenciales de acceso

## Imágenes de muestra de algunas funcionalidades 
![image](https://github.com/user-attachments/assets/ce72aeca-8dc3-4c95-af0b-c198ed681e5f)

![image](https://github.com/user-attachments/assets/bd8a0e11-a592-4d0d-884b-a637befcd1b8)

![image](https://github.com/user-attachments/assets/30d15123-1f75-4e30-97be-728514fb7199)






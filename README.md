#  TalkCar - Tu Garaje Virtual

TalkCar es una aplicación web premium diseñada para entusiastas de los coches. Permite a los usuarios buscar vehículos por matrícula, conocer sus detalles y guardarlos en una colección personal (garaje virtual).

##  Características Principales

- **Búsqueda por Matrícula**: Encuentra información técnica y detalles de cualquier coche.
- **Garaje Virtual**: Guarda tus coches favoritos y gestiona tu colección.
- **Autenticación Segura**: Registro e inicio de sesión integrados con NextAuth.
- **Diseño Premium**: Interfaz moderna con estética "Midnight Chrome" y efectos de cristal.

## Tecnologías Utilizadas

Este proyecto utiliza el [T3 Stack](https://create.t3.gg/):

- **Next.js**: Framework de React para el frontend y backend (App Router).
- **tRPC**: APIs seguras de extremo a extremo con TypeScript.
- **Prisma**: ORM para la gestión de la base de datos PostgreSQL.
- **NextAuth.js**: Autenticación de usuarios.
- **Postgres**: Base de datos relacional (alojada en Supabase).
- **Vanilla CSS / Tailwind**: Estilos personalizados de alta calidad.

##  Estructura del Proyecto

- `src/app`: Páginas y componentes de la aplicación.
- `src/server/api`: Definición de los endpoints de la API (tRPC).
- `src/server/auth`: Configuración de la autenticación.
- `src/server/db.ts`: Cliente de la base de datos.
- `prisma/`: Esquema de datos y migraciones.

##  Documentación para Desarrolladores

- [**Guía de Configuración (SETTING_UP.md)**](./SETTING_UP.md): Instrucciones para levantar el proyecto y desplegarlo en Vercel.
- [**Cómo Añadir Funciones (HOW_TO.txt)**](./HOW_TO.txt): Guía rápida para añadir nuevos endpoints, tablas en la base de datos o páginas.

---
© 2026 TalkCar - Todos los derechos reservados.

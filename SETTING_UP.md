# Guía de Configuración y Despliegue - TalkCar

Esta guía detalla los pasos necesarios para configurar el entorno de desarrollo local y desplegar la aplicación en la nube.

## 1. Requisitos Previos

Para trabajar en este proyecto, necesitas tener instalado lo siguiente:

### Local (Desarrollo)
- **Node.js**: Versión 18 o superior (recomendado la última LTS).
- **npm**: Viene con Node.js.
- **Docker Desktop** o **Podman Desktop**: Necesario para ejecutar la base de datos PostgreSQL localmente.
- **WSL (Solo para Windows)**: Si usas Windows, se recomienda instalar el Subsistema de Windows para Linux para ejecutar scripts de bash como `start-database.sh`.

---

## 2. Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto (puedes copiar el `.env.example`). Estas son las variables críticas:

| Variable | Descripción | Ejemplo / Fuente |
| :--- | :--- | :--- |
| `DATABASE_URL` | URL de conexión a PostgreSQL. | `postgresql://postgres:password@localhost:5432/talk_car` |
| `AUTH_SECRET` | Secreto para NextAuth. | Generar con `npx auth secret` |
| `AUTH_DISCORD_ID` | Client ID de Discord OAuth. | [Discord Developer Portal](https://discord.com/developers/applications) |
| `AUTH_DISCORD_SECRET` | Client Secret de Discord OAuth. | [Discord Developer Portal](https://discord.com/developers/applications) |

---

## 3. Configuración Local Paso a Paso

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Levantar la base de datos**:
   Asegúrate de tener Docker/Podman abierto y ejecuta:
   ```bash
   ./start-database.sh
   ```
   *Nota: Si estás en Windows sin WSL, puedes usar una base de datos PostgreSQL local y actualizar el `DATABASE_URL`.*

3. **Sincronizar el esquema de Prisma**:
   ```bash
   npm run db:push
   ```

4. **Ejecutar en modo desarrollo**:
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

---

## 4. Despliegue en la Nube

### Hosting Recomendado
- **Frontend / API**: [Vercel](https://vercel.com) (recomendado para Next.js).
- **Base de Datos**: [Supabase](https://supabase.com) o [Neon](https://neon.tech) (PostgreSQL serverless).

### Pasos para Desplegar (Vercel)
1. Conecta tu repositorio de GitHub a Vercel.
2. Configura las **Environment Variables** en el panel de Vercel (copia los valores de tu `.env`).
3. El comando de compilación (`Build Command`) debe ser `next build`.
4. El comando de instalación (`Install Command`) debe ser `npm install`.
5. Vercel ejecutará automáticamente `prisma generate` gracias al script `postinstall` en `package.json`.

---

## 5. Comandos Útiles
- `npm run db:studio`: Abre una interfaz visual para ver los datos de tu base de datos.
- `npm run build`: Genera la versión de producción optimizada.
- `npm run check`: Ejecuta el linter y el chequeo de tipos de TypeScript.

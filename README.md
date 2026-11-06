# WillBook - Frontend Web

Este es el cliente web para el sistema de gestión de bibliotecas **WillBook**. Se trata de una Single Page Application (SPA) construida en **Angular** que interactúa con la API RESTful de WillBook. El sistema provee interfaces dinámicas basadas en los roles de los usuarios (Lector, Bibliotecario o Administrador).

## 🛠️ Requisitos Previos

Para ejecutar este proyecto, necesitarás tener instalado:
* **Node.js** (Versión 18 o superior recomendada)
* **NPM** o **Yarn**
* **Angular CLI** (`npm install -g @angular/cli`)

## 🚀 Cómo ejecutar el proyecto

1. Clona el repositorio del frontend.
2. Abre una terminal en el directorio raíz del proyecto.
3. Instala las dependencias del proyecto ejecutando:
   ```bash
   npm install
   ```
4. Inicia el servidor de desarrollo:
   ```bash
   ng serve
   # o alternativamente
   npm start
   ```
5. Abre tu navegador web e ingresa a `http://localhost:4200`.

*Nota: Asegúrate de que el backend de WillBook esté corriendo simultáneamente (típicamente en `http://localhost:8080`) para que la aplicación web pueda realizar peticiones a la API.*

---

## 🎯 Acceso y Funcionalidades por Rol

La plataforma adapta su interfaz y funcionalidades dependiendo de si eres un usuario normal (Lector) o si eres parte del equipo de administración de la biblioteca.

### 📖 Para Usuarios Lectores
Los usuarios que se registran en la plataforma tienen el rol de `LECTOR`. Tienen acceso a:

* **Catálogo Público:** Pueden explorar, buscar y filtrar libros por título o autor.
* **Solicitud de Préstamos:** Pueden reservar libros desde el catálogo. El sistema valida automáticamente que haya stock disponible y que el usuario no tenga multas pendientes.
* **Mis Préstamos:** Un panel personal para ver el historial de los libros solicitados, vigentes, vencidos o devueltos. También permite reportar la pérdida o daño de un libro en curso.
* **Mis Multas:** Una vista para revisar infracciones, consultar el estado de la cuenta (activa o suspendida) y ver motivos de las multas.
* **Mi Perfil:** Permite editar información de contacto y cambiar la contraseña de acceso.
* **Notificaciones:** Bandeja y campanita de alertas del sistema.

### 🏛️ Para Bibliotecarios y Administradores
Los miembros del staff ingresan con credenciales de `BIBLIOTECARIO` o `ADMIN`. Su interfaz incluye herramientas de gestión integral:

* **Dashboard (Panel de Control):** Vista general con métricas rápidas.
* **Gestión de Libros (Catálogo Administrativo):** Permite crear, editar y consultar libros. Además, desde aquí gestionan el inventario agregando ejemplares físicos, registrando nuevos Autores y creando Categorías/Géneros.
* **Retiros Pendientes:** Pantalla crítica donde el bibliotecario aprueba la entrega física de un libro reservado (cambiando su estado a "Prestado") o cancela reservas caducadas.
* **Gestión de Multas:** Permite generar multas manuales a usuarios (ej. por romper un libro), registrar el pago/cobro en mostrador para rehabilitar cuentas, o anular multas generadas por error.
* **Buscador de Perfiles:** Permite buscar a un Lector (por DNI o Nombre) y acceder a su "Expediente", viendo en una sola pantalla todos sus préstamos activos, su historial completo y sus deudas.
* **Publicación de Anuncios:** Pueden redactar anuncios que verán todos los usuarios en la plataforma.

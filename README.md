# 🌐 Frontend - Angular

## 👩‍💻 Autora
**Natalia Baena Cabas**

---

## 📌 Descripción
Aplicación frontend en Angular que permite gestionar empleados y departamentos mediante una interfaz gráfica conectada a una API REST.

---

## 🛠️ Tecnologías utilizadas
- Angular
- TypeScript
- HTML
- CSS
- HttpClient

---

## 📁 Estructura del proyecto
frontend/
│── src/
│   ├── app/
│   │   ├── components/
│   │   ├── services/
│   │   └── app.component.ts
│── angular.json
│── package.json

---

## ⚙️ Instalación

1. Clonar repositorio:
git clone <URL_DEL_REPOSITORIO>
cd frontend

2. Instalar dependencias:
npm install

3. Ejecutar aplicación:
ng serve

4. Abrir en navegador:
http://localhost:4200

---

## 🧩 Funcionalidades

### Empleados
- Crear
- Editar
- Eliminar
- Listar

### Departamentos
- Crear
- Editar
- Eliminar
- Listar

### Vista combinada
- Ver departamentos
- Ver empleados por departamento

---

## 🔌 Conexión con Backend

Configurar en los servicios:
private apiUrl = 'http://localhost:3000/api';

---

## 🧪 Ejemplo

getEmpleados() {
  return this.http.get(`${this.apiUrl}/empleados`);
}

---

## 🎨 Interfaz
- Formularios para empleados y departamentos
- Listados dinámicos
- Vista agrupada

---

## 🚀 Notas
- Backend debe estar corriendo
- Verificar CORS
- Se puede mejorar con Bootstrap o Angular Material
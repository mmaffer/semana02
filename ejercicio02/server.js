const http = require("http");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");

const PORT = 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    // Ruta del archivo HBS
    const filePath = path.join(__dirname, "views", "home.hbs");

    // Leer el archivo de plantilla
    fs.readFile(filePath, "utf8", (err, templateData) => {
      if (err) {
        res.statusCode = 500;
        res.end("Error interno del servidor");
        return;
      }

      // Compilar la plantilla con Handlebars
      const template = handlebars.compile(templateData);

      // Datos dinámicos a enviar
      const data = {
        title: "Servidor con Handlebars 🚀",
        welcomeMessage: "Bienvenido al laboratorio de Node.js",
        day: new Date().toLocaleDateString("es-PE"),
        students: ["Ana", "Luis", "Pedro", "María"],
      };

      // Renderizar la vista con los datos
      const html = template(data);

      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.end(html);
    });
  } else if (req.url === "/about") {
    // Definir ruta del archivo about.hbs
    const rutaArchivo = path.join(__dirname, "views", "about.hbs");

    // Leer el archivo de la vista
    fs.readFile(rutaArchivo, "utf8", (error, contenido) => {
      if (error) {
        res.statusCode = 500;
        res.end("Error al cargar la página");
        return;
      }

      // Compilar con Handlebars
      const plantilla = handlebars.compile(contenido);

      // Datos de la clase
      const datos = {
        title: "Acerca de la clase ",
        courseName: "Desarrollo Web Avanzado",
        teacherName: "Profesor Juan Pérez",
        currentDate: new Date().toLocaleDateString("es-PE"),
      };

      // Enviar respuesta
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.end(plantilla(datos));
    });
  } else if (req.url === "/students") {
    // Definir ruta del archivo students.hbs
    const rutaArchivo = path.join(__dirname, "views", "students.hbs");

    // Leer el archivo de la vista
    fs.readFile(rutaArchivo, "utf8", (error, contenido) => {
      if (error) {
        res.statusCode = 500;
        res.end("Error al cargar los estudiantes");
        return;
      }

      // Compilar con Handlebars
      const plantilla = handlebars.compile(contenido);

      // Lista de estudiantes con sus notas
      const listaEstudiantes = [
        { nombre: "Ana", nota: 18, esAlta: true },
        { nombre: "Luis", nota: 14, esAlta: false },
        { nombre: "Pedro", nota: 16, esAlta: true },
        { nombre: "María", nota: 12, esAlta: false },
      ];

      // Enviar respuesta con la lista
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.end(plantilla({ title: "Lista de Alumnos ", students: listaEstudiantes }));
    });
  } else {
    res.statusCode = 404;
    res.end("<h1>404 - Página no encontrada</h1>");
  }
});

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
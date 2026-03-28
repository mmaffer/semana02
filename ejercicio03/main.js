const http = require("http");
const repo = require("./repository/studentsRepository");

const PORT = 4000;

const server = http.createServer((req, res) => {
  // Configuración de cabecera para todas las respuestas
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  const { method, url } = req;

  // --- RUTA: GET /students (Listar todos) ---
  if (url === "/students" && method === "GET") {
    res.statusCode = 200;
    res.end(JSON.stringify(repo.getAll()));
  } 

  // --- RUTA: GET /students/:id (Obtener uno) ---
  else if (url.startsWith("/students/") && method === "GET") {
    const id = parseInt(url.split("/")[2]);
    const student = repo.getById(id);

    if (student) {
      res.statusCode = 200;
      res.end(JSON.stringify(student));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "Estudiante no encontrado" }));
    }
  }

  // --- RUTA: POST /students (Crear) ---
  else if (url === "/students" && method === "POST") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        if (!body) throw new Error("Cuerpo vacío");
        const studentData = JSON.parse(body);

        // Validación de campos obligatorios
        if (!studentData.name || !studentData.email || !studentData.course || !studentData.phone) {
          res.statusCode = 400;
          return res.end(JSON.stringify({ 
            error: "Faltan campos obligatorios: name, email, course y phone son requeridos" 
          }));
        }

        const newStudent = repo.create(studentData);
        res.statusCode = 201;
        res.end(JSON.stringify(newStudent));
      } catch (err) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: "JSON no válido o cuerpo vacío" }));
      }
    });
  }

  // --- RUTA: POST /ListByStatus (Listar por estado) ---
  else if (url === "/ListByStatus" && method === "POST") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        const { status } = JSON.parse(body || "{}");
        if (!status) {
          res.statusCode = 400;
          return res.end(JSON.stringify({ error: "Debe proporcionar un status" }));
        }
        res.statusCode = 200;
        res.end(JSON.stringify(repo.getByStatus(status)));
      } catch (err) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: "JSON no válido" }));
      }
    });
  }

  // --- RUTA: POST /ListByGrade (Listar por promedio/gpa) ---
  else if (url === "/ListByGrade" && method === "POST") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        const { gpa } = JSON.parse(body || "{}");
        if (gpa === undefined) {
          res.statusCode = 400;
          return res.end(JSON.stringify({ error: "Debe proporcionar un gpa/promedio" }));
        }
        res.statusCode = 200;
        res.end(JSON.stringify(repo.getByGrade(gpa)));
      } catch (err) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: "JSON no válido" }));
      }
    });
  }

  // --- RUTA: PUT /students/:id (Actualizar) ---
  else if (url.startsWith("/students/") && method === "PUT") {
    const id = parseInt(url.split("/")[2]);
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        if (!body) throw new Error("Cuerpo vacío");
        const updated = repo.update(id, JSON.parse(body));
        if (updated) {
          res.statusCode = 200;
          res.end(JSON.stringify(updated));
        } else {
          res.statusCode = 404;
          res.end(JSON.stringify({ error: "Estudiante no encontrado" }));
        }
      } catch (err) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: "JSON no válido o cuerpo vacío" }));
      }
    });
  }

  // --- RUTA: DELETE /students/:id (Eliminar) ---
  else if (url.startsWith("/students/") && method === "DELETE") {
    const id = parseInt(url.split("/")[2]);
    const deleted = repo.remove(id);

    if (deleted) {
      res.statusCode = 200;
      res.end(JSON.stringify(deleted));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "Estudiante no encontrado" }));
    }
  }

  // --- Manejo de rutas no encontradas ---
  else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Ruta no encontrada" }));
  }
});

// Iniciar el servidor una sola vez
server.listen(PORT, () => {
  console.log(`API corriendo en http://localhost:${PORT}`);
});
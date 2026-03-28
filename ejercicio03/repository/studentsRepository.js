let students = [
  {
    id: 1,
    name: "Juan Pérez",
    grade: 20,
    age: 23,
    email: "juan.perez@ejemplo.com",
    phone: "+51 987654321",
    enrollmentNumber: "2025001",
    course: "Diseño y Desarrollo de Software C24",
    year: 3,
    subjects: ["Algoritmos", "Bases de Datos", "Redes"],
    gpa: 3.8,
    status: "Activo",
    admissionDate: "2022-03-01"
  },
  {
    id: 2,
    name: "Ana García",
    grade: 18,
    age: 21,
    email: "ana.garcia@ejemplo.com",
    phone: "+51 912345678",
    course: "Ingeniería de Software",
    status: "Activo",
    gpa: 3.9
  }
];

function getAll() {
  return students;
}

function getById(id) {
  return students.find(s => s.id === id);
}

function getByStatus(status) {
  return students.filter(s => s.status === status);
}

function getByGrade(minGpa) {
  return students.filter(s => s.gpa >= minGpa);
}

function create(student) {
  student.id = students.length + 1;
  students.push(student);
  return student;
}

function update(id, updateData) {
  const index = students.findIndex(s => s.id === id);
  if (index !== -1) {
    students[index] = { ...students[index], ...updateData };
    return students[index];
  }
  return null;
}

function remove(id) {
  const index = students.findIndex(s => s.id === id);
  if (index !== -1) {
    return students.splice(index, 1)[0];
  }
  return null;
}

module.exports = { getAll, getById, getByStatus, getByGrade, create, update, remove };
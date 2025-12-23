const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyparser = require("body-parser");

const app = express();

//Middleware

app.use(cors());
app.use(bodyparser.json());

// Conexion a Base de datos

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "foottech_db",
});
db.connect((err) => {
  if (err) {
    console.error("Error de conexión a BD", err);
  } else {
    console.log("Conectando a MySQL correctamente");
  }
});

// Rutas de la API

//1.Login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM usuarios WHERE email = ? AND password = ? ";
  db.query(sql, [email, password], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length > 0) {
      res.json({ meesage: "Login correcto", usuario: results[0] });
    } else {
      res.status(401).json({ message: "Credenciales incorrectas" });
    }
  });
});

//2 Obtener todos los jugadores

app.get("/api/jugadores", (req, res) => {
  db.query("SELECT * FROM jugadores", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

//3 Crear un jugador nuevo
app.post("/api/usuarios", (req, res) => {
  const { nombre, email, password } = req.body;

  const sql = "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)";

  db.query(sql, [nombre, email, password], (err, result) => {
  if (err) {
    return res.status(500).json(err);
  }
  res.json({ message: "Usuario creado correctamente" });
})
})

//4 Obtener usuario

app.get("/api/usuarios", (req, res) => {
  const sql = "SELECT * FROM usuarios";
  db.query(sql, (err,results)=> {
    if(err){
      return res.status(500).json(err)
    }
    res.json(results)
  })


})

//5 Actualizar usuario

app.put("/api/usuarios/:id", (req, res) => {
  const { id } = req.params
  const { nombre,email} = req.body
  const sql = "UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?"
  db.query(sql, [nombre, email, id], (err) => {
    if(err){
      return res.status(500).json(err)
    }
    res.json({ message: "Usuario actualizado"})
  })
})

//6 Eliminar usuario

// db.query(sql, [req.params.id], (err) => {
//   if(err) {
//     return res.status(500).json(err)
//   }
//   res.json({ message: "Usuario eliminado"})
// })




// Arrancar servidor
app.listen(3000, () => {
    console.log('Servidor Backend corriendo en http://localhost:3000')
})
import { Router } from "express";
import jwt from "jsonwebtoken";
import { getConnection } from "../models/db.js";
import { mainPost, mainGet } from "../productos.js";

export const apiRouter = Router();

apiRouter.get("/", (req, res) => {
  res.json({ saludo: "hola esto esta funcionando" });
});
apiRouter.post("/login", (req, res) => {
  const secretKey = "miClaveSecreta123";
  const { username, password } = req.body;

  if (username === "developer" && password === "ucpass") {
    const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).json({ error: "Credenciales incorrectas" });
  }
});
apiRouter.get("/database", async (req, res) => {
  try {
    const connection = await getConnection();
    const result = await connection.query(
      "SELECT id, nombre, usuarios FROM lenguajes"
    );
    res(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
});
apiRouter.post("/database", async (req, res) => {
  try {
    const { nombre, usuarios } = req.body;

    if (typeof nombre !== "string" || typeof usuarios !== "number") {
      return res
        .status(400)
        .json({
          message:
            "Bad Request. 'nombre' must be a string and 'usuarios' must be a number.",
        });
    }

    if (!nombre || !usuarios) {
      return res
        .status(400)
        .json({
          message: "Bad Request. 'nombre' and 'usuarios' fields are required.",
        });
    }

    const language = { nombre, usuarios };
    const connection = await getConnection();
    await connection.query("INSERT INTO lenguajes SET ?", language);
    res.json({ message: "Language added" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

apiRouter.get("/productos/:categoria?/:precioMin?", (req, res) => {
  const categoria = req.params.categoria;
  const precioMin = parseFloat(req.params.precioMin);

  let productosFiltrados = mainGet().filter((producto) => producto.stock > 0);

  if (categoria) {
    productosFiltrados = productosFiltrados.filter(
      (producto) => producto.categoria === categoria
    );
  }

  if (!isNaN(precioMin)) {
    productosFiltrados = productosFiltrados.filter(
      (producto) => producto.precio >= precioMin
    );
  }

  res.json(productosFiltrados);
});
apiRouter.post("/productos", (req, res) => {
  const { producto, categoria, precio, stock } = req.body;
  res.json(mainPost(producto, categoria, precio, stock));
});

import fs from "fs";
import path from "path";

const mainPost = (producto, categoria, precio, stock) => {
  const archivo = ".data.json";
  let arr = [];

  const text = {
    producto,
    categoria,
    precio,
    stock,
  };

  try {
    const data = fs.readFileSync(archivo, { encoding: "utf-8" });

    if (!data) {
      arr.push(text);
    } else {
      const parse = JSON.parse(data);
      parse.push(text);
      arr = [...parse];
    }
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error("El archivo no existe.");
      console.error("El archivo se ha creado.");
      arr.push(text);
      fs.writeFileSync(archivo, JSON.stringify(arr));
    } else {
      console.error("Error al leer el archivo:", error);
    }
  }

  try {
    fs.writeFileSync(archivo, JSON.stringify(arr));
  } catch (err) {
    console.error(err);
  }

  const data1 = fs.readFileSync(archivo, { encoding: "utf-8" });
  const rr = JSON.parse(data1);

  return rr;
};
const mainGet = () => {
  const archivo = ".data.json";

  try {
    const data = fs.readFileSync(archivo, { encoding: "utf-8" });
    const parsedData = JSON.parse(data);
    return parsedData;
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error("El archivo no existe.");
      console.error("El archivo se ha creado.");
      fs.writeFileSync(archivo, "[]");
      return [];
    } else {
      console.error("Error al leer el archivo:", error);
      return [];
    }
  }
};
export { mainPost, mainGet };

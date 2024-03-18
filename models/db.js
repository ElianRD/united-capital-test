import config from "../config.js";
import mysql from "mysql";

const connection = mysql.createConnection({
  host: config.host,
  database: config.database,
  user: config.user,
  password: config.password,
});

const getConnection = () => {
  return connection;
};

export { getConnection };

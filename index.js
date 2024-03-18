import app from "./app.js";
const main = () => {
  app.listen(3000, () => {
    console.log(`server listening on port http://localhost:3000`);
  });
};

main();

import dotenv from "dotenv";
import app from "./app.js";
import ConncetDB from "./db/database.js";

dotenv.config({
  path: "./src/.env",
});

//db connection
ConncetDB()
  .then(() => {
    app.listen(process.env.PORT || 9000, () => {
      console.log(`server is running at port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MOngoDB COnnection Faild!!", err);
  });

// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`server starting ${PORT}`);
// });

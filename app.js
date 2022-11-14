import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import { router } from "./router/router.js";
const app = express();
app.use(
  fileUpload({
    createParentPath: true,
  })
);
// app.use((req, res, next) => {
//   req.hostname == "127.0.0.1" ? next() : res.send("Access Denied");
// });
app.use(express.static("public"));
app.use(cors("http://127.0.0.1:3000"));
app.use(router);
app.listen(3002, () => console.log(`Server running in CDN mode on port ${3002}`));

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
// app.use(
//   cors({
//     // credentials: true,
//     origin: ["https://shop.agahpardazan.ir/*"],
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     allowedHeaders:{
//       'Access-Control-Allow-Origin': '*',
//        'Access-Control-Allow-Headers': '*'
//     }
    
//   })
// );
app.use(express.static("public"));
app.use(cors({ origin: "https://shop.agahpardazan.ir" }));
// app.use(cors("http://localhost:3000"));
app.use(router);
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running in CDN mode on port ${PORT}`));

import { Router } from "express";
import path from "path";
export const router = Router();

router.post("/upload", (req, res) => {
  const { files } = req.files;
  if (!files) return res.sendStatus(400);
  const fileName = Date.now() * 2 + path.parse(files.name).ext;
  files.mv("public/upload/" + fileName);
  res.send({ name: fileName });
});

// router.get("/private",(req,res)=>{
//   res
// })

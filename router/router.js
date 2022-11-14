import { Router } from "express";
import path from "path";
export const router = Router();

router.post("/upload", (req, res) => {
  const { image } = req.files;
  if (!image) return res.sendStatus(400);
  const fileName = new Date().getTime() + "_" + image.name;
  image.mv("public/upload/" + Date.now() + path.parse(fileName).ext);
  res.sendStatus(200);
});

// router.get("/private",(req,res)=>{
//   res
// })

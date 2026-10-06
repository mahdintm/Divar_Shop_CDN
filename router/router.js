import { Router } from "express";
import path from "path";
export const router = Router();

router.post("/upload", async (req, res) => {
  const files = req.files?.files;
  if (!files) return res.sendStatus(400);

  const fileName = Date.now() * 2 + path.parse(files.name).ext;

  try {
    await files.mv("public/upload/" + fileName);
    return res.send({ name: fileName });
  } catch (error) {
    return res.sendStatus(500);
  }
});

// router.get("/private",(req,res)=>{
//   res
// })

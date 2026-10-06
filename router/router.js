import { Router } from "express";
import path from "path";
import { randomBytes } from "crypto";
export const router = Router();

router.post("/upload", async (req, res) => {
  const files = req.files?.files;
  if (!files) return res.sendStatus(400);

  const extension = path.parse(files.name).ext;
  const fileName = `${randomBytes(16).toString("hex")}${extension}`;

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

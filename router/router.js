import { Router } from "express";
import { randomBytes } from "crypto";
export const router = Router();

const hasValidImageSignature = (data, mimeType) => {
  if (!Buffer.isBuffer(data)) return false;

  if (mimeType === "image/jpeg") {
    return data.length >= 3 && data[0] === 0xff && data[1] === 0xd8 && data[2] === 0xff;
  }

  if (mimeType === "image/png") {
    return (
      data.length >= 8 &&
      data[0] === 0x89 &&
      data[1] === 0x50 &&
      data[2] === 0x4e &&
      data[3] === 0x47 &&
      data[4] === 0x0d &&
      data[5] === 0x0a &&
      data[6] === 0x1a &&
      data[7] === 0x0a
    );
  }

  if (mimeType === "image/gif") {
    return data.length >= 6 && data.subarray(0, 6).toString("ascii") in { "GIF87a": true, "GIF89a": true };
  }

  if (mimeType === "image/webp") {
    return (
      data.length >= 12 &&
      data.subarray(0, 4).toString("ascii") === "RIFF" &&
      data.subarray(8, 12).toString("ascii") === "WEBP"
    );
  }

  return false;
};

router.post("/upload", async (req, res) => {
  const files = req.files?.files;
  if (!files || Array.isArray(files)) return res.sendStatus(400);
  if (!files.size || files.truncated) return res.sendStatus(413);

  const extensionByMimeType = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/gif": ".gif",
    "image/webp": ".webp",
  };
  const extension = extensionByMimeType[files.mimetype];
  if (!extension || !hasValidImageSignature(files.data, files.mimetype)) {
    return res.sendStatus(415);
  }

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

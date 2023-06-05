import express from "express";
const router = express.Router();
import path from "path";

/** this will serve a file for 404/ not found/ no route matched instead of plain texts
 * ^ = start with slash
 * $ =ends with slash
 * | =or  (if user hits / or index.html)
 * index(.html) = (html)? is optional//index or index.html=true
 * ? = makes proceeding character/character in bracket optional
 */
router.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

export default router;

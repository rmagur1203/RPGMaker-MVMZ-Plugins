import { exec } from "child_process";
import { existsSync } from "fs";
import { join } from "path";
import express from "express";
import "dotenv/config";

const root = process.env.INJECTOR_PATH;
const folder = existsSync(join(root, "www/js")) ? join(root, "www") : root;

const app = express();
app.use(express.static(folder));
app.listen(3000, () => {
  console.log(`Server running on port 3000`);
  console.log(`http://localhost:3000`);
  exec(`http://localhost:3000`);
});

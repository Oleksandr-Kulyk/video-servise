import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const handlebarsConfig = {
  defaultLayout: "root",
  partialsDir: path.join("./views/partials"),
};

export default handlebarsConfig;

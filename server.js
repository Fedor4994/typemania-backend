import app from "./app.js";
import * as dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});

import { readFileSync } from "fs";
import minify from "jsonminify";

const settings = JSON.parse(minify(readFileSync("./public/settings.json", "utf-8")));
export { settings };

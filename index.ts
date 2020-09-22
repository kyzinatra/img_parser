import { readFileSync } from "fs";
import minify from "jsonminify";

interface ISettings {
	mode: "random" | "sequentially";
	length: [number, number] | number;
	filterBadPaths: boolean;
	log: boolean;
	startsFrom: string | null;
	streams: number;
}
const settings: ISettings = JSON.parse(minify(readFileSync("./public/settings.json", "utf-8")));
export { settings };

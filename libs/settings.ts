import { settings } from "..";
import { DeepArray } from "../types/interfaces";
import { writeFile, readFileSync } from "fs";
import { ask } from "./aks";

function set(resSettings: DeepArray<string>) {
	console.log(resSettings);
	resSettings.forEach((a, i) => {
		switch (i) {
			case 0:
				let mode = String(a);
				if (mode != "random" && mode != "sequentially") break;
				settings.mode = mode;
				break;
			case 1:
				try {
					let length = JSON.parse(String(a));
					settings.length = length;
				} catch (err) {
					console.log("Invalid length value (Left by default)");
				}
				break;
			case 2:
				settings.filterBadPaths = String(a).toLowerCase() !== "n";
				break;
			case 3:
				settings.log = String(a).toLowerCase() !== "n";
				break;
			case 4:
				settings.streams = +a > 0 && +a < 5 ? ~~+a : 1;
				break;
		}
	});
	writeFile("./public/settings.json", JSON.stringify(settings), "utf-8", () => {});
}

async function aksSettings() {
	const askLine: string[] = JSON.parse(readFileSync("./askLines/askSettingsLine.json", "utf-8"));
	const answers = await ask.line(askLine);
	set(answers);
}

export const settingsManager = {
	set,
	aksSettings,
};

import { settings } from "..";
import { stream } from "../libs/stream";
import { writeFile } from "fs";
import { IResult } from "../types/interfaces";
import { ask } from "../libs/aks";
import { readFileSync } from "fs";
import { settingsManager } from "../libs/settings";

let streamsResult: IResult[][] = [];

async function start() {
	// ask func
	const line: string[] = JSON.parse(readFileSync("./askLines/aksLine.json", "utf-8"));
	const results = await ask.line(line);
	const [resTimes, [...resSettings], whantStart] = results;

	if (resSettings[0] != "n") settingsManager.set([...resSettings].slice(1));
	if (String(whantStart).toLowerCase() === "n") return;

	// parse start
	const streamsLength = settings.streams;
	const times = Math.ceil((+resTimes || 0) / streamsLength);

	for (let i = 0; i < streamsLength; i++) {
		stream.set(times, i).then(res => {
			streamsResult.push(res);
			if (streamsResult.length === streamsLength) {
				writeFile(
					"./public/result/result.json",
					JSON.stringify(streamsResult.reduce((l, a) => [...l, ...a], [])),
					() => {
						console.log("\n\nReady!!!");
					}
				);
			}
		});
	}
}

start();

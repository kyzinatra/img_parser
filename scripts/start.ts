import { settings } from "..";
import { stream } from "../libs/stream";
import { writeFile } from "fs";
import { IResult } from "../libs/parse";
import { get } from "../libs/get";
let streamsResult: IResult[][] = [];

async function start() {
	const streamsLength = settings.streams;
	const times = Math.ceil(10 / streamsLength);

	for (let i = 0; i < streamsLength; i++) {
		stream.set(times, i).then(res => {
			streamsResult.push(res);
			if (streamsResult.length === streamsLength) {
				writeFile(
					"./public/result/result.json",
					JSON.stringify(streamsResult.reduce((l, a) => [...l, ...a], [])),
					() => {}
				);
			}
		});
	}
}

start();

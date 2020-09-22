import readline from "readline";
import { DeepArray } from "../types/interfaces";

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

async function askFn(question: string): Promise<string> {
	return new Promise(resolve => {
		rl.question(question, (res: string) => resolve(res));
	});
}

async function lineAsk(askLine: (string | string[])[]) {
	let answers: DeepArray<string> = [];

	for (let i = 0; i < askLine.length; i++) {
		let el = askLine[i];
		if (i === 0 && typeof el === "string" && el.endsWith("(y/n) ")) {
			let result: string = await askFn(el);
			if (result.toLowerCase() === "n") return ["n"];
			answers.push(result);
			continue;
		}
		if (typeof el === "string") {
			let result: string = await askFn(el);
			answers.push(result);
		} else {
			let lineRes = await lineAsk(el);
			answers.push(lineRes);
		}
	}
	return answers;
}
export const ask = {
	question: askFn,
	line: lineAsk,
};

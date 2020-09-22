import { settings } from "..";
import { get } from "./get";
import { parse } from "./parse";
import { IResult } from "../types/interfaces";
async function setStream(times: number, index: number): Promise<IResult[]> {
	let result: IResult[] = [];

	for (let i = 0; i < times; i++) {
		const path = get.url(times * index);
		const url = `https://prnt.sc/${path}`;
		if (settings.log) console.log(url);

		const ulrResult = await parse(url);
		if (ulrResult) result.push(ulrResult);
		else i--;
	}
	return result;
}

export const stream = {
	set: setStream,
};

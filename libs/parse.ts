import { get } from "./get";
import { settings } from "..";

export interface IResult {
	img: string;
	url: string;
}

export async function parse(url: string): Promise<IResult | undefined> {
	const invalidScreen = "//st.prntscr.com/2020/08/01/0537/img/0_173a7b_211be8ff.png";
	const $ = await get.page(url).catch(err => {
		throw err;
	});
	const img = $("#screenshot-image");

	let result;
	img.each((_, el: CheerioElement) => {
		if (el.attribs.src !== invalidScreen) {
			result = { img: el.attribs.src, link: url };
			if (settings.log) console.log(`Success: ${url}. Url adds to result`);
		} else if (!settings.filterBadPaths) {
			console.log(`Fail path: ${url}`);
		}
	});
	return result;
}

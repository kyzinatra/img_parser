import { settings } from "..";
import request from "request";
import cheerio from "cheerio";

function getUrl(indent: number): string {
	let { mode, startsFrom, length } = settings;
	if (typeof length == "number") length = [length, length];

	if (mode === "random") {
		const getLength = ~~(length[0] + Math.random() * (length[1] + 1 - length[0]));
		return Array.from({ length: getLength }, _ => (~~(Math.random() * 36)).toString(36)).join("");
	}

	if (mode === "sequentially") {
		const next = parseInt(startsFrom || "0", 36) + 1;
		settings.startsFrom = next.toString(36);
		console.log(next);
		const nextWithIndent = (next + indent).toString(36);
		if (nextWithIndent.length > length[1]) throw Error("Length limit!"); // TODO: Нормальный лог при ошибке

		return nextWithIndent.padEnd(length[0], "0");
	}

	throw ReferenceError(`Invalid mode in settings check ./public/settings.json`);
}

async function getPage(url: string): Promise<CheerioStatic> {
	const optinos = {
		url: url,
		headers: {
			"User-Agent":
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36",
		},
	};
	return new Promise((resolve, reject) => {
		request(optinos, (err: Error, _, body) => {
			if (err) reject(err);
			resolve(cheerio.load(body, { decodeEntities: false }));
		});
	});
}

export const get = {
	url: getUrl,
	page: getPage,
};

import got from "got";
import fs from "fs";

const json = JSON.parse(fs.readFileSync("./public/result/result.json", "utf-8"));

async function generate() {
	for (let i = 0; i < json.length; i++) {
		const img: string = json[i].link;
		const index = i;

		await got(img, {
			responseType: "buffer",
		})
			.then((response: any) => Buffer.from(response.body, "binary").toString("base64"))
			.then(res => {
				console.log(`Image number ${i + 1} downloaded`);
				json[index].base64 = res;
			});
	}
}
generate().then(() => {
	fs.writeFileSync("./public/result/result.json", JSON.stringify(json), "utf-8");
	console.log("Ready");
});

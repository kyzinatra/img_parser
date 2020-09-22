import fs from "fs";
import { IResult } from "../types/interfaces";

const json = JSON.parse(fs.readFileSync("./public/result/result.json", "utf-8"));

async function html() {
	const imgs: string[] = json.reduce((l: string, a: IResult) => {
		return l + `<img src="${a.img}" alt="">`;
	}, "");

	const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Parse result</title>
      </head>
      <body>
        <div class="gallery">
          ${imgs}
        </div>
      </body>
    </html>
  `;
	fs.writeFile("./public/result/result.html", html, "utf-8", () => {
		console.log("Ready");
	});
}

html();

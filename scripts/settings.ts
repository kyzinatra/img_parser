import { settingsManager } from "../libs/settings";

async function settings() {
	await settingsManager.aksSettings();
	console.log("\n\nReady!!!");
}
settings();

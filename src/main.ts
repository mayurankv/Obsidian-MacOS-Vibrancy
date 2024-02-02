import { Plugin, Notice, WorkspaceWindow } from "obsidian";

import { DEFAULT_SETTINGS, VibrancySettings } from "./Settings";
import { SettingsTab } from "./SettingsTab";
import { setVibrancy } from "./Vibrancy";

export default class VibrancyPlugin extends Plugin {
	settings: VibrancySettings;

	async onload() {
		if (process.platform !== "darwin") {
			new Notice("Plugin only works on MacOS"); //NOSONAR
			console.warn("Plugin only works on MacOS")
			return;
		}

		await this.loadSettings(); // Load Settings
		const settingsTab = new SettingsTab(this.app,this);
		this.addSettingTab(settingsTab);

		setVibrancy(this)
		this.registerEvent(this.app.workspace.on("window-open",(win: WorkspaceWindow, window: Window) => {
			setVibrancy(this, [window]);
		},this));
		document.body.classList.add("vibrancy"); // Load Styles

		console.log("Loaded plugin: Vibrancy");
	}

	onunload() {
		setVibrancy(this, undefined, null);
		// Set All windows

		console.log("Unloaded plugin: Vibrancy");
	}

	async loadSettings() {
		this.settings = {...structuredClone(DEFAULT_SETTINGS), ...(await this.loadData())};
	}

	async saveSettings() {
		await this.saveData(this.settings);
		this.app.workspace.updateOptions();
		setVibrancy(this);
	}
}

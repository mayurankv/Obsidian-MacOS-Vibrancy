import { App, PluginSettingTab, Setting, Notice, TextComponent, DropdownComponent, SliderComponent, ToggleComponent, ExtraButtonComponent, MarkdownRenderer } from "obsidian";
import { setVibrancy } from "./Vibrancy";

import VibrancyPlugin from "./main";
import { Vibrancy, VIBRANCIES } from "./Settings";

export class SettingsTab extends PluginSettingTab {
	plugin: VibrancyPlugin;

	constructor(app: App, plugin: VibrancyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	/**
	 *  Builds the html page that is showed in the settings.
	 */
	display() {
		this.emptySettings(this.containerEl);
		this.generateVibrancySettings(this.containerEl);
	}

	// Create Settings Groups
	emptySettings(containerEl: HTMLElement) {
		containerEl.empty();
		containerEl.createEl("h1", {text: "Settings for the Vibrancy Plugin."});
	}
	generateVibrancySettings(containerEl: HTMLElement) {
		new Setting(containerEl)
			.setName("Set Vibrancy")
			.setDesc("Choose vibrancy mode")
			.addDropdown((dropdown) => dropdown
				.addOptions(VIBRANCIES.reduce((result: Record<string,Vibrancy>, vibrancy: Vibrancy) => {
					result[vibrancy] = vibrancy;
					return result;
				}, {}))
				.setValue(this.plugin.settings.vibrancy)
				.onChange((value: string) => {
					this.plugin.settings.vibrancy = value as Vibrancy;
					setVibrancy(this.plugin);
					this.saveSettings();
				}));
	}

	saveSettings() {
		(async () => {await this.plugin.saveSettings();})();
	}
}

// Fetch Settings
function getCurrentMode() {
	const body = document.querySelector("body");
	if (body !== null){
		if (body.classList.contains("theme-light"))
			return "light";
		else if (body.classList.contains("theme-dark"))
			return "dark";
	}
	console.warn("Warning: Couldn't get current theme");
	return "light";
}

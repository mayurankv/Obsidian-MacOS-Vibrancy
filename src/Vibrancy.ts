import VibrancyPlugin from "./main";
import { Vibrancy } from "./Settings";

export function setVibrancy(plugin: VibrancyPlugin, windows: Array<Window> | undefined = undefined, vibrancy: Vibrancy | null | undefined = undefined) {
	if (typeof vibrancy === "undefined")
		vibrancy = plugin.settings.vibrancy;
	if (!isTranslucent(plugin) || vibrancy === "none")
		vibrancy = null;

	if (vibrancy === null)
		document.body.removeClass("is-translucent");
	else
		document.body.addClass("is-translucent");

	if (typeof windows === "undefined")
		windows = [window]; // Should be all windows
	windows.forEach(window => (window as any).electronWindow.setVibrancy(vibrancy));
}

function isTranslucent(plugin: VibrancyPlugin): boolean {
	return !!(plugin.app.vault as any).getConfig("translucency")
};

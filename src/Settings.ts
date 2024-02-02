// Typing
export const VIBRANCIES = [
	"none",
	"content",
	"fullscreen-ui",
	"header",
	"hud",
	"menu",
	"popover",
	"selection",
	"sheet",
	"sidebar",
	"titlebar",
	"tooltip",
	"under-page",
	"under-window",
	"window",
] as const;

export type Vibrancy = typeof VIBRANCIES[number];

// Interface Creation
export interface VibrancySettings {
	vibrancy: Vibrancy;
	version: string;
}

// Plugin default settings
export const DEFAULT_SETTINGS: VibrancySettings = {
	vibrancy: "fullscreen-ui",
	version: "0.1.0",
};

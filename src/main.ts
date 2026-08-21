import { Plugin } from "obsidian";
import BibleVerses from "./BibleVerses";
import BibleSuggestions from "./BibleVerseSuggestions";
import BibleVerseSettingsTab from "./BibleVerseSettingsTab";

interface BibleVerseSettings {
	bibleTrigger: string;
}


const DEFAULT_SETTINGS: BibleVerseSettings = {
	bibleTrigger: "/",
};

export interface SuggestionVerse {
	verseKey: string;
	verseText: string | undefined;
}

export default class BibleVersePlugin extends Plugin {
	settings!: BibleVerseSettings;
	bibleVerses!: BibleVerses;

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new BibleVerseSettingsTab(this.app, this));
		this.bibleVerses = new BibleVerses(this);
		await this.bibleVerses.load()
		this.registerEditorSuggest(new BibleSuggestions(this));
	}

	onunload() {
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}


}

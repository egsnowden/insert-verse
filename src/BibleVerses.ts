import { EditorSuggestContext, EditorSuggestTriggerInfo } from "obsidian";
import BibleVersePlugin from "./main";
import versesData from "./nwt_verses.json";

export default class BibleVerses {
    private plugin: BibleVersePlugin;
    public verses: Record<string, string> = versesData as Record<string, string>;
    constructor(plugin: BibleVersePlugin) {
        this.plugin = plugin;
    }

    async load() {}

    public getVerse(reference: string): string | undefined {
        return this.verses[reference];
    }
}
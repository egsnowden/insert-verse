import { EditorSuggestContext, EditorSuggestTriggerInfo } from "obsidian";
import SlashSnippetPlugin from "./main";

export default class BibleVerses {
    private plugin: SlashSnippetPlugin;
    public verses: Record<string, string> = {};
    constructor(plugin: SlashSnippetPlugin) {
        this.plugin = plugin;
    }

    async load() {
        const path = `${this.plugin.manifest.dir}/nwt_verses.json`;
        const raw = await this.plugin.app.vault.adapter.read(path);
        const parsed = JSON.parse(raw);
        this.verses = parsed;
    }

    public getVerse(reference: string): string | undefined {
        return this.verses[reference];
    }
}
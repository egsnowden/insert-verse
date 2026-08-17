import { Editor, EditorSuggest, EditorPosition, TFile, EditorSuggestContext, EditorSuggestTriggerInfo } from "obsidian";
import SlashSnippetPlugin, { SuggestionObject, SuggestionVerse } from "./main";

export default class BibleSuggestions extends EditorSuggest<SuggestionVerse> {
    private plugin: SlashSnippetPlugin;

    constructor(app: SlashSnippetPlugin) {
        super(app.app);
        this.plugin = app;
    }

    onTrigger(
        cursor: EditorPosition,
        editor: Editor,
        file: TFile | null
    ): EditorSuggestTriggerInfo | null {
        const currentLine = editor.getLine(cursor.line).slice(0, cursor.ch);
        const trigger = "!"

        if (!currentLine.contains(trigger)) {
            return null
        }

        const queryStart = currentLine.lastIndexOf(trigger)
        const query = currentLine.slice(queryStart + 1, currentLine.length);
        return {
            start: {
                ...cursor,
                ch: queryStart,
            },
            end: cursor,
            query: query
        };
    }

    getSuggestions(context: EditorSuggestContext): SuggestionVerse[] | Promise<SuggestionVerse[]> {
        const allReferences = Object.keys(this.plugin.bibleVerses.verses);
        const queryResult = allReferences.filter((ref) => ref.startsWith(context.query));

        return queryResult.map((ref) => ({
            verseKey: ref,
            verseText: this.plugin.bibleVerses.getVerse(ref)
        }))
    }

    renderSuggestion(value: SuggestionVerse, el: HTMLElement): void {
        el.createEl("div", { text: value.verseKey })
    }

    selectSuggestion(value: SuggestionVerse, evt: MouseEvent | KeyboardEvent): void {
        if (!this.context) {
            return
        }

        const editor = this.context.editor
        const from = this.context.start
        const to = this.context.end

        const replacement = value.verseKey + " " + value.verseText

        editor.replaceRange(replacement, from, to)
    }
}
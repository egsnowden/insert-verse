import { App, Notice, PluginSettingTab, Setting } from "obsidian";
import BibleVersePlugin from "./main";

export default class BibleVerseSettingsTab extends PluginSettingTab {
    plugin: BibleVersePlugin;

    constructor(app: App, plugin: BibleVersePlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;

        containerEl.empty();

        new Setting(containerEl)
            .setName("Verse trigger")
            .setDesc(
                "Enter a character that will trigger the verse to be inserted"
            )
            .addText((text) =>
                text
                    .setPlaceholder("Verse trigger")
                    .setValue(this.plugin.settings.bibleTrigger)
                    .onChange(async (value) => {
                        if (value && value.length > 1) {
                            new Notice("Please use one character to avoid conflict");
                            text.setValue(value[0] ?? "");
                        } else {
                            this.plugin.settings.bibleTrigger = value;
                            await this.plugin.saveSettings();
                        }
                    })
            );
    }
}
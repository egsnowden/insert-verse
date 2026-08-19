---
type: Reference
title: Source Code Map
description: Complete reference guide to the insert-verse plugin source code structure, modules, key functions, and type definitions.
tags: [obsidian, plugin, source-code, typescript, architecture, reference]
openwiki:
  roles: [architecture, repository]
  source_paths: [src/main.ts, src/SlashSuggestions.ts, src/BibleVerseSuggestions.ts, src/BibleVerses.ts, src/SlashSnippetSettingTab.ts]
---

# Source Code Map

This reference documents the complete structure of the insert-verse plugin source code, including all modules, functions, types, and their relationships.

## Directory Structure

```
src/
├── main.ts                        # Main plugin class and settings interface
├── SlashSuggestions.ts            # Snippet editor suggester
├── BibleVerseSuggestions.ts       # Bible verse editor suggester
├── BibleVerses.ts                 # Bible verses data manager
├── SlashSnippetSettingTab.ts      # Settings UI panel
└── nwt_verses.json                # Bible database (4.8 MB)
```

## Module Overview

### main.ts (Main Plugin Module)

**Purpose:** Entry point, plugin lifecycle, settings management, and core orchestration.

**Primary Exports:**

```typescript
// Main plugin class
export default class SlashSnippetPlugin extends Plugin

// Settings type
interface SlashSnippetSettings

// Suggestion types
export interface SuggestionObject
export interface SuggestionVerse
```

**Key Classes:**

#### SlashSnippetPlugin

Extends `Obsidian.Plugin`. Manages the entire plugin lifecycle.

**Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `settings` | `SlashSnippetSettings` | Current plugin configuration |
| `selectedText` | `string` | Last selected text (used for `%%textSelection%%`) |
| `snippetFiles` | `TFile[]` | Array of loaded snippet files from vault |
| `bibleVerses` | `BibleVerses` | Bible verses database wrapper |

**Lifecycle Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `onload()` | `async onload()` | Initializes plugin, registers suggesters, loads settings |
| `onunload()` | `onunload()` | Cleanup (currently empty) |
| `loadSettings()` | `async loadSettings()` | Loads settings from Obsidian storage |
| `saveSettings()` | `async saveSettings()` | Saves current settings to Obsidian storage |

**Core Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `loadAllTemplatedFiles()` | `loadAllTemplatedFiles()` | Scans vault for snippets in configured folder |
| `listenForUpdates()` | `listenForUpdates()` | Registers vault event handlers (create, delete files) |
| `runTemplaterReplace()` | `async runTemplaterReplace()` | Executes Templater plugin if enabled |

**Settings Interface:**

```typescript
interface SlashSnippetSettings {
    slashTrigger: string;              // Snippet trigger character
    bibleTrigger: string;              // Bible verse trigger character
    fuzzySearch: boolean;              // Enable fuzzy matching
    highlight: boolean;                // Highlight matched characters
    showPath: boolean;                 // Show file path in suggestions
    showFileContent: boolean;          // Show content preview
    snippetPath: string;               // Folder containing snippets
    ignoreProperties: boolean;         // Strip YAML frontmatter
    templaterSupport: boolean;         // Run Templater after insertion
    textSelectionString: string;       // Selection placeholder text
    cursorPositionString: string;      // Cursor placeholder text
    maxSelectedTextLength: number;     // Max selection length to capture
    showSelectedText: boolean;         // Show selection in suggestions
}
```

**Default Settings:**

```typescript
const DEFAULT_SETTINGS: SlashSnippetSettings = {
    slashTrigger: "/",
    bibleTrigger: "!",
    fuzzySearch: true,
    highlight: true,
    showPath: false,
    showFileContent: false,
    snippetPath: "Snippets",
    ignoreProperties: true,
    templaterSupport: true,
    textSelectionString: "%%textSelection%%",
    cursorPositionString: "%%cursor%%",
    maxSelectedTextLength: 50,
    showSelectedText: false
};
```

**Event Listeners:**

- **EditorView.updateListener**: Captures selected text when slash trigger replaces selection
- **vault.on('create')**: Adds newly created snippets to `snippetFiles` array
- **vault.on('delete')**: Removes deleted snippets from `snippetFiles` array

**Suggestion Types:**

```typescript
export interface SuggestionObject {
    filePath: string;                  // Path to snippet file
    positions: number[];               // Character positions for highlighting
    score: number;                     // Ranking score (1 or 2)
}

export interface SuggestionVerse {
    verseKey: string;                  // Verse reference (e.g., "John 3:16")
    verseText: string | undefined;     // Full verse text or undefined if not found
}
```

---

### SlashSuggestions.ts (Snippet Suggester)

**Purpose:** Provides inline snippet suggestions using Obsidian's `EditorSuggest` API.

**Primary Exports:**

```typescript
export default class SlashSuggestions extends EditorSuggest<SuggestionObject>
```

**Key Class:**

#### SlashSuggestions

Extends `Obsidian.EditorSuggest<SuggestionObject>`. Handles snippet search and insertion.

**Private Properties:**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `plugin` | `SlashSnippetPlugin` | — | Reference to main plugin |
| `DEFAULT_SCORE` | `number` | `1` | Score for partial matches |
| `START_WITH_SCORE` | `number` | `2` | Score for snippets starting with query |

**Exported Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `onTrigger()` | `onTrigger(cursor, editor, file)` | Detects trigger and extracts query |
| `getSuggestions()` | `getSuggestions(context)` | Returns matching snippets |
| `renderSuggestion()` | `renderSuggestion(item, el)` | Renders suggestion in dropdown |
| `selectSuggestion()` | `selectSuggestion(item, evt)` | Handles insertion |

**Private Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `getAllSnippets()` | `getAllSnippets(query)` | Searches all snippets with fuzzy or substring matching |
| `fuzzyMatch()` | `fuzzyMatch(text, query)` | Fuzzy character matching algorithm |
| `getLastUsedSnippetFiles()` | `getLastUsedSnippetFiles()` | Returns snippets ranked by most recent use |

**Key Algorithm: Fuzzy Matching**

The `fuzzyMatch()` method implements character-order matching:

```
Input: text="Button", query="btn"
Algorithm:
  t=0, q=0, positions=[]
  Loop through text:
    - 'B' matches 'b' (lowercase) → q++, positions=[0]
    - 'u' matches 't'? no
    - 't' matches 't' → q++, positions=[0,2]
    - 't' matches 'n'? no
    - 'o' matches 'n'? no
    - 'n' matches 'n' → q++, positions=[0,2,5]
  Result: Match found, positions=[0,2,5] for highlighting
```

**Insertion Flow:**

1. User selects suggestion
2. Read snippet file from vault
3. Parse YAML frontmatter (remove if `ignoreProperties: true`)
4. Replace `%%textSelection%%` with captured selected text
5. Find position of `%%cursor%%`, replace with empty string
6. Insert snippet content at editor range
7. Position cursor at `%%cursor%%` location or `%%textSelection%%` if no cursor placeholder
8. Save file and run Templater if `templaterSupport: true`
9. Update localStorage timestamp for "last used" ranking

**localStorage Keys:**

The plugin uses browser localStorage to track last-used timestamps:

```
Key: "<file_path>"  (e.g., "Snippets/meeting-notes.md")
Value: "<timestamp>" (e.g., "1705330400000")
```

---

### BibleVerseSuggestions.ts (Bible Verse Suggester)

**Purpose:** Provides inline Bible verse suggestions and insertion.

**Primary Exports:**

```typescript
export default class BibleSuggestions extends EditorSuggest<SuggestionVerse>
```

**Key Class:**

#### BibleSuggestions

Extends `Obsidian.EditorSuggest<SuggestionVerse>`. Handles Bible verse search and insertion.

**Constructor:**

```typescript
constructor(app: SlashSnippetPlugin) {
    super(app.app);
    this.plugin = app;
}
```

**Note:** Takes plugin as parameter, unlike typical EditorSuggest pattern. Accesses `app.app` to pass Obsidian app to parent.

**Public Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `onTrigger()` | `onTrigger(cursor, editor, file)` | Detects Bible trigger and extracts query |
| `getSuggestions()` | `getSuggestions(context)` | Returns matching verses |
| `renderSuggestion()` | `renderSuggestion(item, el)` | Renders verse key in dropdown |
| `selectSuggestion()` | `selectSuggestion(item, evt)` | Handles insertion |

**Private Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `fuzzyMatch()` | `fuzzyMatch(text, query)` | Fuzzy character-order matching for verses |

**Key Algorithm: Bible Verse Fuzzy Matching**

Simpler than snippet matching (only returns boolean, not positions):

```
Input: text="John 3:16", query="jhn 3"
Algorithm:
  text="john 3:16" (lowercase)
  query="jhn 3" (lowercase)
  q=0
  Loop through text:
    - 'j' matches 'j' → q++
    - 'o' matches 'h'? no
    - 'h' matches 'h' → q++
    - 'n' matches 'n' → q++
    - ' ' matches ' ' → q++
    - '3' matches '3' → q++
  Result: q==query.length, return true (match)
```

**Insertion Output Format:**

When a verse is selected, the replacement text is:

```
<verseKey> <verseText>
```

Example: `John 3:16 For God so loved the world that he gave his only-begotten Son...`

---

### BibleVerses.ts (Bible Data Manager)

**Purpose:** Loads and provides access to the Bible verses database.

**Primary Exports:**

```typescript
export default class BibleVerses
```

**Key Class:**

#### BibleVerses

Manages the Bible verses database lifecycle.

**Constructor:**

```typescript
constructor(plugin: SlashSnippetPlugin)
```

**Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `plugin` | `SlashSnippetPlugin` | Reference to main plugin |
| `verses` | `Record<string, string>` | Verse database (reference → text) |

**Public Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `load()` | `async load()` | Loads `nwt_verses.json` from plugin directory |
| `getVerse()` | `getVerse(reference)` | Returns verse text or `undefined` |

**Data Structure:**

```typescript
verses: Record<string, string> = {
    "Genesis 1:1": "In the beginning God created the heavens and the earth.",
    "John 3:16": "For God so loved the world that he gave his only-begotten Son...",
    ...
}
```

**Loading Process:**

1. Called in `SlashSnippetPlugin.onload()`
2. Reads file from `${plugin.manifest.dir}/nwt_verses.json`
3. Parses JSON into `verses` object
4. Available for verse suggestions immediately after

**Note on File Path:**

Uses `this.plugin.manifest.dir` which provides the plugin's installation directory. This ensures the JSON file is found regardless of vault location.

---

### SlashSnippetSettingTab.ts (Settings UI)

**Purpose:** Provides the plugin settings interface in Obsidian preferences.

**Primary Exports:**

```typescript
export default class SlashSnippetSettingTab extends PluginSettingTab
```

**Key Class:**

#### SlashSnippetSettingTab

Extends `Obsidian.PluginSettingTab`. Renders settings UI.

**Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `plugin` | `SlashSnippetPlugin` | Reference to main plugin |

**Public Methods:**

| Method | Signature | Description |
|--------|-----------|-------------|
| `display()` | `display()` | Renders all settings controls |

**Settings UI Sections:**

1. **Bible Trigger** (text input, single character)
2. **Snippet Trigger** (text input, single character)
3. **Fuzzy Search** (toggle)
4. **Highlight** (toggle)
5. **Show File Path** (toggle)
6. **Show Snippet Content** (toggle)
7. **Show Last Selected Text** (toggle)
8. **Ignore Properties** (toggle)
9. **Templater Support** (toggle)
10. **Text Selection Placeholder** (text input)
11. **Cursor Position Placeholder** (text input)
12. **Max Selected Text Length** (number input)

**Validation:**

- **Trigger fields:** If more than 1 character entered, truncate to first character and show notice: "Please use one character to avoid conflict"
- All other fields accept any input and immediately save to plugin settings

**Setting Creation Pattern:**

```typescript
new Setting(containerEl)
    .setName("<Display Name>")
    .setDesc("<Description>")
    .addToggle((enable) => {
        enable
            .setValue(this.plugin.settings.<property>)
            .onChange(async (value) => {
                this.plugin.settings.<property> = value;
                await this.plugin.saveSettings();
            })
    });
```

---

## Data Flow

### Snippet Insertion Sequence

```
1. User types slash trigger + query
   ↓
2. SlashSuggestions.onTrigger() detects trigger and query
   ↓
3. SlashSuggestions.getSuggestions() called with query
   ↓
4. getAllSnippets() searches snippet files
   ├─ If fuzzySearch enabled: fuzzyMatch() each filename
   ├─ If fuzzySearch disabled: substring match
   ├─ Score matching files (2 = starts with, 1 = partial)
   ├─ Sort by score descending
   └─ Return top results
   ↓
5. User selects suggestion
   ↓
6. SlashSuggestions.selectSuggestion() called
   ├─ Read snippet file from vault
   ├─ Parse and remove YAML frontmatter if ignoreProperties
   ├─ Replace %%textSelection%% with selectedText
   ├─ Record position of %%cursor%%
   ├─ Replace %%cursor%% with empty string
   ├─ Insert content at editor range
   ├─ Set cursor position
   ├─ Call plugin.runTemplaterReplace() if templaterSupport
   ├─ Update localStorage timestamp
   └─ Display result
```

### Bible Verse Insertion Sequence

```
1. User types Bible trigger + query
   ↓
2. BibleSuggestions.onTrigger() detects trigger and query
   ↓
3. BibleSuggestions.getSuggestions() called
   ├─ Get all verse references from verses database
   ├─ Filter with fuzzyMatch() on each reference
   ├─ Create SuggestionVerse objects
   └─ Return filtered results
   ↓
4. User selects suggestion
   ↓
5. BibleSuggestions.selectSuggestion() called
   ├─ Get verse reference and text from verses database
   ├─ Format as: "<reference> <text>"
   └─ Insert at editor range
```

### Settings Lifecycle

```
1. Plugin.onload()
   ├─ Call loadSettings()
   ├─ Merge loaded settings with defaults
   ├─ Create PluginSettingTab
   └─ Settings available to all components
   ↓
2. User changes setting in UI
   ├─ Setting.onChange() called
   ├─ Update plugin.settings object
   ├─ Call plugin.saveSettings()
   └─ Persisted to Obsidian storage
   ↓
3. Plugin runs with updated settings
   ├─ Use plugin.settings.<property> throughout
   ├─ Changes take effect immediately for suggestions
   └─ File reload may be needed for some changes
```

## Type Hierarchy

```
SlashSnippetPlugin extends Plugin
├─ Owns: SlashSuggestions extends EditorSuggest<SuggestionObject>
├─ Owns: BibleSuggestions extends EditorSuggest<SuggestionVerse>
├─ Owns: SlashSnippetSettingTab extends PluginSettingTab
├─ Owns: BibleVerses (non-extending class)
└─ Owns: SlashSnippetSettings (interface)

SuggestionObject
├─ filePath: string
├─ positions: number[]
└─ score: number

SuggestionVerse
├─ verseKey: string
└─ verseText: string | undefined
```

## External Dependencies

### Obsidian API

| Module | Used In | Purpose |
|--------|---------|---------|
| `obsidian` | All files | Plugin base, EditorSuggest, App, Vault |
| `@codemirror/view` | main.ts | Editor view updates, change tracking |

### Configuration

| File | Purpose |
|------|---------|
| `tsconfig.json` | TypeScript compilation settings |
| `esbuild.config.mjs` | Bundle build configuration |
| `eslint.config.mts` | Linting rules |

### Data

| File | Size | Purpose |
|------|------|---------|
| `nwt_verses.json` | ~4.8 MB | Bible database (New World Translation) |

## Common Patterns

### Editor Suggest Pattern

All suggesters follow this pattern:

```typescript
class XxxSuggestions extends EditorSuggest<SuggestionType> {
    onTrigger(cursor, editor, file): EditorSuggestTriggerInfo | null
    getSuggestions(context): SuggestionType[]
    renderSuggestion(item, el): void
    selectSuggestion(item, evt): void
}
```

### Settings Pattern

1. Define `interface XxxSettings` with all properties
2. Export `DEFAULT_SETTINGS` with default values
3. Store in `plugin.settings`
4. Load with `plugin.loadSettings()`
5. Save with `plugin.saveSettings()`
6. Update via `plugin.settings.property = value`

### Vault File Access

```typescript
// Read file
const file = this.app.vault.getFiles().find(f => f.path === path);
const content = await this.app.vault.read(file);

// Get markdown files
const files = this.app.vault.getMarkdownFiles();

// Listen for changes
this.registerEvent(this.app.vault.on('create', callback));
```

## Build and Bundle

### Build Process

```
Source (TypeScript)
  ↓
tsc -noEmit (type check)
  ↓
esbuild (bundle & minify)
  ↓
main.js (output)
```

### Compiled Output

- **File:** `main.js`
- **Format:** ES module (based on `"type": "module"` in package.json)
- **Size:** ~50-100 KB (estimated after minification)
- **Source Maps:** Included in development mode

## Performance Considerations

### Fuzzy Matching

- **Snippet search:** O(n*m) where n=files, m=query length
- **Bible search:** O(n*m) where n=verses (~7000), m=query length
- **Optimization:** Positions array only populated if highlighting enabled

### File Scanning

- **Initial scan:** O(n) where n=vault files (happens once on load)
- **Event listeners:** O(1) per create/delete
- **caching:** Cached in `plugin.snippetFiles` array

### localStorage Timestamps

- **Read:** O(1) per file
- **Write:** O(1) per insertion
- **Storage:** Grows with number of snippets (~bytes per file)

## Testing Considerations

### Unit Test Areas

1. **Fuzzy matching algorithms** (`SlashSuggestions.fuzzyMatch`, `BibleSuggestions.fuzzyMatch`)
2. **Placeholder replacement** (cursor, text selection)
3. **Settings validation** (single character triggers)
4. **Settings persistence** (load/save cycle)

### Integration Test Areas

1. **Snippet insertion** (file read, placeholder replacement, insertion)
2. **Bible verse insertion** (database lookup, insertion)
3. **Templater integration** (command execution)
4. **Vault events** (file create/delete tracking)

### Manual Test Cases

1. Insert snippet with cursor placeholder
2. Insert snippet with selected text
3. Insert Bible verse
4. Change settings and verify behavior
5. Search with fuzzy matching disabled
6. Search with highlighting disabled

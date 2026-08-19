---
type: Developer Guide
title: Building and Developing insert-verse
description: Instructions for setting up the development environment, building the plugin, running tests, and contributing code.
tags: [obsidian, plugin, development, typescript, build, contribution]
openwiki:
  roles: [delivery, repository]
  source_paths: [package.json, tsconfig.json, esbuild.config.mjs, eslint.config.mts]
  change_kinds: [build, development]
---

# Building and Developing insert-verse

This guide covers the development setup, build process, and contribution workflow for the insert-verse plugin.

## Prerequisites

- **Node.js** (v16 or later)
- **npm** (v7 or later)
- **TypeScript** (v5.8+)
- **Obsidian** (for testing the plugin)

## Development Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd insert-verse
```

### 2. Install Dependencies

```bash
npm install
```

This installs all required packages including:
- **obsidian**: Obsidian API
- **typescript**: TypeScript compiler
- **esbuild**: Module bundler
- **eslint**: Linting and code quality
- **typescript-eslint**: TypeScript linting rules

## Project Structure

```
insert-verse/
├── src/
│   ├── main.ts                      # Main plugin class (SlashSnippetPlugin)
│   ├── SlashSuggestions.ts          # Snippet suggester (EditorSuggest)
│   ├── BibleVerseSuggestions.ts     # Bible verse suggester (EditorSuggest)
│   ├── BibleVerses.ts               # Bible verses data manager
│   ├── SlashSnippetSettingTab.ts    # Settings UI
│   └── nwt_verses.json              # Bible verses database (4.8 MB)
├── esbuild.config.mjs               # Build configuration
├── eslint.config.mts                # Linting rules
├── tsconfig.json                    # TypeScript configuration
├── package.json                     # Dependencies and scripts
└── openwiki/                        # Documentation
```

## Building the Plugin

### Development Build

```bash
npm run dev
```

This starts esbuild in watch mode, recompiling the plugin as you make changes:
- Watches `src/**` files
- Outputs to `main.js`
- Supports source maps for debugging

### Production Build

```bash
npm run build
```

This performs:
1. TypeScript type checking (`tsc -noEmit -skipLibCheck`)
2. Production build with esbuild (minified, optimized)
3. Outputs to `main.js`

### Build Output

The main plugin bundle is generated as **`main.js`**. This file is loaded by Obsidian when the plugin is activated.

## Linting and Code Quality

### Run ESLint

```bash
npm run lint
```

The project uses ESLint with TypeScript support (`typescript-eslint`) and Obsidian-specific rules (`eslint-plugin-obsidianmd`).

#### Configuration

See `eslint.config.mts` for linting rules. Key checks include:
- TypeScript type safety
- Obsidian API best practices
- Code formatting and style

## Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Start the Dev Build

```bash
npm run dev
```

### 3. Test in Obsidian

- In Obsidian, go to **Settings → Community Plugins → Reload plugins** or restart Obsidian
- The plugin will load the latest `main.js`
- Enable the insert-verse plugin
- Test your changes in a vault

### 4. Commit and Push

```bash
git add .
git commit -m "feat: description of your changes"
git push origin feature/your-feature-name
```

### 5. Submit a Pull Request

Create a pull request with a clear description of the changes.

## Key Source Files

### `src/main.ts` - Plugin Entry Point

The main plugin class that orchestrates the entire system:
- Registers editor suggesters (snippet and Bible verse)
- Loads and manages settings
- Tracks snippet files from the vault
- Captures selected text for insertion
- Handles Templater integration

**Key interfaces:**
- `SlashSnippetSettings` - Plugin configuration schema

**Key methods:**
- `onload()` - Plugin initialization
- `loadAllTemplatedFiles()` - Scans for snippet files
- `listenForUpdates()` - Watches for file create/delete
- `runTemplaterReplace()` - Triggers Templater plugin

### `src/SlashSuggestions.ts` - Snippet Suggester

Provides inline snippet suggestions using Obsidian's `EditorSuggest` API:
- Detects slash trigger character
- Implements fuzzy matching algorithm
- Ranks snippets by score and last-used timestamp
- Inserts snippet content with placeholder replacement

**Key methods:**
- `onTrigger()` - Detects trigger and extracts query
- `getSuggestions()` - Returns matching snippets
- `renderSuggestion()` - Displays snippet in dropdown
- `selectSuggestion()` - Handles insertion

### `src/BibleVerseSuggestions.ts` - Bible Verse Suggester

Provides inline Bible verse suggestions:
- Detects Bible trigger character
- Implements character-order fuzzy matching
- Searches the verses database
- Inserts verse key and text

**Key methods:**
- `onTrigger()` - Detects Bible trigger
- `getSuggestions()` - Fuzzy filters verses
- `selectSuggestion()` - Inserts verse

### `src/BibleVerses.ts` - Bible Verse Data Manager

Loads and provides access to the Bible verses database:
- Reads `nwt_verses.json` from plugin directory
- Provides `getVerse(reference)` lookup method
- Data structure: `Record<string, string>` (reference → verse text)

### `src/SlashSnippetSettingTab.ts` - Settings UI

Provides the settings interface in Obsidian plugin preferences:
- Configurable triggers (Bible and snippet)
- Search behavior toggles (fuzzy search, highlighting)
- Display options (file path, content preview)
- Placeholder customization
- Validation for single-character triggers

## Making Changes

### Adding a New Setting

1. Add the property to `SlashSnippetSettings` interface in `src/main.ts`
2. Add it to `DEFAULT_SETTINGS`
3. Add a new `Setting` in `SlashSnippetSettingTab.ts`
4. Reference `this.plugin.settings.<newProperty>` where needed

### Modifying Fuzzy Search

Edit the `fuzzyMatch()` method in `src/SlashSuggestions.ts` or `src/BibleVerseSuggestions.ts`.

### Adding Bible Verse Books

Replace or update `src/nwt_verses.json` with a new verse database. The format must be:
```json
{
  "John 3:16": "For God so loved the world...",
  "Genesis 1:1": "In the beginning..."
}
```

## Testing

Currently, the project relies on manual testing in Obsidian. To test:

1. Build the plugin: `npm run build`
2. Copy `main.js` and `manifest.json` to `<obsidian-vault>/.obsidian/plugins/insert-verse/`
3. Reload Obsidian or restart
4. Enable the plugin in Community Plugins
5. Test snippet and verse insertion

## Debugging

### Source Maps

Development builds include source maps, allowing you to debug TypeScript directly:
- In browser DevTools, you'll see `.ts` files instead of compiled `.js`
- Set breakpoints and step through code

### Console Logging

Use `console.log()` to debug. Obsidian's Developer Console is accessible via:
- **View → Toggle Developer Tools** (Ctrl+Shift+I or Cmd+Shift+I)

### Performance

If the plugin is slow:
- Check fuzzy matching algorithm performance in `SlashSuggestions.ts`
- Profile suggestion generation with browser DevTools

## Version Bumping

To bump the version:

```bash
npm run version
```

This:
1. Runs `version-bump.mjs` script
2. Updates `manifest.json` and `versions.json`
3. Auto-commits and stages files via git hooks

## Publishing to Obsidian Community Plugins

See the [Obsidian Sample Plugin README](https://github.com/obsidianmd/obsidian-sample-plugin) for publishing instructions.

## Common Issues

### Plugin Not Loading

- Ensure `main.js` exists after `npm run build`
- Check that `manifest.json` is in the plugin directory
- Restart Obsidian and toggle the plugin off/on

### Settings Not Persisting

- Verify that `saveSettings()` is called after changes
- Check that settings are loaded with `loadSettings()` on startup

### Snippets Not Found

- Ensure snippet files are in the configured snippet folder (default: `Snippets`)
- Confirm file names use lowercase and don't have conflicting special characters

## Resources

- **[Obsidian Sample Plugin](https://github.com/obsidianmd/obsidian-sample-plugin)** - Template and reference
- **[Obsidian API Documentation](https://docs.obsidian.md/)** - Plugin API reference
- **[TypeScript Handbook](https://www.typescriptlang.org/docs/)** - TypeScript language reference
- **[ESLint Documentation](https://eslint.org/docs/)** - Linting rules and configuration

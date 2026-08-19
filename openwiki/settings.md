---
type: Reference
title: Plugin Settings Reference
description: Complete reference for all insert-verse plugin configuration options, including defaults, descriptions, and use cases.
tags: [obsidian, plugin, settings, configuration, reference]
openwiki:
  roles: [domain]
  source_paths: [src/main.ts, src/SlashSnippetSettingTab.ts]
---

# Plugin Settings Reference

This page documents all configuration options available in the insert-verse plugin settings panel.

## Settings Overview

The insert-verse plugin stores settings in Obsidian's plugin data storage and provides a comprehensive settings UI. All settings are optional and have sensible defaults.

### Accessing Settings

1. Open Obsidian **Settings** (Ctrl+, or Cmd+,)
2. Navigate to **Community Plugins**
3. Find **insert-verse** and click the gear icon
4. Adjust settings and changes are saved automatically

## Trigger Configuration

### Bible Trigger

| Property | Default | Type | Description |
|----------|---------|------|-------------|
| `bibleTrigger` | `!` | Single character | Character that activates Bible verse search |

**Use cases:**
- Search for verses by typing `!jhn 3` to find "John 3:16"
- Change to a different character if it conflicts with your workflow
- Setting to empty string disables Bible verse suggestions

**Validation:**
- Must be a single character
- Multi-character input is automatically truncated to the first character

### Snippet Trigger

| Property | Default | Type | Description |
|----------|---------|------|-------------|
| `slashTrigger` | `/` | Single character | Character that activates snippet search |

**Use cases:**
- Insert snippets by typing `/meet` to find "Meeting Template"
- Change to a different character (e.g., `;` or `:`) to avoid conflicts
- Setting to empty string disables snippet suggestions

**Validation:**
- Must be a single character
- Multi-character input is automatically truncated to the first character

**Note:** The `slashTrigger` was historically called "slash trigger" but now accepts any single character.

## Search Behavior

### Fuzzy Search

| Property | Default | Type | Description |
|----------|---------|------|-------------|
| `fuzzySearch` | `true` | Boolean | Enable fuzzy matching in search results |

**When enabled:**
- Characters of your query can be non-consecutive
- Example: `btn` matches `Button`, `bcn` matches `Bootstrap Column`
- More forgiving but may return unexpected results

**When disabled:**
- Query must appear as a continuous substring
- Example: `but` matches `Button` but `btn` does not
- More strict and predictable

**Performance:** Fuzzy matching has negligible performance impact even with hundreds of snippets.

### Highlight

| Property | Default | Type | Description |
|----------|---------|------|-------------|
| `highlight` | `true` | Boolean | Highlight matching characters in search results |

**When enabled:**
- Matched characters in snippet/verse names are visually highlighted
- Makes it clear which characters triggered the match
- Especially useful with fuzzy search enabled

**When disabled:**
- All results displayed as plain text
- Slightly faster rendering (minimal difference)

## Display Options

### Show File Path

| Property | Default | Type | Description |
|----------|---------|------|-------------|
| `showPath` | `false` | Boolean | Display full file path of snippets in suggestions |

**When enabled:**
- Snippet suggestions show the full path, e.g., `Snippets/notes/meeting.md`
- Useful when you have similarly named snippets in different folders

**When disabled:**
- Only the filename is shown, e.g., `meeting.md`
- Cleaner, less cluttered suggestions

### Show Snippet Content Preview

| Property | Default | Type | Description |
|----------|---------|------|-------------|
| `showFileContent` | `false` | Boolean | Display snippet content preview in suggestions |

**When enabled:**
- First 100-200 characters of snippet content shown below the filename
- Helps you identify the right snippet without opening it
- More visual noise in the suggestions dropdown

**When disabled:**
- Only filename shown
- Faster suggestion rendering

### Show Last Selected Text

| Property | Default | Type | Description |
|----------|---------|------|-------------|
| `showSelectedText` | `false` | Boolean | Display previously selected text in suggestions |

**When enabled:**
- If you selected text before triggering a snippet, the selected text is shown in suggestions
- Useful for remembering context
- Requires `maxSelectedTextLength` characters are captured

**When disabled:**
- Selected text not displayed in suggestions
- Text is still captured and can be inserted with `%%textSelection%%` placeholder

## Snippet Configuration

### Snippet Path

| Property | Default | Type | Description |
|----------|---------|------|-------------|
| `snippetPath` | `Snippets` | String (folder path) | Vault folder containing snippet files |

**Behavior:**
- Plugin recursively scans this folder and subfolders for `.md` files
- All `.md` files in this tree are treated as snippets
- Folder must exist; if it doesn't, no snippets will be found

**Examples:**
- `Snippets` - Use a root-level folder
- `Templates/Snippets` - Use a nested folder
- `_snippets` - Prefix with underscore to keep separate

**Performance:** With 1000+ snippets, there's a slight delay in the initial scan, but subsequent searches are fast.

### Ignore Properties (YAML Frontmatter)

| Property | Default | Type | Description |
|----------|---------|------|-------------|
| `ignoreProperties` | `true` | Boolean | Remove YAML frontmatter from snippets before insertion |

**When enabled:**
- Frontmatter (YAML between `---` markers) is stripped before insertion
- Useful if your snippets have metadata like `date:` or `tags:`
- Results in cleaner inserted content

**When disabled:**
- Entire file content including frontmatter is inserted
- Useful if frontmatter is part of the desired output (rare)

**Example:**
```yaml
---
category: meeting
created: 2024-01-15
---

## Meeting Notes

- Attendee 1
- Attendee 2
```

With `ignoreProperties: true`, only the content below the frontmatter is inserted.

## Advanced Features

### Templater Support

| Property | Default | Type | Description |
|----------|---------|------|-------------|
| `templaterSupport` | `true` | Boolean | Run Templater plugin on inserted snippets |

**When enabled:**
- After inserting a snippet, the plugin automatically:
  1. Saves the file
  2. Runs the Templater plugin's "Replace Templater in file" command
- Allows you to use Templater syntax in snippets (e.g., `<% tp.date.now() %>`)
- Requires the Templater plugin to be installed and enabled

**When disabled:**
- Snippets are inserted as-is without Templater processing
- Faster insertion but Templater macros won't be executed

**Prerequisites:**
- Install and enable the [Templater plugin](https://github.com/SilentVoid13/Templater)
- Templater must be configured to recognize your snippet files

### Placeholder: Cursor Position

| Property | Default | Type | Description |
|----------|---------|------|-------------|
| `cursorPositionString` | `%%cursor%%` | String | Placeholder text for final cursor position |

**Usage:**
- Place this string anywhere in your snippet
- After insertion, the cursor will be positioned at this location
- The placeholder text is removed and replaced with nothing (cursor-only)

**Example:**
```markdown
## Meeting: %%cursor%%

### Attendees

### Notes
```

After insertion, cursor is positioned at `## Meeting: ` ready for you to type the meeting name.

**Customization:**
- Change to any string (e.g., `<cursor>`, `[CURSOR]`)
- Avoid using strings that might appear in your content naturally

### Placeholder: Text Selection

| Property | Default | Type | Description |
|----------|---------|------|-------------|
| `textSelectionString` | `%%textSelection%%` | String | Placeholder text for previously selected content |

**Usage:**
- Place this string in your snippet where selected text should go
- Before inserting, select text in the editor
- The selected text replaces this placeholder upon insertion
- If no text was selected, placeholder is removed

**Example:**

Snippet content:
```markdown
> **Quote:** %%textSelection%%

— Author
```

Usage:
1. Select text: "Life is like a box of chocolates"
2. Trigger snippet with `/`
3. Result:
```markdown
> **Quote:** Life is like a box of chocolates

— Author
```

**Customization:**
- Change to any string (e.g., `<selected>`, `[TEXT]`)

### Max Selected Text Length

| Property | Default | Type | Description |
|----------|---------|------|-------------|
| `maxSelectedTextLength` | `50` | Number (characters) | Maximum length of selected text to capture and display |

**Behavior:**
- If you select more than this many characters, only the first N characters are captured
- Prevents extremely long selections from cluttering the UI
- Still captured for insertion even if preview is truncated

**Examples:**
- `50` - Capture up to 50 characters (default, fits most single lines)
- `200` - Capture up to 200 characters (good for short paragraphs)
- `1000` - Capture up to 1000 characters (for longer blocks)

## Settings Object Structure

For developers, the complete `SlashSnippetSettings` interface:

```typescript
interface SlashSnippetSettings {
    slashTrigger: string;              // Snippet trigger (default: "/")
    bibleTrigger: string;              // Bible verse trigger (default: "!")
    fuzzySearch: boolean;              // Enable fuzzy matching (default: true)
    highlight: boolean;                // Highlight matches (default: true)
    showPath: boolean;                 // Show file path (default: false)
    showFileContent: boolean;          // Show content preview (default: false)
    snippetPath: string;               // Snippets folder (default: "Snippets")
    ignoreProperties: boolean;         // Strip frontmatter (default: true)
    templaterSupport: boolean;         // Run Templater (default: true)
    textSelectionString: string;       // Selection placeholder (default: "%%textSelection%%")
    cursorPositionString: string;      // Cursor placeholder (default: "%%cursor%%")
    maxSelectedTextLength: number;     // Max selection capture (default: 50)
    showSelectedText: boolean;         // Show selected text preview (default: false)
}
```

## Recommended Configurations

### Minimal Setup
```yaml
- Disable Templater Support (if not using Templater)
- Disable Show File Content (cleaner UI)
- Keep all other defaults
```

### Advanced User
```yaml
- Enable Fuzzy Search (more flexible)
- Enable Highlight (clearer matches)
- Enable Show File Content (see what you're inserting)
- Disable Show Selected Text (unless you rely on it)
- Customize placeholders if you use special syntax
```

### Team/Shared Vault
```yaml
- Change Snippet Path to a team-shared folder
- Enable Show File Path (clarify which version you're using)
- Keep Templater Support enabled (good for automation)
```

## Troubleshooting

### Snippets Not Appearing

- Verify `snippetPath` points to a folder with `.md` files
- Restart Obsidian or use "Reload plugins" to refresh the snippet list
- Check that files are in the correct folder (use `showPath` to debug)

### Triggers Conflicting with Other Plugins

- Change `slashTrigger` or `bibleTrigger` to a different character
- Try `;`, `:`, `~`, or other less common characters

### Templater Not Running

- Ensure Templater plugin is installed and enabled
- Verify `templaterSupport` is `true` in settings
- Check Templater's own settings to confirm it's configured correctly

### Selected Text Not Working

- Enable `showSelectedText` to verify text is being captured
- Ensure you have text selected before triggering the snippet
- Check that `textSelectionString` placeholder is spelled correctly in your snippet

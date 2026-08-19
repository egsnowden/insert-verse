---
type: Guide
title: Creating and Using Snippets
description: Comprehensive guide for creating, organizing, and using snippets with the insert-verse plugin, including placeholder usage and advanced examples.
tags: [obsidian, plugin, snippets, templates, placeholders, workflow]
openwiki:
  roles: [domain]
  source_paths: [src/SlashSuggestions.ts, src/main.ts]
---

# Creating and Using Snippets

Snippets are reusable note templates that you can quickly insert into your notes using the insert-verse plugin. This guide walks you through creating snippets, organizing them, and using them effectively.

## Snippet Basics

### What Is a Snippet?

A snippet is a Markdown file (`.md`) stored in your snippet folder that contains reusable content. When you trigger the snippet command, the plugin searches for snippets by filename and inserts the content at your cursor.

### Creating Your First Snippet

1. **Create a folder** for snippets in your Obsidian vault (default: `Snippets`)
2. **Create a Markdown file** in that folder with your template content
   - Example: `Snippets/meeting-notes.md`
3. **Type the snippet trigger** (default: `/`) followed by a partial match
   - Example: `/meet` finds `meeting-notes.md`
4. **Select the snippet** from the dropdown
5. **Content is inserted** at your cursor position

### Simple Example

Create `Snippets/daily-log.md`:

```markdown
# Daily Log - 2024-01-15

## Tasks

- [ ] Task 1
- [ ] Task 2

## Notes

## Tomorrow

```

Usage: Type `/daily` and select `daily-log.md`. The template is inserted.

## File Organization

### Flat Structure

Store all snippets in one folder:

```
Snippets/
├── meeting-notes.md
├── daily-log.md
├── project-kickoff.md
├── book-review.md
└── recipe-template.md
```

**Pros:** Simple, quick to navigate
**Cons:** Can get crowded with many snippets

### Hierarchical Structure

Organize snippets into categories:

```
Snippets/
├── meetings/
│   ├── one-on-one.md
│   ├── team-standup.md
│   └── project-review.md
├── personal/
│   ├── daily-log.md
│   ├── weekly-review.md
│   └── book-review.md
├── work/
│   ├── project-kickoff.md
│   ├── bug-report.md
│   └── code-review.md
└── reference/
    ├── article-template.md
    └── bibliography.md
```

**Pros:** Organized, scalable, easier to find snippets
**Cons:** Slightly more complex folder structure

**Tip:** Use `showPath: true` in settings to see which folder each snippet is in when searching.

## Snippet Content

### Basic Snippet

A simple snippet with no special formatting:

```markdown
## Quick Notes

- Point 1
- Point 2
- Point 3
```

### Snippet with Structure

A template with sections:

```markdown
---
date: 2024-01-15
type: meeting
---

# Meeting: Project X

**Date:** January 15, 2024  
**Attendees:**  
**Location:** Zoom

## Agenda

- [ ] Topic 1
- [ ] Topic 2
- [ ] Topic 3

## Discussion

## Action Items

- [ ] Action 1 (assigned to: )
- [ ] Action 2 (assigned to: )

## Next Meeting

```

Note the frontmatter (YAML between `---`). If `ignoreProperties: true` is set, this will be removed before insertion.

## Placeholders

Placeholders are special strings in your snippet that control cursor positioning and text insertion.

### Cursor Placeholder

**Default:** `%%cursor%%`

Places your cursor at a specific location after insertion. The placeholder itself is removed.

#### Example 1: Position at Title

Create `Snippets/project-template.md`:

```markdown
# Project: %%cursor%%

## Overview

## Timeline

## Team
```

Usage:
1. Type `/project`
2. Select `project-template`
3. Cursor is positioned after "Project: " ready for you to type the name

Result:
```markdown
# Project: [cursor here]

## Overview

## Timeline

## Team
```

#### Example 2: Multiple Cursor Positions

Create `Snippets/email-template.md`:

```markdown
To: %%cursor%%

Subject: 

Dear [Name],

%%cursor%%

Best regards,
```

⚠️ **Note:** Only the first `%%cursor%%` placeholder is used. If you have multiple, only the first one positions the cursor. This is a limitation of the current implementation. To work around it, use `%%textSelection%%` for secondary positions or restructure your template.

### Text Selection Placeholder

**Default:** `%%textSelection%%`

Inserts previously selected text at this location.

#### Example 1: Quote Template

Create `Snippets/quote.md`:

```markdown
> **Quote**
>
> %%textSelection%%
>
> — %%cursor%%
```

Usage:
1. Select text: "The only way to do great work is to love what you do."
2. Type `/quote`
3. Select `quote`

Result:
```markdown
> **Quote**
>
> The only way to do great work is to love what you do.
>
> — [cursor here]
```

#### Example 2: Link with Selection

Create `Snippets/link-with-text.md`:

```markdown
[%%textSelection%%](%%cursor%%)
```

Usage:
1. Select text: "OpenWiki"
2. Type `/link`
3. Type the URL at the cursor

Result:
```markdown
[OpenWiki](https://example.com)
```

#### Example 3: Code Block

Create `Snippets/code-block.md`:

Create `Snippets/code-block.md`:

```markdown
\`\`\`%%cursor%%
%%textSelection%%
\`\`\`
```

Usage:
1. Select or type some code
2. Type `/code`
3. Cursor positioned at language specification

Result:
```markdown
\`\`\`javascript
const x = 42;
\`\`\`
```

### Disabling Placeholders

If your snippet naturally contains `%%cursor%%` or `%%textSelection%%` text (e.g., you're documenting these placeholders!), you can:

1. **Customize placeholder strings** in settings
   - Change `cursorPositionString` to something else like `<CURSOR>`
   - Change `textSelectionString` to something else like `<SELECTED>`

2. **Disable placeholder replacement** by not including them in your snippet

## Advanced Patterns

### Snippets with Templater Support

If you have the [Templater plugin](https://github.com/SilentVoid13/Templater) installed, you can use Templater syntax in snippets.

#### Example: Daily Log with Current Date

Create `Snippets/daily-log-templater.md`:

```markdown
# Daily Log - <% tp.date.now("YYYY-MM-DD") %>

## Tasks

- [ ] %%cursor%%

## Notes

## Tomorrow
```

With `templaterSupport: true`:
1. Insert the snippet
2. Plugin saves the file
3. Templater processes `<% tp.date.now(...) %>` and replaces it with today's date

#### Example: Meeting Notes with Timestamp

Create `Snippets/meeting-templater.md`:

```markdown
# Meeting - <% tp.date.now("YYYY-MM-DD HH:mm") %>

**Attendees:** %%cursor%%

## Notes

## Action Items
```

The timestamp is automatically filled in when inserted.

### Snippets with Conditional Content

Use Templater's conditional syntax:

```markdown
# Document

Created: <% tp.date.now("YYYY-MM-DD") %>

<% tp.file.title %>

%%cursor%%
```

### Multi-Part Snippets with Selection

Create a snippet that wraps selection with pre/post content:

Create `Snippets/highlight.md`:

```markdown
<mark>%%textSelection%%</mark>
```

Usage: Select text, type `/highlight`, and it's wrapped in highlight tags.

## Organization Tips

### Naming Conventions

Use consistent, searchable names:

```
good-names/
├── meeting-one-on-one.md        # Specific context
├── meeting-team-standup.md      # Searchable with "meeting" or "standup"
├── daily-log.md                  # Clear purpose
├── project-kickoff.md            # Easy to find with "project" or "kickoff"

poorly-named/
├── t1.md                         # Too vague
├── mtg.md                        # Abbreviation unclear
├── thing.md                      # Meaningless
```

**Tip:** Use `showPath: true` to see folder structure, but use descriptive filenames so fuzzy search works well.

### Prefix Patterns

Group related snippets with prefixes:

```
Snippets/
├── note-daily.md
├── note-weekly.md
├── note-monthly.md
├── meet-1-1.md
├── meet-standup.md
├── meet-kickoff.md
├── project-template.md
├── project-postmortem.md
```

Then search:
- `/note` finds all note templates
- `/meet` finds all meeting templates
- `/project` finds all project templates

### Frequently Used Snippets

Put your most-used snippets at the top level:

```
Snippets/
├── daily-log.md                  # Use frequently
├── quick-note.md                 # Use frequently
├── archive/                      # Old, rarely used
│   ├── old-template.md
│   └── deprecated.md
└── work/                          # Project specific
    └── work-log.md
```

The plugin's "last used" feature automatically ranks frequently inserted snippets first.

## Workflow Examples

### Daily Note Workflow

1. Create `Snippets/daily-log.md`:
   ```markdown
   # Daily Log - <% tp.date.now("YYYY-MM-DD") %>
   
   ## Todo
   
   - [ ] %%cursor%%
   
   ## Notes
   ```

2. Each morning, type `/daily` and insert the template
3. The date is auto-filled by Templater
4. Cursor is positioned ready for you to add your first task

### Meeting Note Workflow

1. Create `Snippets/meeting-template.md`:
   ```markdown
   # Meeting: %%cursor%%
   
   **Date:** <% tp.date.now("YYYY-MM-DD") %>  
   **Attendees:** 
   
   ## Agenda
   
   ## Discussion
   
   ## Action Items
   
   - [ ]
   ```

2. In your meeting note, type `/meet` and select `meeting-template`
3. Template inserts with date auto-filled
4. Cursor positioned at meeting title

### Code Documentation Workflow

1. Create `Snippets/function-docs.md`:
   ```markdown
   ```typescript
   %%cursor%%
   ```
   
   **Parameters:**
   
   **Returns:**
   
   **Example:**
   ```

2. Select the function code you want to document
3. Type `/func` but don't select the template yet
4. Your code is in the editor, ready to paste into the template

### Reference Workflow

1. Create `Snippets/bibliography-entry.md`:
   ```markdown
   **%%cursor%%**
   
   [Link](%%cursor%%)
   
   Notes: %%textSelection%%
   ```

2. Copy a reference title
3. Type `/bib` to insert
4. Cursor positioned for the title

## Best Practices

### Keep Snippets Focused

Each snippet should solve one problem. Avoid "mega templates" that do everything.

### Use Frontmatter for Metadata

Store snippet metadata in YAML frontmatter:

```markdown
---
category: meetings
created: 2024-01-10
updated: 2024-01-15
tags: [agile, standup]
---

# Team Standup

...
```

With `ignoreProperties: true`, the frontmatter is removed on insertion, but Obsidian can still index it.

### Test Placeholders

Before relying on a snippet, test the placeholders:
1. Create the snippet
2. Insert it in a test note
3. Verify cursor positioning and text selection work as expected

### Version Your Snippets

If you frequently update snippets, keep old versions:

```
Snippets/
├── daily-log-v1.md              # Old version
├── daily-log-v2.md              # Current version
```

This lets you revert if needed, or use different versions for different contexts.

### Share Snippets

Consider sharing useful snippets with your team by committing them to a shared repository or documentation.

## Troubleshooting

### Placeholder Not Working

- **Check spelling:** Default is `%%cursor%%` and `%%textSelection%%`, not variations
- **Check settings:** Verify placeholder strings in settings match what's in your snippet
- **Only first cursor used:** Multiple `%%cursor%%` placeholders only position at the first one

### Selected Text Not Inserting

- **Text must be selected:** You need to select text before triggering the snippet
- **Check placeholder name:** Default is `%%textSelection%%`
- **Check length:** If selection is longer than `maxSelectedTextLength`, it's truncated but still inserted

### Templater Not Processing

- **Enable Templater support:** Check `templaterSupport: true` in settings
- **Install Templater plugin:** The Templater plugin must be installed in your vault
- **Check Templater syntax:** Verify syntax matches `<% ... %>` format (not `{{ ... }}`)

### Snippet Folder Not Found

- **Verify folder exists:** Create `Snippets/` folder in vault root if it doesn't exist
- **Check folder path:** Use `showPath: true` to debug which folder is being scanned
- **Restart Obsidian:** After creating the folder, reload plugins or restart Obsidian

---
type: Getting Started Guide
title: Insert Verse Plugin - Quick Start
description: Get started with the insert-verse Obsidian plugin for inserting Bible verses and snippets into notes using keyboard triggers.
tags: [obsidian, plugin, bible-verses, snippets, trigger]
---

# Insert Verse Plugin Quick Start

**insert-verse** is an Obsidian plugin that allows you to quickly insert Bible verses and reusable snippet content into your notes using keyboard triggers.

## Features at a Glance

- **Bible Verse Insertion**: Trigger Bible verse suggestions with a configurable character (default: `!`)
- **Snippet Management**: Insert reusable templates from a designated snippet folder using a trigger (default: `/`)
- **Fuzzy Search**: Find snippets and verses by typing partial matches
- **Smart Cursor Placement**: Position your cursor or insert selected text automatically after snippet insertion
- **Templater Support**: Integrate with the Templater plugin for advanced template processing
- **Highlighting**: Visual highlighting of matched characters in search results

## Installation

This plugin is available in the Obsidian Community Plugins catalog. You can also build from source:

```bash
npm install
npm run build
```

The compiled plugin bundle is generated as `main.js`.

## Basic Usage

### Insert Bible Verses

1. In any note, type the Bible trigger character (default: `!`) followed by your search query
2. Example: `!jhn 3` will match "John 3:16"
3. Select from the dropdown suggestions to insert the verse

### Insert Snippets

1. Create a folder for your snippets (default: `Snippets`)
2. Add Markdown files to this folder
3. In a note, type the snippet trigger (default: `/`) followed by the snippet name
4. Example: `/meet` will find a snippet file named "Meeting Template"
5. The snippet content is inserted at your cursor position

## Configuration

Open the plugin settings to customize:

- **Bible trigger**: Character that activates Bible verse search (default: `!`)
- **Slash trigger**: Character that activates snippet search (default: `/`)
- **Snippet path**: Folder containing your snippet files (default: `Snippets`)
- **Fuzzy Search**: Enable fuzzy matching for easier searching
- **Highlight**: Show visual highlighting for matched characters
- **Templater support**: Enable integration with the Templater plugin
- **Show file content**: Preview snippet content in search results
- **Show last selected text**: Display previously selected text in suggestions

## Advanced Features

### Cursor Positioning

Use placeholder variables in your snippet files to control cursor placement:

- `%%cursor%%`: Position cursor at this location after insertion
- `%%textSelection%%`: Insert previously selected text at this location

### Frontmatter Handling

By default, YAML frontmatter (properties) in snippet files is removed before insertion. Disable "Ignore properties" in settings to include it.

### Last-Used Snippets

When you search without a query (just press the trigger), you'll see your most recently used snippets ranked by last-used timestamp.

## Example Workflow

1. Create a snippet file at `Snippets/meeting-notes.md`:
   ```
   ---
   date: 
   ---
   
   ## Meeting: %%cursor%%
   
   ### Attendees
   
   ### Agenda
   
   ### Notes
   ```

2. In a new note, type `/meet` and select "meeting-notes"
3. The snippet inserts and your cursor is positioned at the first `%%cursor%%` placeholder

## Learn More

### User Guides

- **[Creating and Using Snippets](/openwiki/snippets-guide.md)** — Comprehensive guide for building effective snippets, organizing them, and using placeholders
- **[Bible Verse Insertion](/openwiki/bible-verses-guide.md)** — Search patterns, database information, and Bible study workflows
- **[Plugin Settings Reference](/openwiki/settings.md)** — Complete reference for all configuration options
- **[Common Workflows](/openwiki/workflows.md)** — Step-by-step examples for daily notes, meetings, Bible study, and more
- **[Troubleshooting & FAQ](/openwiki/troubleshooting.md)** — Solutions for common problems and frequently asked questions

### Technical Documentation

- **[Architecture Overview](/openwiki/architecture/overview.md)** — System design, component relationships, and data flows
- **[Source Code Map](/openwiki/source-code-map.md)** — Complete reference to all modules and classes
- **[Building and Development](/openwiki/development.md)** — Development setup and contribution guidelines

---
okf_version: "0.1"
---

# insert-verse Plugin Wiki

Welcome to the insert-verse plugin documentation. This is a comprehensive reference for understanding, building, and extending the Obsidian plugin that enables quick insertion of Bible verses and reusable snippets into notes.

## About This Project

**insert-verse** is an Obsidian plugin that lets you quickly insert Bible verses and snippet templates into notes using configurable keyboard triggers. It combines a Bible verse database (New World Translation) with a flexible snippet management system for reusable note templates.

### Key Capabilities

- **Bible Verse Insertion**: Trigger Bible verse suggestions with a configurable character (default: `!`)
- **Snippet Management**: Insert reusable templates from a snippet folder using a configurable trigger (default: `/`)
- **Fuzzy Search**: Find snippets and verses by typing partial matches
- **Smart Placeholders**: Use `%%cursor%%` and `%%textSelection%%` to control cursor positioning and text insertion
- **Templater Integration**: Automatically run the Templater plugin on inserted snippets
- **Last-Used Ranking**: Quickly access your most recently used snippets

## Documentation Structure

### Getting Started

- **[Quick Start](/openwiki/quickstart.md)** — Installation, setup, and basic usage guide
- **[Troubleshooting & FAQ](/openwiki/troubleshooting.md)** — Common problems, solutions, and frequently asked questions
- **[Documentation Structure](/openwiki/doc-structure.md)** — How the wiki is organized and how to navigate it

### User Guides

- **[Creating and Using Snippets](/openwiki/snippets-guide.md)** — Comprehensive guide for snippet creation, organization, and advanced patterns including placeholders and Templater integration
- **[Bible Verse Insertion](/openwiki/bible-verses-guide.md)** — Search patterns, verse database information, and workflow examples for Bible verse insertion
- **[Plugin Settings Reference](/openwiki/settings.md)** — Complete reference for all configuration options with descriptions and recommendations
- **[Common Workflows](/openwiki/workflows.md)** — 7 detailed step-by-step examples for daily notes, meetings, Bible study, code documentation, and more

### Technical Documentation

- **[Architecture Overview](/openwiki/architecture/overview.md)** — System design, component relationships, and data flow diagrams
- **[Source Code Map](/openwiki/source-code-map.md)** — Complete reference to all modules, classes, methods, and type definitions
- **[Building and Development](/openwiki/development.md)** — Setup, build process, development workflow, and contribution guidelines

## Quick Navigation by Role

### I'm a New User

1. Read [Quick Start](/openwiki/quickstart.md) for installation and basic setup
2. Follow [Creating and Using Snippets](/openwiki/snippets-guide.md) to get productive
3. Explore [Bible Verse Insertion](/openwiki/bible-verses-guide.md) for verse usage
4. Check [Troubleshooting & FAQ](/openwiki/troubleshooting.md) for help

### I'm Configuring the Plugin

1. Review [Plugin Settings Reference](/openwiki/settings.md) for all options
2. Check [Troubleshooting & FAQ](/openwiki/troubleshooting.md) for configuration issues
3. Reference [Creating and Using Snippets](/openwiki/snippets-guide.md) for advanced setup

### I'm a Developer

1. Start with [Architecture Overview](/openwiki/architecture/overview.md) to understand design
2. Review [Source Code Map](/openwiki/source-code-map.md) for code structure
3. Follow [Building and Development](/openwiki/development.md) for setup and workflow
4. Check individual [Architecture](/openwiki/architecture/overview.md) pages for deep dives

## Quick Reference

### Default Triggers

- **Snippet trigger:** `/` (type `/` followed by snippet name)
- **Bible verse trigger:** `!` (type `!` followed by verse query)

### Common Placeholders

- **`%%cursor%%`** — Positions cursor at this location after insertion
- **`%%textSelection%%`** — Inserts previously selected text at this location

### Top Features

| Feature | Usage | Learn More |
|---------|-------|-----------|
| Quick snippet insertion | Type `/` + snippet name | [Snippets Guide](/openwiki/snippets-guide.md) |
| Bible verse lookup | Type `!` + verse ref | [Bible Verses Guide](/openwiki/bible-verses-guide.md) |
| Fuzzy search | Enable in settings | [Settings](/openwiki/settings.md) |
| Auto cursor placement | Use `%%cursor%%` placeholder | [Snippets Guide](/openwiki/snippets-guide.md) |
| Selected text insertion | Use `%%textSelection%%` | [Snippets Guide](/openwiki/snippets-guide.md) |
| Templater integration | Enable in settings | [Settings](/openwiki/settings.md) |

## Project Statistics

- **Main source files:** 5 TypeScript modules
- **Bible database:** ~4.8 MB (New World Translation)
- **Default configuration:** 12 settings with sensible defaults
- **Supported:** Obsidian on Windows, macOS, Linux

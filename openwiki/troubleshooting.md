---
type: Guide
title: Troubleshooting and FAQ
description: Common problems, solutions, and frequently asked questions about the insert-verse plugin, including plugin setup, search issues, and advanced configuration.
tags: [obsidian, plugin, troubleshooting, faq, help, debugging]
openwiki:
  roles: [operations, domain]
---

# Troubleshooting and FAQ

This guide helps you solve common problems and answers frequently asked questions about the insert-verse plugin.

## Installation and Setup

### Q: How do I install the plugin?

**A:** The plugin is available in the Obsidian Community Plugins catalog:

1. Open Obsidian **Settings** (Ctrl+, or Cmd+,)
2. Go to **Community Plugins**
3. Click **Browse**
4. Search for **insert-verse**
5. Click **Install**
6. Click **Enable**

Alternatively, build from source:
```bash
git clone https://github.com/obsidianmd/obsidian-sample-plugin
cd insert-verse
npm install
npm run build
```

### Q: I don't see the plugin in the Community Plugins list

**A:** Check these steps:

1. Ensure you have **Community Plugins** enabled in your vault
   - **Settings → Community Plugins → Enable Community Plugins**
2. Search by exact name: **insert-verse**
3. If still not found:
   - Restart Obsidian
   - Check your internet connection
   - Try again in a few minutes (list may be updating)

### Q: The plugin appears installed but not working

**A:** Try these fixes:

1. **Reload plugins:**
   - **Settings → Community Plugins → Manage plugins** (gear icon)
   - Scroll to find insert-verse
   - Toggle OFF then ON

2. **Restart Obsidian completely**

3. **Check plugin is enabled:**
   - **Settings → Community Plugins → Manage plugins**
   - Ensure insert-verse has a checkmark

4. **Check for conflicts:**
   - Temporarily disable other plugins
   - Re-enable insert-verse
   - Test if issue persists

## Snippet Issues

### Q: I created snippet files but they don't appear in searches

**A:** Check these common issues:

**1. Wrong folder location**
- Verify snippet files are in the configured snippet folder (default: `Snippets`)
- Check **Settings → Plugin → insert-verse → Snippet path**
- Enable `showPath` to see which folders are being scanned

**2. Folder doesn't exist**
- Create the `Snippets` folder in your vault root
- If it doesn't exist, the plugin won't find snippets

**3. Files not synced yet**
- If using Obsidian Sync or local sync, wait for files to sync
- Restart Obsidian after creating new snippet files

**4. Wrong file extension**
- Ensure files are `.md` (Markdown)
- Not `.txt`, `.txt.md`, or other extensions

**5. Reload the plugin**
- **Settings → Community Plugins → Manage**
- Toggle the plugin OFF then ON

### Q: Snippet inserts at wrong location or duplicated text

**A:** This usually happens with cursor positioning:

1. **Multiple `%%cursor%%` placeholders:** Only the first one is used
   - If you have multiple cursors, only the first is positioned
   - Use snippets with a single cursor location

2. **Text not fully replaced:** 
   - Ensure placeholders are typed correctly (case-sensitive)
   - Default: `%%cursor%%` and `%%textSelection%%`
   - Check settings if you customized them

3. **Templater conflicts:**
   - If using Templater, it may also process text
   - Disable `templaterSupport` to isolate issue
   - Test with `templaterSupport: false`

### Q: Selected text isn't inserting into `%%textSelection%%`

**A:** Check these:

1. **Text must be selected before snippet trigger**
   - Select text
   - THEN type the snippet trigger
   - If you type the trigger first, no text is selected

2. **Selection too long**
   - If selection exceeds `maxSelectedTextLength` (default: 50 chars)
   - It's truncated but still inserted
   - Increase `maxSelectedTextLength` in settings if needed

3. **Placeholder name mismatch**
   - Check settings for `textSelectionString`
   - Verify it matches text in your snippet
   - Default: `%%textSelection%%`

4. **Selection lost on trigger**
   - Some editors clear selection on trigger character
   - Plugin should capture text when trigger replaces selection
   - If not working, you may need to use a different trigger character

### Q: Snippet folder shows "not found" or errors

**A:** The folder path issue:

1. **Create the folder if it doesn't exist**
   ```
   Vault Root/
   └── Snippets/         ← Create this folder
   ```

2. **Use correct path in settings**
   - Navigate to path: use forward slashes `/`
   - Example: `Snippets/meetings` not `Snippets\meetings`

3. **Check folder permissions**
   - Ensure you have read/write permissions
   - On Windows, check antivirus isn't blocking folder access

4. **Restart Obsidian**
   - Sometimes the vault index needs refreshing

## Search and Matching

### Q: My search query doesn't return any results

**A:** Fuzzy matching requires careful query structure:

**For snippets:**
- All query characters must appear in snippet filename
- Example: `btn` matches `Button` but `nbt` doesn't
- Try shorter queries: instead of `/button template`, try `/button`

**For Bible verses:**
- All query characters must appear in verse reference
- Example: `jhn 3` matches `John 3:16`, not `Jhn 3` (case-insensitive match)
- Try abbreviations: `jhn`, `jn`, `john` (one may work better)

**General debugging:**
- Enable `highlight: true` in settings to see which characters matched
- Try searching with just the book name
- Check for typos in query

### Q: Fuzzy matching isn't working as expected

**A:** Character order matters:

**Query characters must appear in sequence:**
- `btn` matches `Button` ✓
- `button` doesn't match `btn` ✗
- `tub` doesn't match `Button` ✗ (wrong order)

**Disable fuzzy if you want substring matching:**
1. **Settings → insert-verse**
2. Toggle `Fuzzy Search` OFF
3. Now `button` only matches if it's a substring

### Q: Verses not appearing in Bible search

**A:** Check these:

1. **Bible trigger not set correctly**
   - Default: `!`
   - Check settings if changed
   - Try: `!jhn 3:16`

2. **Verse not in database**
   - Database only includes New World Translation
   - Not all verses may be indexed
   - Try different verse references

3. **Typo in book abbreviation**
   - `jhn` (correct) vs `john` (may not work)
   - `ps` vs `psa` (both may work)
   - Try variations

4. **Character order in query**
   - Query: `3 jhn` (wrong order)
   - Should be: `jhn 3` (book then chapter)

## Performance

### Q: Plugin is slow or unresponsive

**A:** Performance troubleshooting:

1. **Too many snippets**
   - If you have 1000+ snippets, initial search may be slow
   - Organize into folders
   - Remove unused snippets

2. **Large snippet files**
   - If snippets are very large, reading may be slow
   - Split into smaller templates
   - Disable `showFileContent` if showing content is slow

3. **Templater processing**
   - If Templater is slow, disable `templaterSupport`
   - Or check Templater plugin performance

4. **Bible verse database loading**
   - First load of verses (4.8 MB) may take a second
   - Subsequent searches are fast
   - Database is cached after initial load

**Fix:**
- Disable features you don't use
- Reduce number of snippets or organize them
- Restart Obsidian to clear caches

### Q: Search results take long to appear

**A:** Caused by:

1. **Highlighting enabled**
   - Positions calculation adds slight overhead
   - Try disabling `highlight: true`

2. **Many files being scanned**
   - Organize snippets into folders
   - Reduce number of snippets

3. **Large vault**
   - Plugin scans vault for snippets on load
   - May take longer if vault is very large

## Settings and Configuration

### Q: I want to use a different trigger character

**A:** Change in settings:

1. **Settings → Community Plugins → insert-verse**
2. Change `Snippet trigger` or `Bible trigger`
3. Use any single character: `/`, `!`, `;`, `:`, `~`, etc.
4. Avoid characters that conflict with other plugins

**Common choices:**
- Snippets: `/` (default), `;`, `:`, `~`
- Bible verses: `!` (default), `@`, `#`

### Q: Placeholder characters don't work in my snippets

**A:** Check these:

1. **Exact spelling required**
   - Default: `%%cursor%%` (not `%%Cursor%%` or `% cursor %`)
   - Case-sensitive

2. **Check settings**
   - **Settings → insert-verse**
   - Verify `cursorPositionString` and `textSelectionString` values
   - Match exactly what's in your snippet

3. **Customize placeholder strings**
   - Change to something unique if needed
   - Example: `<CURSOR>` or `[CURSOR]`
   - Update your snippets to use new placeholder

### Q: How do I disable the Bible verse feature?

**A:** Set the Bible trigger to an empty string:

1. **Settings → insert-verse**
2. Set `Bible trigger` to empty
3. Bible suggestions no longer appear

Or disable entirely:
- Create a snippet that shadows the feature
- Or request a setting to disable in plugin preferences

### Q: Templater is not running on inserted snippets

**A:** Check these:

1. **Templater plugin installed**
   - Install [Templater plugin](https://github.com/SilentVoid13/Templater)
   - Enable it in **Community Plugins**

2. **`templaterSupport` enabled**
   - **Settings → insert-verse**
   - Ensure `Templater support` is toggled ON

3. **Snippets don't contain Templater syntax**
   - Templater only processes `<% ... %>` syntax
   - If snippet has no Templater commands, nothing happens
   - Add Templater syntax to snippet, e.g., `<% tp.date.now() %>`

4. **Templater permissions**
   - Ensure Templater has permission to process your snippets
   - Check Templater settings for folder filters

5. **File saving issue**
   - Plugin saves file before running Templater
   - If file save fails, Templater won't run
   - Check vault permissions

## Advanced Issues

### Q: I want to use a custom Bible translation

**A:** Replace the verses database:

1. **Create a JSON file** with verses
   ```json
   {
     "Matthew 5:3": "Blessed are the poor in spirit...",
     "John 3:16": "For God so loved the world..."
   }
   ```

2. **Replace `src/nwt_verses.json`**

3. **Rebuild the plugin:**
   ```bash
   npm run build
   ```

4. **Reload in Obsidian**

**Sources for Bible data:**
- Open Bible API
- Bible.com API (requires key)
- Local markdown Bible resources
- Always verify copyright permissions

### Q: Cursor positioning not working with multiple snippets

**A:** Each snippet can only have ONE cursor position:

**Problem:**
```markdown
# Title: %%cursor%%

Body: %%cursor%%    ← Only first is used
```

**Solution:** Restructure snippet to put cursor where you most need it:
```markdown
# Title: %%cursor%%

Body: [add content here manually]
```

Or create multiple snippets for different contexts.

### Q: Fuzzy search matching inconsistent between snippets and Bible

**A:** The algorithms are slightly different:

**Snippets:** 
- Returns matching character positions (for highlighting)
- Scores based on whether match starts with query
- Returns all matches, sorted by score

**Bible verses:**
- Returns simple boolean (match or no match)
- No scoring or sorting
- Used primarily for filtering

This is expected behavior due to different use cases.

### Q: Plugin conflicts with other plugins

**A:** Try these isolation steps:

1. **Identify the conflicting plugin**
   - Disable insert-verse
   - Enable other plugins one by one
   - Re-enable insert-verse
   - Find which plugin causes conflict

2. **Change trigger characters**
   - Conflict likely due to trigger character
   - Change snippet trigger to `;` or `:`
   - Change Bible trigger to `@` or `#`

3. **Disable conflicting features**
   - If snippet suggestions conflict, disable them
   - If Bible suggestions conflict, disable them
   - Use non-conflicting triggers

4. **Load order matters**
   - Try disabling and re-enabling conflicting plugin
   - Restart Obsidian
   - Check if issue persists

## Reporting Issues

### Q: How do I report a bug?

**A:** Provide detailed information:

1. **Plugin version:**
   - Check in **Settings → Community Plugins**
   - Note the version number

2. **Obsidian version:**
   - Check in **Settings → About**
   - Note the version

3. **Operating system:**
   - Windows, macOS, Linux, or mobile

4. **Steps to reproduce:**
   - Exactly what you did when issue occurred
   - What you expected vs. what happened

5. **Error messages:**
   - Open DevTools: **Ctrl+Shift+I**
   - Copy any error messages
   - Screenshots helpful

6. **Example snippet or verse query:**
   - Provide specific example that fails

Post to the plugin's GitHub issues page with this information.

## Performance Tips

### Tips for Faster Searches

1. **Organize snippets into folders**
   - Instead of 100 files in `Snippets/`
   - Use `Snippets/meetings/`, `Snippets/personal/`, etc.

2. **Use specific search queries**
   - Instead of `/s` (matches everything starting with s)
   - Use `/snippet-name` (narrows results)

3. **Disable highlighting if not using**
   - Turn off `highlight: true` in settings
   - Saves slight processing time

4. **Disable content preview if not using**
   - Turn off `showFileContent: true` in settings
   - Faster rendering

### Tips for Better Workflow

1. **Use last-used ranking**
   - Frequently used snippets appear first
   - Just press trigger to see most-used snippets

2. **Name snippets consistently**
   - Use prefixes: `meet-1-1`, `meet-standup`, etc.
   - Search becomes predictable

3. **Create macro snippets**
   - One snippet that inserts multiple templates
   - Or create a snippet folder index

4. **Use fuzzy search effectively**
   - Learn abbreviations: `btn` for "Button", `mtg` for "Meeting"
   - Keep query short: 2-3 characters

## Getting Help

- **[Plugin GitHub](https://github.com/obsidianmd/obsidian-sample-plugin)** - Report issues
- **[Obsidian Forum](https://forum.obsidian.md/)** - Community support
- **[Obsidian Discord](https://discord.com/invite/veuasXQ)** - Chat with community
- **[Plugin Documentation](/openwiki/)** - Full wiki

## Common Workflows

### Quick Note Taking
1. Press `/` + `note` to insert daily template
2. Cursor positioned at title
3. Add content

### Bible Study
1. Search `/jhn 3:16` for John 3:16
2. Verse inserts with reference and text
3. Add notes below verse

### Meeting Notes
1. Press `/` + `meet` for meeting template
2. Select meeting date from snippet
3. Fill in attendees and notes

### Document Assembly
1. Insert multiple snippets to build document
2. Use snippets as building blocks
3. Rearrange as needed

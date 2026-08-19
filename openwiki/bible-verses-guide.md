---
type: Guide
title: Bible Verse Insertion Guide
description: Guide for using the Bible verse insertion feature, including search patterns, fuzzy matching, and verse database information.
tags: [obsidian, plugin, bible-verses, verses, search]
openwiki:
  roles: [domain]
  source_paths: [src/BibleVerses.ts, src/BibleVerseSuggestions.ts]
---

# Bible Verse Insertion Guide

The insert-verse plugin includes a Bible verse database with quick access to verses using intelligent search. This guide covers how to search, insert, and use Bible verses effectively.

## Quick Start

1. **Open any note** in Obsidian
2. **Type the Bible trigger** (default: `!`)
3. **Type your search query** (e.g., `jhn 3`, `genesis 1`, `psalm 23`)
4. **Select a verse** from the dropdown
5. **The verse is inserted** with the reference and full text

### Example

Type: `!jhn 3:16`

Result: `John 3:16 For God so loved the world that he gave his only-begotten Son...`

## Verse Database

### Data Source

The plugin includes the **New World Translation (NWT)** Bible:
- **Translation:** New World Translation of the Holy Scriptures
- **File:** `src/nwt_verses.json`
- **Size:** ~4.8 MB
- **Format:** JSON object with verse references as keys and verse text as values

### Supported Books

The database includes all 66 books of the Bible:

**Old Testament (39 books):**
Genesis, Exodus, Leviticus, Numbers, Deuteronomy, Joshua, Judges, Ruth, 1 Samuel, 2 Samuel, 1 Kings, 2 Kings, 1 Chronicles, 2 Chronicles, Ezra, Nehemiah, Esther, Job, Psalms, Proverbs, Ecclesiastes, Song of Solomon, Isaiah, Jeremiah, Lamentations, Ezekiel, Daniel, Hosea, Joel, Amos, Obadiah, Jonah, Micah, Nahum, Habakkuk, Zephaniah, Haggai, Zechariah, Malachi

**New Testament (27 books):**
Matthew, Mark, Luke, John, Acts, Romans, 1 Corinthians, 2 Corinthians, Galatians, Ephesians, Philippians, Colossians, 1 Thessalonians, 2 Thessalonians, 1 Timothy, 2 Timothy, Titus, Philemon, Hebrews, James, 1 Peter, 2 Peter, 1 John, 2 John, 3 John, Jude, Revelation

## Search Patterns

### Fuzzy Character Matching

The Bible verse search uses fuzzy matching where every character of your query must appear in order in the verse reference.

#### Example Searches

| Query | Matches | Notes |
|-------|---------|-------|
| `jhn 3` | John 3:1, John 3:16, etc. | Characters j-h-n-3 match in order |
| `genesis 1` | Genesis 1:1, Genesis 1:27, etc. | Matches first book and chapter 1 |
| `ps 23` | Psalm 23:1, Psalm 23:4, etc. | "ps" matches "Psalm", "23" matches chapter |
| `mt 6:11` | Matthew 6:11 | Matches Matthew chapter 6 verse 11 |
| `jn 11` | John 11:25, John 11:35, etc. | Note: "jn" for John (some call it John, Jn abbreviated) |
| `rom 3:23` | Romans 3:23 | Complete reference match |
| `1 cor 13` | 1 Corinthians 13:1, 1 Corinthians 13:4-7, etc. | Numbered epistles work |
| `1 jn 1:9` | 1 John 1:9 | First John (numbered) |

### Case Sensitivity

Search is **case-insensitive**. These are all equivalent:
- `jhn 3`
- `JHN 3`
- `Jhn 3`

### Partial Matches

You don't need the complete reference. Just enough characters to identify the verse:

| Query | Will Find |
|-------|-----------|
| `jhn` | All John references |
| `m` | Matthew, Mark, Malachi, Micah, etc. |
| `p` | Psalm, Proverbs, Peter, Philippians, etc. |
| `gen 1:1` | Genesis 1:1 exactly |
| `gen 1` | Genesis 1:1, Genesis 1:2, ... Genesis 1:31 |

## Common Verse Searches

### Popular Passages

| Description | Search | Verse |
|-------------|--------|-------|
| The Lord's Prayer | `mt 6:9` | Matthew 6:9-13 |
| John 3:16 | `jhn 3:16` | John 3:16 |
| Psalm 23 | `ps 23` | Psalm 23:1 or any verse in Psalm 23 |
| Love passage | `1 cor 13` | 1 Corinthians 13:4-7 |
| Faith passage | `heb 11:1` | Hebrews 11:1 |
| Jesus's greatest command | `mt 22:37` | Matthew 22:37-40 |

### Book Abbreviations

Many search queries use abbreviations. Here are common ones:

| Book | Abbreviations | Examples |
|------|----------------|----------|
| Genesis | gen | `gen 1`, `gen 1:1` |
| Exodus | ex | `ex 3:14` |
| Psalms | ps, psa | `ps 23`, `psa 119` |
| Matthew | mt, mat | `mt 5:3`, `mat 6:9` |
| Mark | mk, mar | `mk 15:34` |
| Luke | lk, lu | `lk 15:11` |
| John | jn, jhn, john | `jhn 3:16`, `jn 1:1` |
| Romans | rom | `rom 3:23` |
| 1 Corinthians | 1 cor, 1cor | `1 cor 13:4` |
| Galatians | gal | `gal 5:22` |
| Ephesians | eph | `eph 6:10` |
| Philippians | phil, php | `phil 4:8` |
| Colossians | col | `col 1:15` |
| 1 Thessalonians | 1 thess | `1 thess 5:17` |
| Timothy | tim, 1 tim, 2 tim | `1 tim 6:10` |
| Hebrews | heb | `heb 11:1` |
| James | jas, jam | `jas 1:22` |
| 1 Peter | 1 pet, 1 peter | `1 pet 1:3` |
| 1 John | 1 jn, 1 john | `1 jn 1:9` |
| Revelation | rev | `rev 3:20` |

**Note:** These are suggestions based on common usage. The exact abbreviations that work depend on how they appear in the database. Try variations if your search doesn't work.

## Verse Reference Format

Verse references follow standard Biblical notation:

### Single Verse

```
Book Chapter:Verse
```

Examples:
- `John 3:16`
- `Psalm 23:1`
- `Matthew 5:3`

### Chapter Range

```
Book Chapter
```

Examples:
- `Genesis 1` - All verses in Genesis 1
- `John 3` - All verses in John 3
- `Psalm 23` - All verses in Psalm 23

### Verse Range (within a chapter)

```
Book Chapter:Verse-Verse
```

Examples:
- `1 Corinthians 13:4-7` - Verses 4 through 7
- `Matthew 6:9-13` - The Lord's Prayer
- `John 11:35-44` - Jesus weeping to resurrection

### Multiple Verses

Some entries may include multiple related verses:

Examples:
- `Matthew 6:9-13` - Full Lord's Prayer
- `1 John 1:9` - Confession of sins

## Using Verses in Notes

### Inline Quotes

Insert verses directly in your prose:

```markdown
Jesus taught us to pray: John 3:16 For God so loved the world that he gave 
his only-begotten Son... This demonstrates God's love for humanity.
```

### Verse Collections

Gather related verses in a note:

```markdown
# God's Love

- John 3:16 For God so loved the world...
- 1 John 4:8 God is love
- Romans 5:8 But God demonstrates his own love...
```

Usage: Type `/verse` before each quote to insert quickly with consistent formatting.

### Study Notes

Combine verses with analysis:

```markdown
# Study: The Last Supper

## Institution

Matthew 26:26-29 And while they were eating...

## Meaning

The breaking of bread represents Jesus's body...

## Reflection

Why did Jesus choose bread and wine as symbols?
```

### Bible Study Snippets

Create snippet templates that include verses:

Create `Snippets/verse-analysis.md`:

```markdown
## Verse: %%cursor%%

**Reference:** 

**Text:** 

**Context:** 

**Analysis:** 

**Personal Reflection:**
```

Then insert and fill in the details.

## Workflow Examples

### Daily Verse Study

1. Search a verse with a thought-provoking topic: `/jhn 3`
2. Select `John 3:16` (or browse other verses)
3. Copy the full verse with reference
4. Create a reflection note
5. Study the verse in context

### Scripture Memory

Create a study snippet:

Create `Snippets/memory-verse.md`:

```markdown
# Memory Verse

**Reference:** %%cursor%%

**Text:** 

**Notes for Memorization:**
```

1. Type `/memory`
2. Add the verse reference
3. Insert the verse text
4. Add memorization notes

### Topical Study

Search for related verses:

1. Search `love` variations: try `1 jn 4`, `jhn 3`, `rom 5`
2. Gather all results in one note
3. Compare different translations

### Sermon Notes

Include verse citations in sermon notes:

```markdown
# Sermon: Faith in Action

**Text:** James 2:26

James 2:26 Just as the body without spirit is dead, so also faith 
without works is dead.

## Points

1. Faith requires action
2. Dead faith is no faith at all
3. Our works demonstrate our faith
```

## Tips and Tricks

### Quick Search

Don't type the full verse reference. Just enough to identify it:
- `jhn 3` finds John 3:16 without typing `:16`
- `gen 1` finds Genesis 1:1 without typing `:1`
- `m 5` finds Matthew 5:3 (if "m" is specific enough)

### Browser History

Recently used verses appear first in suggestions. Use this to quickly re-insert frequently cited verses.

### Combine with Snippets

Use Bible verses inside snippet templates for faster note creation:

Create `Snippets/daily-devo.md`:

```markdown
# Daily Devotional

**Date:** <% tp.date.now("YYYY-MM-DD") %>

**Verse:** %%cursor%%

**Reflection:**

**Prayer:**
```

1. Type `/devo`
2. Add verse reference at cursor
3. Insert the actual verse text from the Bible suggester into the "Verse" section

### Search Strategies

If your search doesn't work:

1. **Try different abbreviations:**
   - `jhn` vs `jn` vs `john`
   - `ps` vs `psa`
   - `1 cor` vs `1cor`

2. **Try just the book:**
   - `jhn` to see all John verses
   - `mt` to see all Matthew verses

3. **Try chapter only:**
   - `jhn 3` to see all John 3 verses
   - `gen 1` to see all Genesis 1 verses

## Limitations

### Database

- **Only New World Translation:** If you need other translations, you'll need to manually update `nwt_verses.json`
- **New Testament focus:** Some books may have fewer verses than others
- **Fixed database:** To use a different translation, the database file must be replaced

### Search

- **Fuzzy character order only:** The search requires characters in order. You can't search backwards (e.g., `3 jhn` won't find John 3)
- **No semantic search:** Searching for "love" won't find verses about love; you need to know the book/chapter

## Customizing the Verse Database

To use a different Bible translation:

1. **Prepare a JSON file** with the format:
   ```json
   {
     "Matthew 5:3": "Blessed are the poor in spirit...",
     "Matthew 5:4": "Blessed are those who mourn...",
     ...
   }
   ```

2. **Replace `src/nwt_verses.json`** with your new file

3. **Rebuild the plugin:**
   ```bash
   npm run build
   ```

4. **Reload in Obsidian**

### Sources for Bible Databases

- **Bible API:** Various APIs provide verse data
- **Open Bible Project:** Free Bible text data
- **Bible.com:** API access to translations
- **Local Bible files:** Many Markdown Bible databases exist

For copyright reasons, always ensure you have permission to use the translation.

## Troubleshooting

### Verses Not Appearing

- **Check Bible trigger:** Default is `!`, not `$` or other characters
- **Verify character:** If it doesn't work, check settings for `bibleTrigger`
- **Plugin may not be loaded:** Restart Obsidian or reload plugins

### Search Results Empty

- **Try different abbreviations:** `jhn` vs `john` vs `jn`
- **Verify book name:** Check the [supported books](#supported-books) list
- **Try just the book name:** Type `!jhn` to see all John verses

### Wrong Verse Returned

- **Character order matters:** `3 jhn` won't work, use `jhn 3`
- **Spaces matter:** `1cor13` might not work the same as `1 cor 13`
- **Try being more specific:** Add verse numbers if you're getting the wrong chapter

### Database File Too Large

- **Expected size:** 4.8 MB is normal for full Bible text
- **Trim if needed:** Remove books you don't use to reduce size
- **Performance:** Loading time is typically under 1 second even on slow devices

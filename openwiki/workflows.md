---
type: Quick Reference
title: Common Workflows
description: Step-by-step walkthroughs of common use cases and workflows for the insert-verse plugin.
tags: [obsidian, plugin, workflows, examples, use-cases]
openwiki:
  roles: [domain]
---

# Common Workflows

This page provides step-by-step walkthroughs for common ways to use the insert-verse plugin effectively.

## Workflow: Daily Note Creation

Create a consistent daily note template that automatically fills in today's date.

### Setup

**1. Create the snippet file**

Create `Snippets/daily-log.md`:

```markdown
# Daily Log - <% tp.date.now("YYYY-MM-DD") %>

## Today's Focus

%%cursor%%

## Tasks

- [ ] 
- [ ] 
- [ ] 

## Notes

## Reflection
```

**2. Verify settings**

Ensure these are enabled:
- `templaterSupport: true` (so Templater processes the date)
- Templater plugin is installed and enabled

### Usage

1. Create a new note (or use Daily Notes plugin integration)
2. Type `/daily` in the note
3. Select `daily-log` from suggestions
4. Template inserts with today's date auto-filled
5. Cursor positioned at "Today's Focus" section
6. Type your daily focus

### Result

```markdown
# Daily Log - 2024-01-15

## Today's Focus

Focus on project X

## Tasks

- [ ] Complete task 1
- [ ] Review PRs
- [ ] Team meeting at 2pm

## Notes

...
```

---

## Workflow: Meeting Note Taking

Quickly create structured meeting notes with attendees and action items.

### Setup

**1. Create the snippet file**

Create `Snippets/meeting-template.md`:

```markdown
# Meeting: %%cursor%%

**Date:** <% tp.date.now("YYYY-MM-DD") %>  
**Time:** <% tp.date.now("HH:mm") %>  
**Attendees:** 

## Agenda

- [ ] Topic 1
- [ ] Topic 2
- [ ] Topic 3

## Discussion

### Topic 1

### Topic 2

### Topic 3

## Action Items

| Task | Assigned To | Due Date |
|------|-------------|----------|
| | | |
| | | |

## Next Meeting

**Date:** %%cursor%%
```

**2. Configure settings**

- Ensure `templaterSupport: true` for automatic date/time
- Optional: Create separate templates for different meeting types

### Usage

1. Before the meeting, create a new note
2. Type `/meet` 
3. Select `meeting-template`
4. Cursor positioned at meeting title
5. Type the meeting name (e.g., "Project Planning")
6. Meeting date and time auto-fill
7. Fill in attendees and agenda items during meeting
8. Document discussion notes
9. At end, assign action items

### Variation: Different Meeting Types

Create multiple templates:
- `Snippets/meeting-1-on-1.md` — For one-on-one meetings
- `Snippets/meeting-standup.md` — For daily standups
- `Snippets/meeting-retrospective.md` — For retros

Trigger with `/1on1`, `/standup`, `/retro`

---

## Workflow: Code Documentation

Document functions or code snippets with consistent formatting.

### Setup

**1. Create the snippet file**

Create `Snippets/code-docs.md`:

```markdown
\`\`\`%%cursor%%
%%textSelection%%
\`\`\`

**Purpose:**

**Parameters:**

**Returns:**

**Example:**

\`\`\`

**Notes:**
```

**2. Settings**

- Default settings work fine
- Optional: Set `showFileContent: false` to keep suggestions clean

### Usage

1. In your code editor, select the function or code you want to document
2. Switch to Obsidian note
3. Type `/code`
4. Select `code-docs`
5. Your selected code is wrapped in a code block
6. Cursor positioned at language specification
7. Type the language (e.g., `typescript`, `python`)
8. Fill in the documentation sections

### Example

**Selected code:**
```typescript
function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

**After snippet insertion:**

````markdown
```typescript
function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

**Purpose:** Calculate total price of items

**Parameters:** items (Item[]) - array of items

**Returns:** number - total price

**Example:**

```typescript
const total = calculateTotal([{price: 10}, {price: 20}]);
// Returns: 30
```

**Notes:**
````

---

## Workflow: Bible Study Session

Study a Bible passage with context, commentary, and personal reflection.

### Setup

**1. Create the snippet file**

Create `Snippets/verse-study.md`:

```markdown
---
study_date: <% tp.date.now("YYYY-MM-DD") %>
studied_by: 
---

# Bible Study: %%cursor%%

## Verse

## Context

### Surrounding Verses

### Historical Context

## Analysis

### Meaning

### Application to Today

## Reflection

### What does this mean to me?

### How can I apply this?

## Cross References

### Related Verses

- 
- 
- 

## Prayer

Spend time in prayer about what you've learned...
```

**2. Settings**

- `ignoreProperties: true` (frontmatter will be removed)
- `templaterSupport: true` (date auto-fills)

### Usage

1. Create a new note in your Bible study folder
2. Type `/study`
3. Select `verse-study`
4. Cursor at "Verse Reference"
5. Type the verse (e.g., `John 3:16`)
6. Leave a line and type the Bible verse trigger: `!jhn 3:16`
7. Select the verse from suggestions
8. Continue filling out the study sections
9. Include cross references as you study

### Example Workflow

1. Start with a chapter to study: John 3
2. Type `/study` to create the template
3. Set title to "John 3 Study"
4. Type `!jhn 3:1` to look up the verse and insert it
5. Read surrounding verses with additional `!jhn 3:2`, `!jhn 3:3` insertions
6. Document your analysis and reflections

---

## Workflow: Project Kickoff Documentation

Document a new project with all necessary details and stakeholders.

### Setup

**1. Create the snippet file**

Create `Snippets/project-kickoff.md`:

```markdown
---
project_name: 
status: Kickoff
created: <% tp.date.now("YYYY-MM-DD") %>
---

# Project: %%cursor%%

## Overview

**Start Date:** <% tp.date.now("YYYY-MM-DD") %>  
**Stakeholders:** 

**Goal:** 

**Success Criteria:**

## Scope

### In Scope

- 
- 
- 

### Out of Scope

- 
- 
- 

## Team

| Role | Person | Contact |
|------|--------|---------|
| Product Owner | | |
| Lead Dev | | |
| QA | | |

## Timeline

| Phase | Start | End | Owner |
|-------|-------|-----|-------|
| Planning | | | |
| Development | | | |
| Testing | | | |
| Launch | | | |

## Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|-----------|
| | | | |

## Next Steps

- [ ] Schedule kickoff meeting
- [ ] Set up project documentation
- [ ] Create project board
```

**2. Settings**

- `templaterSupport: true` (auto-fill dates)
- Ensure write permissions in project folder

### Usage

1. Create a new note when starting a project
2. Type `/project` or `/kickoff`
3. Select `project-kickoff`
4. Fill in project name at cursor
5. Customize each section
6. Share with stakeholders
7. Update as project evolves

---

## Workflow: Frequently Used Snippets Access

Use the plugin's built-in ranking to quickly access your most-used snippets.

### How It Works

1. Each time you insert a snippet, the timestamp is recorded in localStorage
2. When you type the trigger with no query, your most recently used snippets appear first
3. After using snippets, they naturally rise to the top

### Usage Tips

1. **Quick access:** Just type `/` (without typing anything) to see frequently used snippets
2. **Ranked by recency:** Most recently used snippets appear first
3. **No manual sorting needed:** Usage patterns automatically organize your snippets

### Example

After using these snippets frequently:
- `daily-log.md` (used today at 9:00 AM)
- `meeting-notes.md` (used today at 2:00 PM)
- `code-review.md` (used yesterday)

Typing `/` shows them in order:
1. `meeting-notes.md` ← most recent
2. `daily-log.md` ← earlier today
3. `code-review.md` ← yesterday

---

## Workflow: Multi-Template Document Assembly

Create complex documents by combining multiple snippets.

### Setup

Create several small, focused snippets:
- `Snippets/report-header.md` — Title and metadata
- `Snippets/report-summary.md` — Executive summary
- `Snippets/report-findings.md` — Main findings
- `Snippets/report-recommendations.md` — Recommendations
- `Snippets/report-footer.md` — Conclusion and sign-off

### Usage

1. Create a new note
2. Type `/report` + select `report-header`
3. Add content, then type `/report` + select `report-summary`
4. Continue building the document section by section
5. Rearrange sections as needed
6. Final document has consistent structure and formatting

### Advantage

- Build large documents incrementally
- Reuse sections across different documents
- Maintain consistent formatting
- Easy to update templates for all future documents

---

## Workflow: Template with User Input Spots

Create snippets with clear placeholders for user input.

### Setup

Create `Snippets/letter-template.md`:

```markdown
[Your Address]
[YOUR_ADDRESS]

[Date]
<% tp.date.now("MMMM DD, YYYY") %>

Dear %%cursor%%,

I am writing to %%cursor%%.

%%textSelection%%

Sincerely,

[Your Name]
```

### Usage

1. Create new note
2. Type `/letter`
3. Select template
4. Fill in recipient name at first cursor
5. Press Enter and continue to second cursor
6. Add details about the letter purpose
7. Pre-written signature included

---

## Workflow: Template Organization by Frequency

Organize snippets so frequently used templates are easy to find.

### Setup

```
Snippets/
├── daily-log.md              # Daily use
├── quick-note.md             # Daily use
├── meetings/
│   ├── standup.md            # Weekly
│   ├── 1-on-1.md             # Monthly
│   └── planning.md           # Quarterly
├── reference/
│   ├── code-template.md      # Occasional
│   ├── documentation.md      # Occasional
│   └── archives/
│       └── old-template.md   # Rarely used
```

### Usage

- For daily snippets, keep at root level: `/daily`, `/note`
- For organized categories: `/standup`, `/1on1`, `/code`
- Archive rarely used snippets in subfolders

---

## Workflow: Collaborative Snippets

Share snippet templates with teammates.

### Setup

1. **Version control:** Commit snippets to git repository
2. **Shared folder:** Store snippets in a shared vault or folder
3. **Documentation:** Include comments in YAML frontmatter

Example snippet with documentation:

```markdown
---
name: "Bug Report Template"
version: "1.0"
author: "QA Team"
created: 2024-01-10
purpose: "Standardize bug reports across the team"
tags: [bug-report, qa]
---

# Bug Report

**Title:** %%cursor%%

**Priority:** 

**Steps to Reproduce:**

1. 
2. 
3. 

**Expected Result:**

**Actual Result:**

**Environment:** 

**Attachments:** 
```

### Usage

1. Team shares snippets folder via git or sync tool
2. Each team member pulls the shared snippets
3. Everyone uses the same templates
4. Consistent format across team documentation

---

## Tips for Effective Workflows

### 1. Name Snippets Clearly

Use consistent prefixes:
- `daily-` for daily use templates
- `meet-` for meeting templates
- `doc-` for documentation
- `code-` for code-related snippets

### 2. Start with Cursor

Put `%%cursor%%` at the location you'll type most frequently:
- Meeting templates: cursor at title
- Notes templates: cursor at first section
- Code docs: cursor at language specification

### 3. Use Templater for Automation

Combine insert-verse with Templater for:
- Auto-filled dates and times
- File creation metadata
- Dynamic content based on file properties

### 4. Archive Old Snippets

Keep frequently used snippets at root level and archive old ones in subfolders to reduce clutter.

### 5. Document Your Snippets

Add YAML frontmatter with purpose, version, and usage notes:
```markdown
---
purpose: "Daily log template"
version: "2.0"
last_updated: "2024-01-15"
---
```

Even though frontmatter is stripped on insertion, it helps you find and manage snippets.

### 6. Test Placeholders

Before relying on a snippet, insert it in a test note and verify:
- Cursor positioning works
- Selected text insertion works
- Templater processing works (if used)

### 7. Keep Snippets Focused

One snippet = one purpose. Avoid giant templates that do everything. Instead:
- Create 3 specific templates
- Let users combine them
- Results are more flexible

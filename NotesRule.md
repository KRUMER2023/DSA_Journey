# CodeNode Data Update Rules (For AI Agents)

**Attention AI Assistant / Extension:**
If the user asks you to "add a new note", "add a new code", or "add a new node" to this repository, you **MUST** follow these exact rules to ensure the frontend application dynamically renders the new information correctly.

The web application is driven entirely by a single JSON file. You do not need to edit any HTML, CSS, or JS files to add new content.

## When the User Attaches a Code File
If the user attaches this `NotesRule.md` file along with a new code file (e.g., `2Sum.py`) and asks you to add it to the repository, you **MUST**:
1. Save the attached code file into the `Notes/CodesWithNotes/` directory.
2. **Handle Custom Notes (Naming Convention is Critical):** 
   - The markdown notes file MUST have the exact same name as the code file, suffixed with `_notes.md`. For example, if the code file is `DSU.py`, the markdown file MUST be `DSU_notes.md`.
   - If the user asks you to *generate* notes, you must create a new markdown file (e.g., `2Sum_notes.md`) containing a detailed intuition and proper explanation of the algorithm, and save it in `Notes/CodesWithNotes/`.
   - If the user *attaches* an already created custom markdown file, ensure it follows the naming convention and save that file in `Notes/CodesWithNotes/`.
3. Proceed directly to Step 2 to append the new node to `data.json` without any error or misunderstanding.

## Step 1: Add the Code File
1. Write or save the Python code (or other language code) that the user requested.
2. Save this file inside the `Notes/CodesWithNotes/` folder.
3. Ensure the code has a clear structure and comments if needed.

## Step 2: Append to the JSON Database
1. Open the file located at: `NotesWebPage/data.json`.
2. The file contains a JSON Array `[]`.
3. You must append a **new object** to this array using the exact schema below.

### JSON Schema Requirements

```json
{
  "id": "kebab-case-string-identifier",
  "title": "Human Readable Title",
  "difficulty": "Medium", 
  "status": "New", 
  "topic": ["Linked List", "Hash Table"],
  "customTags": ["Important", "Review Later"],
  "description": "A 1-2 sentence brief explanation of what the algorithm/data structure does.",
  "filePath": "../Imp Implementation/your_new_file.py",
  "customNotes": "../Notes/CodesWithNotes/your_new_file_notes.md",
  "addedAt": "2026-07-21T10:00:00Z"
}
```

### Schema Rules:
- **`id`**: Must be a unique kebab-case string (e.g., `binary-search`, `lru-cache`).
- **`title`**: A title same as file name (e.g., `"lru-cache"`). *Note for AI: The Web UI will dynamically extract the raw file name (without extension) from `filePath` to use as the title for **both** the list cards and the large header in the Detail Pane. This means your code filename dictates the title displayed everywhere in the UI.*
- **`difficulty`**: Must be exactly one of: `"Easy"`, `"Medium"`, `"Hard"`. Case-sensitive.
- **`status`**: Must be exactly one of: `"Solved"`, `"Attempted"`, `"New"`. Case-sensitive.
- **`topic`**: Must be an array of capitalized strings representing the categories (e.g., `["Array", "Hash Table"]`, `["Linked List"]`).
- **`customTags`**: (Optional) An array of strings representing any custom tags provided by the user (e.g., `["Important", "Tricky"]`). If the user does not specify any custom tags, this can be an empty array `[]` or omitted.
- **`filePath`**: **CRITICAL!** Must be the relative path from the `NotesWebPage/` directory to the actual code file. E.g., `../Notes/CodesWithNotes/your_file.py`.
- **`customNotes`**: **CRITICAL!** Must point to a markdown file containing detailed notes. The file MUST be named identically to the python file but with a `_notes.md` suffix. E.g., `../Notes/CodesWithNotes/your_file_notes.md`.
- **`addedAt`**: A string representing the exact date and time in ISO 8601 format (e.g., `"2026-07-21T10:30:00Z"`). Do not use relative strings like "Just now".

## Example Update
If the user asks to add an LRU Cache implementation, you write `lru_cache.py` and `lru_cache_notes.md` in `Notes/CodesWithNotes/`, and then modify `NotesWebPage/data.json` so the array ends like this:

```json
  ... previous items ...,
  {
    "id": "lru-cache",
    "title": "LRU Cache",
    "difficulty": "Medium",
    "status": "Solved",
    "topic": [
      "Linked List",
      "Hash Table"
    ],
    "customTags": ["LRU Cache Tag", "Important"],
    "description": "Implement an LRU (Least Recently Used) cache using a Hash Map and a Doubly Linked List.",
    "filePath": "../Notes/CodesWithNotes/lru_cache.py",
    "customNotes": "../Notes/CodesWithNotes/lru_cache_notes.md",
    "addedAt": "2026-07-21T10:00:00Z"
  }
]
```

**Do not break the JSON array syntax.** Always ensure the trailing commas are correct before saving the `data.json` file.

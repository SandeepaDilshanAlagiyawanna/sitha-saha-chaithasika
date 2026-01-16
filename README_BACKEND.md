# සිත් සහ චෙතසික - Truth Table Matching System

## Setup Instructions

### 1. Install Python Dependencies

```bash
pip install -r requirements.txt
```

### 2. Start the Backend Server

```bash
python backend.py
```

You should see:

```
🚀 Starting සිත් සහ චෙතසික Backend...
📊 Loading truth table from truthtable.csv...
✅ Loaded 123 entries from truth table
🌐 Backend running on http://localhost:5000
📡 CORS enabled - Frontend can connect
```

### 3. Open the Frontend

Open `index.html` in your web browser (or use a local server)

## How It Works

1. **Select Checkboxes**: Click on different චෛතසික (cetasikas) to select them
2. **Auto-Selection**: Based on rules, some checkboxes will automatically select/deselect
3. **Find Matching සිත්**: Click "චිත්තයන් ලබා ගැනීමට" button
4. **View Results**: The matching සිත් will appear in the text area below

## Button Functions

- **චිත්තයන් ලබා ගැනීමට** (Get Citta): Finds matching සිත් from truth table
- **නැවත ආරම්භය** (Reset): Clears all selections and starts over
- **විශාල කර බලන්න** (Expand): Reloads the page

## Backend API

### Endpoint: `/match-citta`

**Request:**

```json
{
  "selections": {
    "ඵස්ස 121": 1,
    "වේදනා -121": 1,
    "මෝහය": 1,
    ...
  }
}
```

**Response (Success):**

```json
{
  "success": true,
  "matches": [
    ["සෝමනස්ස සහගත", "දිට්ඨිගත සම්පයුක්ත", "අසංඛාරික සි", "අකුසල සිත"]
  ],
  "count": 1
}
```

**Response (No Match):**

```json
{
  "success": false,
  "message": "මේ සංයෝජනයට ගැලපෙන සිත් නොමැත",
  "matches": [],
  "count": 0
}
```

## Troubleshooting

### Backend not connecting:

- Make sure `backend.py` is running
- Check that port 5000 is not being used by another application
- Verify `truthtable.csv` exists in the same directory

### No matches found:

- This is normal - not all checkbox combinations have a matching සිත්
- Try different combinations based on the rules

### CORS errors:

- Make sure you're using a proper web server (not just opening HTML file directly)
- Or use: `python -m http.server 8000` and access via `http://localhost:8000`

## Files

- `backend.py` - Python Flask server for truth table matching
- `truthtable.csv` - Truth table data with all සිත් combinations
- `script.js` - Frontend logic including backend integration
- `index.html` - User interface
- `requirements.txt` - Python dependencies

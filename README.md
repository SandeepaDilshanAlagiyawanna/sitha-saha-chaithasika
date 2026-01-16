# සිත් සහ චෙතසික - FastAPI Single Web Application

## ✨ New Features

- **Single FastAPI Application** - Both frontend and backend in one app
- **Updated Column Mappings** - Matches the new simplified CSV column names
- **Cleaner Architecture** - No need to run separate Flask + HTTP servers

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pip install fastapi uvicorn[standard]
```

or

```bash
pip install -r requirements.txt
```

### 2. Run the Application

```bash
python app.py
```

You should see:

```
🚀 Starting සිත් සහ චෙතසික FastAPI Application...
📊 Loading truth table from truthtable.csv...
✅ Loaded 121 entries from truth table
🌐 Single Web App running on http://localhost:8000
📡 API endpoint: http://localhost:8000/api/match-citta
🎨 Frontend: http://localhost:8000/
```

### 3. Open in Browser

Navigate to: **http://localhost:8000**

That's it! Everything runs from one server on port 8000.

## 📋 Updated Column Mappings

The new dataset has simplified column names without numbers/codes:

### සබ්බ චිත්ත සාධාරණ (7)

- ඵස්ස, වේදනා, සංඥා, චේතනා, ඒකග්ඝතා, ජිවිතින්ද්‍රිය, මනසිකාරය

### ප්‍රකීර්ණක (6)

- විතක්ක, විචාර, අධිමොක්ඛා, වීරිය, පීතී, ඡන්ද

### අකුසල සාධාරණ (4)

- මෝහ, අහිරික, අනොත්තප්ප, උද්ධච්ච

### ලෝභ ත්‍රිහේතුක (3)

- ලෝභ, දිට්ඨි, මාන

### දොස චතුස්තකය (4)

- දෝස, ඉස්සා, මච්ජරිය, කුක්කුච්ච

### තින, මිද්ධ (2)

- ථීන, මිද්ධ

### විචිකිච්ඡා (1)

- විචිකිච්ජා

### සොභන සධාරන (19)

- සද්ධා, සති, හිරි, ඔත්තප්ප, අලොභ, අදොස, තත්‍රමජ්ජත්තතා
- කාය පස්සද්ධි, චිත්ත පස්සද්ධි
- කාය ලහුතා, චිත්ත ලහුතා
- කාය මුදුතා, චිත්ත මුදුතා
- කාය කම්මගතා, චිත්ත කම්මගතා
- කාය පාගුඤ්ඤතා, චිත්ත පාගුඤ්ඤතා
- කායුජුකතා, චිත්තයුජුක්තා

### විරති (3)

- සම්මා වචා, සම්මා කම්මන්ත, සම්මා ආජීවෝ

### අප්‍රමාන්‍ය (2)

- කරුණා, මුදිතා

### අමොහ (1)

- පඤ්ඤා

**Total: 52 චෛතසික**

## 🔧 How It Works

1. **User Interface** - Select checkboxes for different චෛතසික
2. **Auto-Selection** - Rules automatically check/uncheck related items
3. **Click "චිත්තයන් ලබා ගැනීමට"** - Sends selections to API
4. **Backend Matching** - Compares with 121 rows in [truthtable.csv](truthtable.csv)
5. **Display Results** - Shows matching සිත් in the text area

## 📡 API Endpoints

### GET `/`

Serves the main HTML page

### GET `/script.js`, `/styles.css`

Serves static files

### POST `/api/match-citta`

Matches checkbox selections with truth table

**Request Body:**

```json
{
  "selections": {
    "ඵස්ස": 1,
    "වේදනා": 1,
    "මෝහ": 1,
    ...
  }
}
```

**Response:**

```json
{
  "success": true,
  "matches": [
    ["සෝමනස්ස සහගත", "දිට්ඨිගත සම්පයුක්ත", "අසංඛාරික සි", "අකුසල සිත"]
  ],
  "count": 1
}
```

### GET `/api/health`

Health check endpoint

### GET `/api/columns`

Returns list of all checkbox column names

## 🔍 Troubleshooting

### Port already in use

If port 8000 is busy, modify the port in [app.py](app.py):

```python
uvicorn.run(app, host="0.0.0.0", port=8001)
```

### No matches found

- This is normal - not all combinations have a matching සිත්
- Try different checkbox selections based on the rules

### Module not found errors

```bash
pip install fastapi uvicorn
```

## 📁 Files

- **app.py** - Main FastAPI application (replaces backend.py)
- **truthtable.csv** - Truth table with 121 සිත් entries
- **script.js** - Frontend logic with updated mappings
- **index.html** - User interface
- **styles.css** - Styling
- **requirements.txt** - Python dependencies

## ⚡ Advantages of FastAPI

1. **Faster** - Async support and high performance
2. **Single Process** - One command runs everything
3. **Auto Documentation** - Visit http://localhost:8000/docs for API docs
4. **Modern** - Type hints and Pydantic validation
5. **Simpler Deployment** - One application to deploy

## 🎯 Next Steps

Visit the app at **http://localhost:8000** and start selecting චෛතසික to find matching සිත්!

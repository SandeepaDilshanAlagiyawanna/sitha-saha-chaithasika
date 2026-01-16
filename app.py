from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import csv
import os
from pathlib import Path

app = FastAPI(title="සිත් සහ චෙතසික API")

BASE_DIR = Path(__file__).parent

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Column names from the CSV (matching the updated dataset)
CHECKBOX_COLUMNS = [
    "ඵස්ස",
    "වේදනා",
    "සංඥා",
    "චේතනා",
    "ඒකග්ඝතා",
    "ජිවිතින්ද්‍රිය",
    "මනසිකාරය",
    "විතක්ක",
    "විචාර",
    "අධිමොක්ඛා",
    "වීරිය",
    "පීතී",
    "ඡන්ද",
    "මෝහ",
    "අහිරික",
    "අනොත්තප්ප",
    "උද්ධච්ච",
    "ලෝභ",
    "දිට්ඨි",
    "මාන",
    "දෝස",
    "ඉස්සා",
    "මච්ජරිය",
    "කුක්කුච්ච",
    "ථීන",
    "මිද්ධ",
    "විචිකිච්ජා",
    "සද්ධා",
    "සති",
    "හිරි",
    "ඔත්තප්ප",
    "අලොභ",
    "අදොස",
    "තත්‍රමජ්ජත්තතා",
    "කාය පස්සද්ධි",
    "චිත්ත පස්සද්ධි",
    "කාය ලහුතා",
    "චිත්ත ලහුතා",
    "කාය මුදුතා",
    "චිත්ත මුදුතා",
    "කාය කම්මගතා",
    "චිත්ත කම්මගතා",
    "කාය පාගුඤ්ඤතා",
    "චිත්ත පාගුඤ්ඤතා",
    "කායුජුකතා",
    "චිත්තයුජුක්තා",
    "සම්මා වචා",
    "සම්මා කම්මන්ත",
    "සම්මා ආජීවෝ",
    "කරුණා",
    "මුදිතා",
    "පඤ්ඤා ",
]


def load_truth_table():
    """Load the truth table from CSV file"""
    truth_table = []
    csv_path = Path(__file__).parent / "truthtable.csv"

    with open(csv_path, "r", encoding="utf-8") as file:
        reader = csv.reader(file)
        header = next(reader)  # Skip header

        for row in reader:
            if len(row) >= 5:  # Ensure row has enough data
                # Extract සිත් description (first 4 columns)
                citta_description = [col.strip() for col in row[:4] if col.strip()]

                # Extract checkbox values (remaining columns)
                checkbox_values = []
                for i in range(4, len(row)):
                    try:
                        value = int(row[i]) if row[i].strip() else 0
                        checkbox_values.append(value)
                    except (ValueError, IndexError):
                        checkbox_values.append(0)

                truth_table.append(
                    {"citta": citta_description, "values": checkbox_values}
                )

    return truth_table


class SelectionRequest(BaseModel):
    selections: dict


@app.post("/api/match-citta")
async def match_citta(request: SelectionRequest):
    """
    Match checkbox selections with truth table and return matching සිත්

    Expected input format:
    {
        "selections": {
            "ඵස්ස": 1,
            "වේදනා": 1,
            ...
        }
    }
    """
    try:
        selections = request.selections

        # Debug: Show selected choices
        print("\n" + "=" * 80)
        print("🔍 USER SELECTIONS RECEIVED:")
        print("=" * 80)
        selected_items = [key for key, value in selections.items() if value == 1]
        print(f"✅ Selected ({len(selected_items)} items):")
        for item in selected_items:
            print(f"   • {item}")
        print("-" * 80)

        # Convert selections to ordered list matching CSV column order
        user_values = []
        for col in CHECKBOX_COLUMNS:
            # Handle both exact match and stripped match
            col_stripped = col.strip()
            user_values.append(selections.get(col, selections.get(col_stripped, 0)))

        # Debug: Show the binary pattern
        print("📊 Binary Pattern (User Values):")
        print(f"   {user_values}")
        print(f"   Total selected: {sum(user_values)}")
        print("-" * 80)

        # Load truth table
        truth_table = load_truth_table()
        print(f"📚 Loaded {len(truth_table)} entries from truth table")
        print("-" * 80)

        # Find matching rows
        matches = []
        checked_count = 0
        for entry in truth_table:
            checked_count += 1
            # Check if all values match
            if len(entry["values"]) == len(user_values):
                if all(
                    entry["values"][i] == user_values[i]
                    for i in range(len(user_values))
                ):
                    matches.append(entry["citta"])
                    print(
                        f"✅ MATCH FOUND #{len(matches)}: {' - '.join(entry['citta'])}"
                    )

        print("-" * 80)
        print(f"🔎 Checked {checked_count} entries in dataset")
        print(f"🎯 Found {len(matches)} matching සිත්")
        print("=" * 80 + "\n")

        if matches:
            return JSONResponse(
                {"success": True, "matches": matches, "count": len(matches)}
            )
        else:
            return JSONResponse(
                {
                    "success": False,
                    "message": "මේ සංයෝජනයට ගැලපෙන සිත් නොමැත",
                    "matches": [],
                    "count": 0,
                }
            )

    except Exception as e:
        return JSONResponse({"success": False, "error": str(e)}, status_code=500)


@app.get("/api/health")
async def health():
    """Health check endpoint"""
    return {"status": "healthy", "message": "Backend is running"}


@app.get("/api/columns")
async def get_columns():
    """Get list of all checkbox columns"""
    return {"columns": CHECKBOX_COLUMNS}


# Serve static files (HTML, CSS, JS)
@app.get("/")
async def serve_index():
    """Serve the main HTML file"""
    return FileResponse(BASE_DIR / "index.html")


@app.get("/script.js")
async def serve_script():
    """Serve the JavaScript file"""
    return FileResponse(BASE_DIR / "script.js")


@app.get("/styles.css")
async def serve_styles():
    """Serve the CSS file"""
    return FileResponse(BASE_DIR / "styles.css")


@app.get("/truthtable.csv")
async def serve_csv():
    """Serve the CSV file"""
    return FileResponse(BASE_DIR / "truthtable.csv")


if __name__ == "__main__":
    import uvicorn

    print("🚀 Starting සිත් සහ චෙතසික FastAPI Application...")
    print("📊 Loading truth table from truthtable.csv...")

    # Verify CSV file exists
    csv_path = Path(__file__).parent / "truthtable.csv"
    if not csv_path.exists():
        print("❌ Error: truthtable.csv not found!")
        exit(1)

    # Test load
    truth_table = load_truth_table()
    print(f"✅ Loaded {len(truth_table)} entries from truth table")
    print(f"🌐 Single Web App running on http://localhost:8000")
    print(f"📡 API endpoint: http://localhost:8000/api/match-citta")
    print(f"🎨 Frontend: http://localhost:8000/")

    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")

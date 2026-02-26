import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE_PATH = path.join(process.cwd(), "puck-data.json");

// Initialize data file if it doesn't exist
function initializeDataFile() {
  if (!fs.existsSync(DATA_FILE_PATH)) {
    fs.writeFileSync(
      DATA_FILE_PATH,
      JSON.stringify(
        {
          "/": {
            content: [],
            root: {},
          },
        },
        null,
        2
      )
    );
  }
}

// GET - Load Puck data for a specific path
export async function GET(request: NextRequest) {
  try {
    console.log('[Puck API] GET request received');
    initializeDataFile();
    
    const { searchParams } = new URL(request.url);
    const path = searchParams.get("path") || "/";
    console.log('[Puck API] Loading data for path:', path);

    const fileContent = fs.readFileSync(DATA_FILE_PATH, "utf-8");
    const allData = JSON.parse(fileContent);

    const data = allData[path] || {
      content: [],
      root: {},
    };

    console.log('[Puck API] Returning data:', data.content?.length || 0, 'items');
    return NextResponse.json(data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error("[Puck API] Error loading Puck data:", error);
    // Return empty data instead of error to allow editor to work
    return NextResponse.json(
      {
        content: [],
        root: {},
      },
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

// POST - Save Puck data for a specific path
export async function POST(request: NextRequest) {
  try {
    initializeDataFile();
    
    const { searchParams } = new URL(request.url);
    const path = searchParams.get("path") || "/";
    const data = await request.json();

    const fileContent = fs.readFileSync(DATA_FILE_PATH, "utf-8");
    const allData = JSON.parse(fileContent);

    allData[path] = data;

    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(allData, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving Puck data:", error);
    return NextResponse.json(
      { error: "Failed to save data" },
      { status: 500 }
    );
  }
}

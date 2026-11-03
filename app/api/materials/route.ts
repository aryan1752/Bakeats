import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Material } from "@/lib/schemas";
import { getLocalMaterials, addLocalMaterial, deleteLocalMaterial } from "@/lib/local-db";
import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const stream = searchParams.get("stream") || undefined;
  
  let materials = getLocalMaterials(stream);

  try {
    await connectToDatabase();
    const query = stream && stream !== "all" ? { $or: [{ stream }, { stream: "all" }] } : {};
    const dbMats = await Material.find(query).sort({ _id: -1 }).lean();
    if (Array.isArray(dbMats) && dbMats.length > 0) {
      const uniqueMap = new Map();
      for (const m of [...materials, ...dbMats]) {
        const key = String(m._id || m.id || m.title);
        if (!uniqueMap.has(key)) {
          uniqueMap.set(key, m);
        }
      }
      materials = Array.from(uniqueMap.values());
    }
  } catch (err: any) {
    // Offline fallback
  }

  return NextResponse.json({ success: true, materials });
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = (formData.get("title") as string || "").trim();
    const type = (formData.get("type") as string || "notes").trim();
    const subject = (formData.get("subject") as string || "").trim();
    const stream = (formData.get("stream") as string || "all").trim();
    let fileUrl = (formData.get("file_url") as string || "").trim();
    const file = formData.get("file") as File | null;

    if (!title || !subject) {
      return NextResponse.json({ success: false, error: "Please enter title and subject." }, { status: 400 });
    }

    // Handle physical file upload if a File was attached
    if (file && typeof file === "object" && file.size > 0) {
      try {
        const uploadDir = path.join(process.cwd(), "public", "uploads", "materials");
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }

        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const filename = `${Date.now()}_${safeName}`;
        const filePath = path.join(uploadDir, filename);

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        fs.writeFileSync(filePath, buffer);

        fileUrl = `/uploads/materials/${filename}`;
      } catch (fileErr: any) {
        console.warn("File write to disk failed:", fileErr);
      }
    }

    if (!fileUrl) {
      fileUrl = "#";
    }

    const materialData = {
      _id: "mat_" + Date.now(),
      title,
      type,
      subject,
      stream,
      file_url: fileUrl,
      uploaded_at: new Date().toISOString()
    };

    // Always save in persistent local database
    const saved = addLocalMaterial(materialData);

    // Also persist in MongoDB if reachable
    try {
      await connectToDatabase();
      await Material.create({
        title,
        type,
        subject,
        stream,
        file_url: fileUrl
      });
    } catch (dbErr) {
      // Graceful offline fallback
    }

    return NextResponse.json({ 
      success: true, 
      message: `Material "${title}" uploaded successfully!`, 
      material: saved 
    });
  } catch (err: any) {
    console.error("Error in POST /api/materials:", err);
    return NextResponse.json({ success: false, error: err.message || "Failed to upload material." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing material id" }, { status: 400 });
    }

    deleteLocalMaterial(id);

    try {
      await connectToDatabase();
      await Material.findByIdAndDelete(id);
    } catch (dbErr) {
      // Graceful offline fallback
    }

    return NextResponse.json({ success: true, message: "Material deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { 
  getMaterialsAction, 
  addMaterial, 
  deleteMaterialAction 
} from "@/lib/coaching-actions";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const stream = searchParams.get("stream") || undefined;
  
  const materials = await getMaterialsAction(stream);
  return NextResponse.json({ success: true, materials });
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const result = await addMaterial(null, formData);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ success: false, error: "Missing material id" }, { status: 400 });
  }
  const result = await deleteMaterialAction(id);
  return NextResponse.json(result);
}

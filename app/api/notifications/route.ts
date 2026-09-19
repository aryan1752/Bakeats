import { NextResponse } from "next/server";
import { 
  getNotificationsAction, 
  createBroadcastNotification, 
  deleteNotificationAction 
} from "@/lib/coaching-actions";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const stream = searchParams.get("stream") || undefined;
  
  const notifications = await getNotificationsAction(stream);
  return NextResponse.json({ success: true, notifications });
}

export async function POST(request: Request) {
  try {
    let payload: any = {};
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      payload = await request.json();
    } else {
      const formData = await request.formData();
      payload = {
        title: formData.get("title") as string,
        message: formData.get("message") as string,
        sender: formData.get("sender") as string,
        stream: formData.get("stream") as string,
        priority: formData.get("priority") as string,
        image_url: formData.get("image_url") as string,
        date: formData.get("date") as string,
      };
    }

    const result = await createBroadcastNotification(payload);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ success: false, error: "Missing notification id" }, { status: 400 });
  }
  const result = await deleteNotificationAction(id);
  return NextResponse.json(result);
}

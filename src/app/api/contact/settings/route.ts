import { NextResponse } from "next/server";
import {
  getMailSettings,
  defaultMailSettings,
} from "@/lib/communication-settings";
export async function GET() {
  try {
    const settings = await getMailSettings();
    return NextResponse.json(
      { email: settings.publicEmail },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json({ email: defaultMailSettings.publicEmail });
  }
}

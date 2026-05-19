import { NextResponse } from "next/server";
import { getSupabaseServiceClient } from "@/lib/supabase";

export async function POST(request: Request) {
  const formData = await request.formData();
  const formType = String(formData.get("form_type") ?? "unknown");
  const honeypot = String(formData.get("website") ?? "");
  const referer = request.headers.get("referer") ?? "/";

  if (honeypot) {
    return NextResponse.redirect(referer, 303);
  }

  const payload: Record<string, FormDataEntryValue> = {};
  formData.forEach((value, key) => {
    if (key !== "password" && key !== "website") {
      payload[key] = value;
    }
  });

  const supabase = getSupabaseServiceClient();
  if (supabase) {
    await supabase.from("form_submissions").insert({
      form_type: formType,
      payload,
      source_path: referer
    });
  }

  return NextResponse.redirect(`${referer.split("?")[0]}?submitted=1`, 303);
}


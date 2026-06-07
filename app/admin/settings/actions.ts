"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/auth";
import { upsertSetting } from "@/lib/settings";

const SETTING_KEYS = [
  "business_name",
  "owner_name",
  "phone",
  "whatsapp",
  "email",
  "address",
  "instagram_url",
  "facebook_url",
  "youtube_url",
] as const;

export async function updateSettings(
  _prev: { error: string | null; success: boolean },
  formData: FormData,
): Promise<{ error: string | null; success: boolean }> {
  await requireAdmin();

  try {
    await Promise.all(
      SETTING_KEYS.map((key) => {
        const value = (formData.get(key) as string)?.trim() ?? "";
        return upsertSetting(key, value);
      }),
    );
    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/contact");
    revalidatePath("/admin/settings");
    return { error: null, success: true };
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Failed to save settings",
      success: false,
    };
  }
}

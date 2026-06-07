import { cache } from "react";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export interface SiteSettings {
  business_name: string;
  owner_name: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  instagram_url: string;
  facebook_url: string;
  youtube_url: string;
}

const DEFAULTS: SiteSettings = {
  business_name: "Artistry by Mridhula",
  owner_name: "Mridhula",
  phone: "",
  whatsapp: "",
  email: "",
  address: "Chennai, Tamil Nadu",
  instagram_url: "",
  facebook_url: "",
  youtube_url: "",
};

export const getSettings = cache(async (): Promise<SiteSettings> => {
  try {
    const supabase = createSupabaseServerClient();
    const { data } = await supabase.from("settings").select("key, value");
    if (!data) return DEFAULTS;
    const map = Object.fromEntries(data.map((r) => [r.key, r.value]));
    return { ...DEFAULTS, ...map } as SiteSettings;
  } catch {
    return DEFAULTS;
  }
});

export async function upsertSetting(key: string, value: string): Promise<void> {
  const supabase = createSupabaseServerClient();
  const { error } = await supabase
    .from("settings")
    .upsert({ key, value, updated_at: new Date().toISOString() }, { onConflict: "key" });
  if (error) throw new Error(error.message);
}

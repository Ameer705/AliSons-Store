import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://rkzcjtdlxewkeogpwchr.supabase.co";

const supabaseAnonKey = "sb_publishable_25ByG2_JcArGEn9eDWoJpA_8TkY3sEH";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
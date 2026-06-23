import path from "path";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

const envPath = path.resolve(process.cwd(), "backend", ".env");
const altEnvPath = path.resolve(process.cwd(), ".env");

if (path.basename(process.cwd()) === "backend") {
  dotenv.config({ path: altEnvPath });
} else {
  dotenv.config({ path: envPath });
}

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
const keyType = process.env.SUPABASE_SERVICE_ROLE_KEY ? "service_role" : process.env.SUPABASE_ANON_KEY ? "anon" : "none";

if (!supabaseUrl || !supabaseKey) {
  throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY or SUPABASE_ANON_KEY are required");
}

console.log("Supabase key type:", keyType);

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

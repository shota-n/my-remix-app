import { type LoaderFunctionArgs, redirect } from "@remix-run/node";
import { createSupabaseClient } from "~/lib/spabase.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const { supabase } = createSupabaseClient(request);
  await supabase.auth.signOut();
  return redirect("/");
}

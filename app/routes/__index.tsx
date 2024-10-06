import {
  type LoaderFunctionArgs,
  type MetaFunction,
  json,
} from "@remix-run/node";
import { redirect, useLoaderData } from "@remix-run/react";
import { createSupabaseClient } from "~/lib/spabase.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const { supabase } = createSupabaseClient(request);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user ? json({ user }) : redirect("/login");
}

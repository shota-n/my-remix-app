import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { z } from "zod";
import { zx } from "zodix";

export async function loader({ request }: LoaderFunctionArgs) {
  const { name } = zx.parseQuery(request, {
    name: z.string().optional(),
  });
  return json({ message: `Hello, ${name || "world"}!` });
}

import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  redirect,
} from "@remix-run/node";
import { withZod } from "@remix-validated-form/with-zod";
import { validationError } from "remix-validated-form";
import { z } from "zod";
import { createSupabaseClient } from "~/lib/spabase.server";

const LoginFields = withZod(
  z.object({
    email: z.string().min(1).email(),
    password: z.string().min(1),
  }),
);

export async function action({ request }: ActionFunctionArgs) {
  const { supabase, headers } = createSupabaseClient(request);
  const formData = await LoginFields.validate(await request.formData());
  if (formData.error || !formData.data) {
    return validationError(formData.error, { headers });
  }

  const { email, password } = formData.data;
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    return new Response("Invalid email or password", { status: 400, headers });
  }
  return redirect("/", { headers });
}

export async function loader({ request }: LoaderFunctionArgs) {
  const { supabase } = createSupabaseClient(request);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user ? redirect("/") : {};
}

export default function Login() {
  return (
    <div className="flex items center justify-center h-screen">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Login</h1>
        <form className="flex flex-col gap-4" method="post">
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className="p-2 border border-gray-200 rounded"
          />
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="p-2 border border-gray-200 rounded"
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

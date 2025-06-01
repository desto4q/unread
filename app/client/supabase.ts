import {
  createBrowserClient,
  createServerClient,
  parseCookieHeader,
  serializeCookieHeader,
} from "@supabase/ssr";
export const serverClient = (req: Request) => {
  const headers = new Headers();
  const client = createServerClient(
    process.env.SUPA_URL!,
    process.env.SUPA_KEY!,
    {
      cookies: {
        getAll() {
          const cookies = parseCookieHeader(req.headers.get("cookie") ?? "");
          return cookies.map((cookie) => ({
            name: cookie.name,
            value: cookie.value || "",
          }));
        },
        setAll(cookies) {
          cookies.forEach(({ name, value, options }) =>
            headers.append(
              "set-cookie",
              serializeCookieHeader(name, value, options),
            ),
          );
        },
      },
    },
  );
  return { client, headers };
};

export let browserClient = () => createBrowserClient(
  import.meta.env.SUPA_URL!,
  import.meta.env.SUPA_KEY!,
);

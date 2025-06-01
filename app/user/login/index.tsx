import { ClientResponseError } from "pocketbase";
import { useEffect, type SyntheticEvent } from "react";
import { redirect } from "react-router";
import { useActionData, type ActionFunctionArgs } from "react-router";
import { db, useResponse } from "~/client/pocketbase";
import Center from "~/components/Center";

export async function action({ request, params }: ActionFunctionArgs) {
  let formData = await request.formData();
  let email = formData.get("email") as string;
  let password = formData.get("password") as string;

  let client = db();
  try {
    let resp = await client
      .collection("users")
      .authWithPassword(email, password);
    let cookie = client.authStore.exportToCookie();
    let headers = new Headers();
    headers.set("Set-Cookie", cookie);

    return redirect("/", { headers: headers });
    // return Response.json(
    //   {
    //     message: "logged in",
    //   },
    //   { headers: headers },
    // );
  } catch (error) {
    console.error("Error logging in:", error);
    if (error instanceof ClientResponseError) {
      return Response.json(
        {
          error: error.message,
        },
        { status: 500 },
      );
    }
    return Response.json(
      {
        error: "An unexpected error occurred",
      },
      { status: 500 },
    );
  }
}
export default function index() {
  useResponse();
  let onSubmit = async (e: SyntheticEvent) => {
    // e.preventDefault();
  };
  return (
    <Center>
      <form
        onSubmit={onSubmit}
        action=""
        method="post"
        className="p-4 bg-base-100 drop-shadow-2xl w-full max-w-lg flex flex-col gap-4 rounded-md"
      >
        <h2 className="py-2 text-xl font-bold text-center capitalize">
          Login to Unread
        </h2>
        <div className="">
          <p className="label block mb-2">Email</p>
          <input
            type="email"
            required
            placeholder="email"
            name="email"
            className="input w-full"
          />
        </div>
        <div className="py-2">
          <p className="label block mb-2">Password</p>
          <input
            type="password"
            placeholder="password"
            name="password"
            className="input w-full"
          />
        </div>
        <button className="btn btn-primary btn-block">Login</button>
      </form>
    </Center>
  );
}

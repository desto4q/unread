import { useQuery } from "@tanstack/react-query";
import { ClientResponseError } from "pocketbase";
import { useEffect, type SyntheticEvent } from "react";
import type { ActionFunctionArgs } from "react-router";
import { useActionData } from "react-router";
import { Form, useLoaderData } from "react-router";
import { toast } from "sonner";
import { db } from "~/client/pocketbase";
export async function action({ request, params, context }: ActionFunctionArgs) {
  let formData = await request.formData();
  let email = formData.get("email") as string;
  let password = formData.get("password") as string;
  let passwordConfirm = formData.get("passwordConfirm") as string;
  let data = {
    email,
    password,
    passwordConfirm,
  };
  try {
    let client = db();
    let resp = await client.collection("users").create(data);
    return Response.json({
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Error creating user:", error);
    if (error instanceof ClientResponseError) {
      return Response.json(
        {
          error: error.message,
          code: error.stack,
        },
        { status: error.status },
      );
    }
    return Response.json(
      {
        error: "An unexpected error occurred",
        code: (error as Error).message,
      },
      { status: 500 },
    );
  }
}
export default function index() {
  let resp = useActionData<typeof action>();
  let log_response = () => {
    if (!resp) return;
    if ("error" in resp) {
      return toast.error(resp["error"]);
    }
    if ("message" in resp) {
      return toast.success(resp["message"]);
    }
  };
  useEffect(() => {
    log_response();
  }, []);

  let onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    let form = new FormData(e.target as HTMLFormElement);
    let password = form.get("password") as string;
    let passwordConfirm = form.get("passwordConfirm") as string;
    if (password.length < 8)
      return toast.error("password must be at least 8 characters long");
    if (password != passwordConfirm)
      return toast.error("passwords do not match");

    let html_form = e.target as HTMLFormElement;
    html_form.submit();
  };
  return (
    <div className="screen bg-base-200 flex">
      <div className="flex flex-1 items-center justify-center ">
        <form
          onSubmit={onSubmit}
          method="post"
          className="bg-base-100 w-full max-w-lg mx-2 drop-shadow-xl p-4"
        >
          <h2 className="text-xl font-bold">Sign Up</h2>
          <div className="py-2 ">
            <p className="label block mb-2">Email</p>
            <input
              type="email"
              required
              placeholder="email"
              name="email"
              className="input w-full"
            />
          </div>
          <div className="py-2 ">
            <p className="label block mb-2">Password</p>
            <input
              type="text"
              placeholder="pasword"
              name="password"
              className="input w-full"
            />
          </div>
          <div className="py-2 ">
            <p className="label block mb-2">Confirm Password</p>
            <input
              type="text"
              placeholder="confirm pasword"
              name="passwordConfirm"
              className="input w-full"
            />
          </div>
          <button className="btn btn-primary btn-block mt-2">Sign Up</button>
          <div className="text-center my-2">or</div>
          <a href="/login" className="btn btn-secondary btn-block btn-soft ">
            Login
          </a>
        </form>
      </div>
    </div>
  );
}

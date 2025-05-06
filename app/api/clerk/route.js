import { Webhook } from "svix";
import dbConnect from "@/config/db";
import User from "@/models/user";
import { headers } from "next/headers";
// import { User } from "@clerk/nextjs/dist/types/server";
import { NextRequest } from "next/server";

export async function POST(req) {
  const wh = new Webhook(process.env.SVIX_SECRET);
  const headerPayload = await headers();
  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id"),
    "svix-timestamp": headerPayload.get("svix-timestamp"),
    "svix-signature": headerPayload.get("svix-signature"),
  };
  // get the paylod and verify it
  const payload = await req.json();
  const body = JSON.stringify(payload);
  const { data, type } = wh.verify(body, svixHeaders);
  // check if the type is user.created or user.deleted

  const userData = {
    _id: data.id,
    email: data.email_addresses[0].email_address,
    name: `${data.first_name} ${data.last_name}`,
    image: data.image_url,
  };

  await dbConnect();

  switch (type) {
    case "user.created":
      await User.create(userData);
      break;
    case "user.updated":
      await User.findOneAndUpdate(data.id, userData);
      break;
    case "user.deleted":
      await User.findOneAndDelete(data.id);
      break;
    default:
      break;
  }
  return NextRequest.json({ message: "Event received" });
}

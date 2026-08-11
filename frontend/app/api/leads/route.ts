import { NextRequest, NextResponse } from "next/server";
import { gql } from "graphql-request";
import { gqlClient } from "@/lib/graphql";

const MUTATION = gql`
  mutation SubmitLead($input: LeadInput!) {
    submitLead(input: $input) {
      id
    }
  }
`;

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const input = {
    source: (form.get("source") as string) || "landing",
    name: form.get("name") as string,
    email: form.get("email") as string,
    phone: (form.get("phone") as string) || null,
    service: (form.get("service") as string) || null,
    message: (form.get("message") as string) || null,
  };

  try {
    await gqlClient.request(MUTATION, { input });
  } catch (err) {
    console.error("Failed to submit lead", err);
    return NextResponse.redirect(new URL("/contact?error=1", req.url));
  }

  return NextResponse.redirect(new URL("/contact?success=1", req.url));
}

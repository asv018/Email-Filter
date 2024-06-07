import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { threadId } from "worker_threads";
import { authOptions } from "@/lib/authOptions";

export async function GET(req: Request) {
  const headers: any = req.headers;
  const defaultValue = headers.get("defaultnumber");
  const session: any = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" });
  }
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: session.accessToken });
  const gmail = google.gmail({ version: "v1", auth });
  try {
    const response = await gmail.users.messages.list({
      userId: "me",
      maxResults: parseInt(defaultValue),
    });
    const messages = response.data.messages || [];
    const messageDetailsPromises = messages.map((message: any) => {
      return gmail.users.messages.get({
        userId: "me",
        id: message.id,
      });
    });
    const messageDetails = await Promise.all(messageDetailsPromises);
    const emailContents = messageDetails.map((details: any) => {
      const payload = details.data.payload;
      let emailBody = "";
      if (payload?.parts) {
        payload.parts.forEach((part: any) => {
          if (part.mimeType == "text/plain" && part.body?.data) {
            emailBody = Buffer.from(part.body.data, "base64").toString("utf-8");
          }
        });
      } else if (payload?.body?.data) {
        emailBody = Buffer.from(payload.body.data, "base64").toString("utf-8");
      }
      return {
        id: details.data.id,
        threadId: details.data.threadId,
        snippet: details.data.snippet,
        body: emailBody,
      };
    });
    return NextResponse.json(emailContents);
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.messages }, { status: 500 });
  }
}

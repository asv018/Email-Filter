import Classify from "@/lib/classify";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  let { emails, openai_api } = await req.json();
  const openai = new OpenAI({
    apiKey: openai_api,
  });
  let promises = emails.map((email: any) => {
    return openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant to filter the emails into Important, Promotions, Social, Marketting, Spam and General",
        },
        {
          role: "user",
          content: `
                 Please classify the email containt into Important, Promotions, Social, Marketting, Spam and General. Only classify into one type of email and just print a single word for classificaiton. 
                 \n\n
                 e.g-1 : If an email is important then just print important.
                 e.g-2: If an email is marketting then just print marketting
                 e.g-3: If an email is promotion then just print promotion
                 e.g-4: If an email is social then just print social.
                 e.g-5: If an email is spam then just print spam.
                 e.g-6: If an email is general then just print general.
                 e.g-7: If body content is not provide then just print spam.
                 \n\n
                 Here is email body content:
                 \n\n
                 ${email.body.slice(0, 100)}
                 \n\n
                  Note: If body content is empty then simply classify it as spam
                `,
        },
      ],
      model: "gpt-3.5-turbo",
    });
  });
  let resolvePromise: any = await Promise.all(promises);
  emails = emails.map((emails: any, index: number) => {
    console.log(resolvePromise[index].choices[0].message.content);
    return {
      ...emails,
      type: Classify(resolvePromise[index].choices[0].message.content),
    };
  });

  return NextResponse.json({ openai_api, emails: emails });
}

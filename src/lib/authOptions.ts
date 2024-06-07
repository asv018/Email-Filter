import { NextAuthOptions } from "next-auth";
import { GOOGLE_FONT_PROVIDER } from "next/dist/shared/lib/constants";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        authorization:{
          params:{
              scope:'openid email profile https://www.googleapis.com/auth/gmail.readonly'
          }
        }
      }),
    ],
    callbacks: {
      async jwt({ token, account }) {
        if (account) {
          token.accessToken = account.access_token;
        }
        return token;
      },
      async session({ session, token }: any) {
        session.accessToken = token.accessToken;
        return session;
      },
    },
  };
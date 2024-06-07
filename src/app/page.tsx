"use client";

import Emails from "@/components/Emails";
import Header from "@/components/Header";
// importing necessary functions
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { InputHTMLAttributes } from "react";
import { useLocalStorage } from "usehooks-ts";

export default function Page() {
  // extracting data from usesession as session
  const { data: session } = useSession();
  const [value, setValue, removeValue] = useLocalStorage(
    "openai-api",
    undefined
  );
  // checking if sessions exists
  if (session) {
    // rendering components for logged in users
    return (
      <>
        <Header session={session} />
        <Emails openAI={value}/>
      </>
    );
  }
  const onAuth = () => {
    if (!value) {
      alert("Enter OpenAI Api Key");
      return;
    }
    signIn("google");
  };
  // rendering components for not logged in users
  return (
    <>
      <div className="flex h-screen justify-center items-center space-y-4 flex-col">
        <button
          onClick={onAuth}
          className="px-4 py-2 rounded-lg bg-black text-white"
        >
          Login with Google
        </button>
        <input
          onChange={(e: any) => {
            setValue(e.target.value);
          }}
          value={value}
          type="text"
          placeholder="Enter OpenAI API"
          className="px-3 py-2 rounded-lg border bg-zinc-50"
        />
      </div>
    </>
  );
}

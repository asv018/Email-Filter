import { signOut } from "next-auth/react";
import React from "react";

function Header({ session }: any) {
  return (
    <>
      <div className="max-w-3xl mx-auto py-4 px-2 flex justify-between">
        <div className="flex gap-2 items-center">
          <div>
            <img
              className="h-10 w-10 rounded-full"
              src={session.user.image}
              alt=""
            />
          </div>
          <div className="flex flex-col">
            <h1>{session.user.name}</h1>
            <p>{session.user.email}</p>
          </div>
        </div>
        <div className="">
          <button
            onClick={() => signOut()}
            className="px-3 py-2 rounded-lg bg-red-500 text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Header;

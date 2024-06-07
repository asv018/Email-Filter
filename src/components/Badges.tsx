import React from "react";

function Badges({ type }: { type: string }) {
  if (type === "Important") {
    return (
      <>
        <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded ">
          Important
        </span>
      </>
    );
  } else if (type === "Spam") {
    return (
      <>
        <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded ">
          Spam
        </span>
      </>
    );
  } else if (type === "Promotion") {
    return (
      <>
        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded ">
          Promotion
        </span>
      </>
    );
  } else if (type === "Marketting") {
    return (
      <>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded ">
          Marketting
        </span>
      </>
    );
  } else if (type === "Social") {
    return (
      <>
        <span className="bg-purple-100 text-purple-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded ">
          Social
        </span>
      </>
    );
  } else {
    return (
      <>
        <span className="bg-orange-100 text-orange-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded ">
          General
        </span>
      </>
    );
  }
}

export default Badges;

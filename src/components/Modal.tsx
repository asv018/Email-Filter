import { X } from "lucide-react";
import React from "react";
import Badges from "./Badges";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

function Modal({ modalContent, modalOpen, setModalOpen }: any) {
  return (
    <>
      {modalOpen && (
        <div className="fixed right-0 top-0 h-screen isolate aspect-video rounded-xl bg-white/80 shadow-lg ring-1 ring-black/5 overflow-y-auto duration-200  border w-full lg:w-2/4 px-4 py-2">
          <div className="">
            <button
              onClick={() => {
                setModalOpen(false);
              }}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex justify-end">
              {modalContent.type && <Badges type={modalContent.type} />}
            </div>
            <h1 className="font-bold">
              <Markdown remarkPlugins={[remarkGfm]}>
                {modalContent.snippet}
              </Markdown>
            </h1>
            <Markdown remarkPlugins={[remarkGfm]}>
              {modalContent.body}
            </Markdown>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;

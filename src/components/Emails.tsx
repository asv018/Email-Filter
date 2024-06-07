import axios from "axios";
import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useLocalStorage } from "usehooks-ts";
import remarkGfm from "remark-gfm";
import Badges from "./Badges";
import Modal from "./Modal";
function Emails({ openAI }: any) {
  const [value, setValue, removeValue] = useLocalStorage("emails", []);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent]= useState();
  const [defaultNumber, setDefaultNumber] = useState(15);
  useEffect(() => {
    async function getEmails() {
      const { data } = await axios.get("/api/emails", {
        headers: {
          defaultnumber: defaultNumber,
        },
      });
      console.log(data);
      setValue(data);
    }
    getEmails();
  }, [defaultNumber]);

  const onClassify = async () => {
    let { data } = await axios.post("/api/classify", {
      openai_api: openAI,
      emails: value,
    });
    setValue(data.emails);
  };
  return (
    <>
    <Modal setModalContent={setModalContent} setModalOpen={setModalOpen} modalContent={modalContent} modalOpen={modalOpen} />
      <div className="flex flex-col space-y-6 max-w-3xl mx-auto px-2 py-6 my-10">
        {/* {value.length} */}
        <div className="flex justify-between">
          <select
            className="border rounded-lg px-3"
            onChange={(e: any) => {
              setDefaultNumber(e.target.value);
            }}
            name=""
            id=""
          >
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="50">50</option>
          </select>
          <button
            onClick={onClassify}
            className="px-3 py-2 bg-black text-white rounded-lg"
          >
            Classify
          </button>
        </div>
        <div className="flex  w-full flex-col space-y-4">
          {value.map((email: any, index:number) => {
            return (
              <>
                <div key={index} onClick={()=>{
                  setModalContent(email);
                  setModalOpen(true);
                  
                }} className="border hover:cursor-pointer w-full rounded-lg px-3 py-3 overflow-x-auto">
                  <div className="flex justify-end">
                  {email.type && <Badges type={email.type} />}
                  </div>
                  <h1 className="font-bold">
                    <Markdown remarkPlugins={[remarkGfm]}>
                      {email.snippet.slice(0, 80)}
                    </Markdown>
                  </h1>
                  <Markdown remarkPlugins={[remarkGfm]}>
                    {email.body.slice(0, 150) + "..."}
                  </Markdown>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Emails;

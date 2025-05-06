"use client";

import { assets } from "@/assets/assets";
import Message from "@/components/Message";
import Promptbox from "@/components/Promptbox";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [expand, setexpand] = useState(false);
  const [message, setmessage] = useState([]);
  const [isloading, setisloading] = useState(false);
  return (
    <main>
      <div className="flex h-screen">
        <Sidebar expand={expand} setexpand={setexpand} />
        {/* side-bar */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-8 bg-[#292a2d] text-white relative">
          <div className="md:hidden absolute px-4 top-6 flex items-center justify-between w-full">
            <Image
              onClick={() => (expand ? setexpand(false) : setexpand(true))}
              className="rotate-180"
              src={assets.menu_icon}
              alt=""
            />
            <Image className="opacity-70" src={assets.chat_icon} alt="" />
          </div>
          {message.length === 0 ? (
            <>
              <div className="flex items-center gap-3">
                <Image src={assets.logo_icon} alt="" className="h-16" />
                <p className="text-2xl font-medium">Hi, I'm DeepSeek.</p>
              </div>
              <p className="text-sm mt-2">How can I help you today?</p>
            </>
          ) : (
            <div>
              <Message role={"user"} content={"what is next js"} />
            </div>
          )}
          {/* promt-box */}

          <Promptbox isloading={isloading} setisloading={setisloading} />
          <p className="texxt-xs absolute bottom-1 texxt-gray-500">
            AI-generated, for reference only{" "}
          </p>
        </div>
      </div>
    </main>
  );
}

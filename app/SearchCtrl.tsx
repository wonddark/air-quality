"use client";

import { FormEventHandler, useRef } from "react";
import { useRouter } from "next/navigation";

const SearchCtrl = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { push } = useRouter();
  const sendQuery: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (inputRef.current?.value) {
      push(`/city/${inputRef.current.value}`);
    }
  };
  return (
    <form onSubmit={sendQuery} className="w-full h-full flex">
      <input
        type="search"
        ref={inputRef}
        className="flex-1 border-2 border-slate-400 px-2 py-1 rounded-s-lg outline-0 focus:bg-slate-50"
      />
      <button
        type="submit"
        className="px-3 rounded-e-lg bg-slate-400 text-slate-900 hover:brightness-110"
      >
        Buscar
      </button>
    </form>
  );
};

export default SearchCtrl;

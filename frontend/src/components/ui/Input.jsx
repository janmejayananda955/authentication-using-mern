import React, { useState } from "react";

const Input = ({
  name,
  type,
  placeholder,
  value,
  onChange,
  disabled,
  required,
  className,
  label,
}) => {
  const [show, setShow] = useState(false);
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <label className="text-sm font-semibold text-zinc-300">{label}</label>}
      <div className="relative flex items-center w-full">
        <input
          name={name}
          type={type === "password" && show ? "text" : type}
          placeholder={placeholder}
          className={`w-full bg-black/60 border border-zinc-700/80 rounded-lg px-4 py-3 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-zinc-100 placeholder-zinc-500 text-sm ${type === "password" ? "pr-12" : ""} ${className || ""}`}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-zinc-400 hover:text-white transition-colors focus:outline-none"
          >
            {show ? "Hide" : "Show"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;

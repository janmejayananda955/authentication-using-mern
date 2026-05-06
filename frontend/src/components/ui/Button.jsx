import React from "react";

const Button = ({ onClick, isSubmiting, className, type = "button", children }) => {
  return (
    <div>
      <button
        type={type}
        className={`relative w-full overflow-hidden rounded-lg bg-indigo-600 px-4 py-3.5 text-sm font-bold text-white shadow-[0_0_15px_rgba(79,70,229,0.3)] transition-all hover:bg-indigo-500 hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed ${className || ""}`}
        disabled={isSubmiting}
        onClick={onClick}
      >
        <div className="flex items-center justify-center gap-2">
          {isSubmiting && (
            <svg className="h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
          {isSubmiting ? "Processing..." : children || "Submit"}
        </div>
      </button>
    </div>
  );
};

export default Button;

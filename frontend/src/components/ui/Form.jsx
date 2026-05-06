import React from 'react'

const Form = ({ children, className, onSubmit }) => {
  return (
    <div>
      <form onSubmit={onSubmit} className={`flex flex-col gap-6 w-full ${className || ""}`}>
        {children}
      </form>
    </div>
  );
};

export default Form
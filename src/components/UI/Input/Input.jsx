import React, { forwardRef, useState } from "react";
import { Field, ErrorMessage } from "formik";

const Input = (
  { type = "text", name, label, className, input, error, full, ...props },
  ref
) => {
  return (
    <div className={className ? className : ""}>
      <label className="mb-3">{label}</label>

      <div className="">
        <Field
          type={type}
          name={name}
          id={name}
          className={`input input-bordered w-full max-w-sm`}
          {...props}
        />
      </div>

      <ErrorMessage name={name}>
        {(msg) => <p className="text-error text-xs mt-1">{msg}</p>}
      </ErrorMessage>
    </div>
  );
};

export default forwardRef(Input);

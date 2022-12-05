import React, { forwardRef, useState } from "react";
import { Field, ErrorMessage } from "formik";

interface Props {
  name: string;
  label: string;
  className?: string;
  full?: boolean;
  placeholder?: string;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ name, label, className, full, ...props }, ref): JSX.Element => {
    return (
      <div className={className ? className : ""}>
        <label className="mb-3">{label}</label>

        <div className="">
          <Field
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
  }
);

export default Input;

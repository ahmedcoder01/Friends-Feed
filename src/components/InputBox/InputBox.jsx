import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { getAuth } from "../../store/slices/authSlice";
import Button from "../../components/UI/Button/Button";
import usePublishPost from "../../hooks/usePublishPost";
import useToast from "../../hooks/useToast";
import { useQuery } from "@tanstack/react-query";
import { createPost } from "../../client";

function InputBox({
  onSubmit,
  onChange,
  isLoading,
  isError,
  isValidationError,
}) {
  //TODO: make this component reusable
  const { user } = useSelector(getAuth);

  const textRef = useRef();

  return (
    <form
      onSubmit={(e) => {
        onSubmit(e, textRef.current.value);
      }}
      aria-label="Create a post"
      className="mt-10 bg-base-300 rounded-xl p-5 flex flex-col gap-4"
    >
      <div className="flex">
        <img
          src={user?.picture}
          alt="profile pic"
          className="rounded-full w-11 h-11 mr-4"
        />

        <textarea
          onChange={onChange}
          className={`textarea w-full ${
            isValidationError || isError ? "border-error" : ""
          }`}
          placeholder="Interact with your community"
          ref={textRef}
        ></textarea>
      </div>

      <div className="flex justify-end">
        <Button type="submit" loading={isLoading} disabled={true}>
          Post
        </Button>
      </div>
    </form>
  );
}

export default InputBox;

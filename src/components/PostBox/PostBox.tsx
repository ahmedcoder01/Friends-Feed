import React, { FC, FormEvent, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getAuth } from "../../store/slices/authSlice";
import Button from "../UI/Button/Button";
import useToast from "../../hooks/useToast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PostReq } from "../../types";
import { createPostReq } from "../../client";

interface InputBoxProps {
  wrapperStyles?: string;
  onSuccess?: () => void;
}

const PostBox: FC<InputBoxProps> = ({ wrapperStyles, onSuccess }) => {
  //TODO: make this component reusable
  const { user } = useSelector(getAuth);
  const [isValidationError, setIsValidationError] = useState<boolean>(false);

  const textRef = useRef<HTMLTextAreaElement>(null);

  const {
    mutateAsync: createPostAsync,
    isLoading,
    isError,
  } = useMutation({
    mutationKey: ["createPost"],
    mutationFn: (data: PostReq) => {
      return createPostReq(data);
    },
  });

  async function handleCreatePost(e: FormEvent, text: string) {
    e.preventDefault();

    const isEmpty = text.trim().length === 0;
    if (isEmpty) {
      setIsValidationError(true);
      return;
    }
    await createPostAsync({ text });
    onSuccess && onSuccess();
  }

  return (
    <form
      onSubmit={(e: FormEvent<HTMLFormElement>) => {
        if (!textRef.current) return;
        handleCreatePost(e, textRef.current.value);

        //TODO: imporve UX here so that the field doesn't get cleared if error occurs
        textRef.current.value = "";
      }}
      aria-label="Create a post"
      className={`mt-10 bg-base-300 rounded-xl p-5 flex flex-col gap-4 ${wrapperStyles}`}
    >
      <div className="flex">
        <img
          src={user?.picture || undefined}
          alt="profile pic"
          className="rounded-full w-11 h-11 mr-4"
        />

        <textarea
          className={`textarea w-full ${
            isValidationError || isError ? "border-error" : ""
          }`}
          placeholder="Interact with your community"
          ref={textRef}
        ></textarea>
      </div>

      <div className="flex justify-end">
        <Button type="submit" loading={isLoading}>
          Post
        </Button>
      </div>
    </form>
  );
};

export default PostBox;

import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { getAuth } from "../../store/slices/authSlice";
import Button from "../../components/UI/Button/Button";
import usePublishPost from "../../hooks/usePublishPost";

function InputBox() {
  const { user } = useSelector(getAuth);
  const { post, loading, error, setError } = usePublishPost();

  const textRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    const isEmpty = textRef.current.value.trim().length === 0;
    if (isEmpty) {
      setError("Field is required");
      return;
    }

    const data = {
      text: textRef.current.value,
    };
    await post(data);
    // check if post was successful after await
    if (!error) {
      e.target.reset();
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
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
          className={`textarea w-full ${error ? "border-error" : ""}`}
          placeholder="Interact with your community"
          ref={textRef}
        ></textarea>
      </div>

      <div className="flex justify-end">
        <Button type="submit" loading={loading}>
          Post
        </Button>
      </div>
      {error && <p className="text-error">{error}</p>}
    </form>
  );
}

export default InputBox;

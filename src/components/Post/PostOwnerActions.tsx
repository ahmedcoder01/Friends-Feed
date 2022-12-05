import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import { deletePost } from "../../client";
import { Post } from "../../types";

interface Props {
  postId: Pick<Post, "id">;
}

const PostOwnerActions = ({ postId }: Props): JSX.Element => {
  console.log(postId);

  const deleteMuation = useMutation({
    mutationKey: ["deletePost"],
    mutationFn: () => {
      return deletePost(postId);
    },
  });

  async function deletePostHandler() {
    deleteMuation.mutate();
  }

  return (
    <div className="dropdown dropdown-left p-4 flex items-center ">
      <span tabIndex={0} className="cursor-pointer">
        <BsThreeDotsVertical size="1.2rem" />
      </span>
      <ul
        tabIndex={0}
        className="dropdown-content menu max-sm:p-1 sm:p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <Link to={`/post/${postId}/edit`}>Edit</Link>
        </li>

        <li onClick={deletePostHandler}>
          <a className="text-red-600">Delete</a>
        </li>
      </ul>
    </div>
  );
};

export default PostOwnerActions;

import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAuth } from "../../store/slices/authSlice";
import { getRelativeTime } from "../../utils/helpers";
import ProfileWithTimestamp from "../ProfileWithTimestamp/ProfileWithTimestamp";
import PostActions from "./PostActions";
import { BsThreeDotsVertical } from "react-icons/bs";
import PostOwnerActions from "./PostOwnerActions";
import { Post } from "../../types";

interface Props {
  data: Post;
}

const PostItem = ({ data }: Props): JSX.Element => {
  const { user } = useSelector(getAuth);
  const { user: postedUser, text, id, createdAt } = data;

  const postOwner = user?.id === postedUser.id;

  return (
    <div className="card shadow-x w-full bg-base-300 mb-12">
      {/* user & post details */}
      <div className="flex justify-between ">
        <ProfileWithTimestamp timestamp={createdAt} user={postedUser} />
        {postOwner && <PostOwnerActions postId={id} />}
      </div>

      <div className="card-body">
        <p>{text}</p>
      </div>
      {/* when images are used, uncomment this */}
      {/* <figure>{image && <img src={image} alt="post-image" />}</figure> */}

      {/* post actions */}
      {/* horizontal line */}
      <hr className="border-1 border-gray-300" />
      <PostActions postId={id} />
    </div>
  );
};

export default PostItem;

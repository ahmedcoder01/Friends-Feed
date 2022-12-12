import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { getAuth } from "../../store/slices/authSlice";

import ProfileWithTimestamp from "../ProfileWithTimestamp/ProfileWithTimestamp";
import PostActions from "./PostActions";
import PostOwnerActions from "./PostOwnerActions";
import { Post } from "../../types";

interface Props {
  data: Post;
}

const PostItem = ({ data }: Props): JSX.Element => {
  const { user } = useSelector(getAuth);
  const { user: postedUser, text, id, createdAt, likeId } = data;

  const postOwner = user?.id === postedUser.id;

  return (
    <div className="card rounded-lg shadow-x w-full bg-base-300 mb-12">
      {/* user & post details */}
      <div className="flex justify-between p-6 pb-0">
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

      <PostActions postId={id} likeId={likeId} />
    </div>
  );
};

export default PostItem;

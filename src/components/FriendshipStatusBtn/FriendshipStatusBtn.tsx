import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  acceptFriendRequest,
  addFriend,
  rejectFriendRequest,
} from "../../client";
import useToast from "../../hooks/useToast";
import { FriendshipStatus } from "../../types";
import Button from "../UI/Button/Button";

type Props = {
  currentStatus: FriendshipStatus;
  userId: number;
};

const FriendshipStatusBtn = ({ currentStatus, userId }: Props) => {
  const [status, setStatus] = useState<FriendshipStatus>(currentStatus);
  const notify = useToast();

  const Friendships = {
    FRIENDS: "FRIENDS",
    PENDING_SENT_BY_YOU: "PENDING_SENT_BY_YOU",
    PENDING_SENT_BY_USER: "PENDING_SENT_BY_USER",
    NOT_FRIENDS: "NOT_FRIENDS",
    REJECTED_BY_USER: "REJECTED_BY_USER",
  };

  //* MUTATIONS AND ACTIONS
  const addMutation = useMutation({
    mutationFn: () => addFriend(userId),
    onSuccess: (data) => {
      console.log(data);
      setStatus("PENDING_SENT_BY_YOU");
    },

    onError: (error) => {
      notify("Could not add friend", "error");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: () => rejectFriendRequest(userId),
    onSuccess: (data) => {
      console.log(data);
      setStatus("NOT_FRIENDS");
    },
    onError: (error) => {
      notify("Could not reject friend request", "error");
    },
  });

  const acceptMutation = useMutation({
    mutationFn: () => acceptFriendRequest(userId),
    onSuccess: (data) => {
      notify("Friend request accepted", "success");
      setStatus("FRIENDS");
    },
    onError: (error) => {
      notify("Could not accept friend request", "error");
    },
  });

  //* UI MINI COMPONENTS
  const AlreadyFriends = (
    <div className="dropdown dropdown-bottom dropdown-end">
      <label tabIndex={0} className="">
        <Button className="btn btn-primary">Friends</Button>
      </label>

      <ul
        tabIndex={0}
        className="mt-2 dropdown-content menu p-2 shadow bg-base-300 rounded-box w-52"
      >
        <li>
          {/* //! ask the backend dev to add a unfriend endpoint */}
          <span>Unfriend</span>
        </li>
      </ul>
    </div>
  );

  const PendingByYou = (
    <div className="dropdown dropdown-bottom dropdown-end">
      <label tabIndex={0} className="">
        <Button className="btn btn-primary">Pending</Button>
      </label>

      <ul
        tabIndex={0}
        className="mt-2 dropdown-content menu p-2 shadow bg-base-300 rounded-box w-52"
      >
        <li>
          {/* //! ask the backend dev to add a cancel req endpoint */}
          <span>Cancel Request</span>
        </li>
      </ul>
    </div>
  );

  const PendingByHim = (
    <Button className="btn btn-primary" onClick={() => acceptMutation.mutate()}>
      Accept Request
    </Button>
  );

  const Rejected = <Button className="btn btn-primary">Rejected</Button>;

  const NotFriends = (
    <Button onClick={() => addMutation.mutate()}>Add Friend</Button>
  );

  //* RENDER
  return (
    <>
      {status === Friendships.FRIENDS
        ? AlreadyFriends
        : status === Friendships.PENDING_SENT_BY_YOU
        ? PendingByYou
        : status === Friendships.PENDING_SENT_BY_USER
        ? PendingByHim
        : status === Friendships.NOT_FRIENDS
        ? NotFriends
        : status === Friendships.REJECTED_BY_USER
        ? Rejected
        : null}
    </>
  );
};

export default FriendshipStatusBtn;

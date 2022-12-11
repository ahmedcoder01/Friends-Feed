import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import {
  acceptFriendRequest,
  getFriendRequests,
  rejectFriendRequest,
} from "../../../client";
import { getRelativeTime } from "../../../utils/helpers";
import ProfileWithTimestamp from "../../ProfileWithTimestamp/ProfileWithTimestamp";
import Timestamp from "../../UI/Timestamp";
import useToast from "../../../hooks/useToast";

type Props = {};
const defaultAvatar =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";

const FriendRequestsMenu = (props: Props) => {
  const notify = useToast();

  const {
    data: friendRequestsRes,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
    staleTime: Infinity,
  });

  // accept friend request  mutation
  const {
    mutateAsync: acceptFriendRequestMutation,
    isLoading: acceptanceReqLoading,
  } = useMutation({
    mutationFn: (userId: number) => acceptFriendRequest(userId),

    onSuccess: () => {
      notify("Friend request accepted", "success");
      refetch();
    },
    onError: (error) => {
      notify("Something went wrong", "error");
    },
  });

  // reject friend request mutation
  const {
    mutateAsync: rejectFriendRequestMutation,
    isLoading: rejectionReqLoading,
  } = useMutation({
    mutationFn: rejectFriendRequest,

    onSuccess: () => {
      notify("Friend request rejected", "success");
      refetch();
    },

    onError: (error) => {
      notify("Something went wrong", "error");
    },
  });

  async function acceptFriendRequestHandler(userId: number) {
    await acceptFriendRequestMutation(userId);
  }

  async function rejectFriendRequestHandler(userId: number) {
    await rejectFriendRequestMutation(userId);
  }

  return (
    <div className=" text-center">
      {isLoading && <div>Loading...</div>}
      {isError && <div>Something went wrong</div>}
      {!isLoading && !friendRequestsRes?.requests?.length && (
        <div className="text-center">No friend requests</div>
      )}

      <ul className="flex flex-col gap-3 ">
        {friendRequestsRes?.requests?.map((friendRequest) => (
          <li key={friendRequest.id} className="">
            <div className="flex justify-between ">
              <ProfileWithTimestamp
                timestamp={friendRequest.createdAt}
                user={friendRequest.sender}
              />

              <div className="ml-4 flex  gap-3 ">
                {/* accept button */}
                <button
                  className={`btn btn-ghost`}
                  onClick={() => {
                    acceptFriendRequestHandler(friendRequest.sender.id);
                  }}
                  disabled={acceptanceReqLoading}
                >
                  Accept
                </button>
                {/* decline button */}
                <button
                  className={`btn btn-ghost`}
                  disabled={rejectionReqLoading}
                  onClick={() => {
                    rejectFriendRequestHandler(friendRequest.sender.id);
                  }}
                >
                  Decline
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendRequestsMenu;

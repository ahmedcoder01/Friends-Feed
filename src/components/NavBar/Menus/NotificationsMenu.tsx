import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getNotifications } from "../../../client";

type Props = {};

const NotificationsMenu = (props: Props) => {
  const {
    data: notificationsRes,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    staleTime: Infinity,
  });

  return (
    <div className="text-center">
      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong</p>}
      {!isLoading && !isError && !notificationsRes?.notifications.length && (
        <p>No notifications</p>
      )}

      <ul>
        {notificationsRes?.notifications.map((notitification) => {
          return (
            <li key={notitification.id}>
              <p>{notitification?.content}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NotificationsMenu;

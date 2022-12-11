import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getNotifications } from "../../../client";

type Props = {};

const NotificationDropdown = (props: Props) => {
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
    <div className="absolute top-0 right-0 w-80 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col items-center justify-center h-20">
        <h3 className="text-2xl font-bold">Notifications</h3>
      </div>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong</p>}

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

export default NotificationDropdown;

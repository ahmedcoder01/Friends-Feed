import { useQuery } from "@tanstack/react-query";
import React, { Children } from "react";
import { getNotifications } from "../../../client";
import { sortByCreatedAt } from "../../../utils/helpers";
import NotificationMenuItem from "./NotificationMenuItem";

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

      <ul className="flex flex-col ">
        {Children.toArray(
          notificationsRes?.notifications
            .sort(sortByCreatedAt)
            .map((notitification) => {
              return <NotificationMenuItem notification={notitification} />;
            })
        )}
      </ul>
    </div>
  );
};

export default NotificationsMenu;

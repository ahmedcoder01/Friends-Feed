// get relative time using Intl.RelativeTimeFormat
export function getRelativeTime(time: string): string {
  const now = new Date();
  const date = new Date(time);
  const diff = now.valueOf() - date.valueOf();
  const diffInMinutes = Math.round(diff / 1000 / 60);
  const diffInHours = Math.round(diffInMinutes / 60);
  const diffInDays = Math.round(diffInHours / 24);
  const diffInMonths = Math.round(diffInDays / 30);
  const diffInYears = Math.round(diffInMonths / 12);
  const relativeTimeFormat = new Intl.RelativeTimeFormat("en", {
    style: "long",
  });
  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60)
    return relativeTimeFormat.format(-diffInMinutes, "minute");
  if (diffInHours < 24) return relativeTimeFormat.format(-diffInHours, "hour");
  if (diffInDays < 30) return relativeTimeFormat.format(-diffInDays, "day");
  if (diffInMonths < 12)
    return relativeTimeFormat.format(-diffInMonths, "month");
  return relativeTimeFormat.format(-diffInYears, "year");
}

export const isMobileOrTablet = (): boolean => {
  return (
    typeof window.orientation !== "undefined" ||
    navigator.userAgent.indexOf("IEMobile") !== -1
  );
};

export const sortByCreatedAt = (
  a: {
    createdAt: string;
  },
  b: {
    createdAt: string;
  }
) => {
  return Number(new Date(b.createdAt)) - Number(new Date(a.createdAt));
};

export const defaultAvatar =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";

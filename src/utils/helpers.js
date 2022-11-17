// get relative time using Intl.RelativeTimeFormat
export function getRelativeTime(time) {

    const now = new Date();
    const date = new Date(time);
    const diff = now - date;
    const diffInMinutes = Math.round(diff / 1000 / 60);
    const diffInHours = Math.round(diffInMinutes / 60);
    const diffInDays = Math.round(diffInHours / 24);
    const diffInMonths = Math.round(diffInDays / 30);
    const diffInYears = Math.round(diffInMonths / 12);
    const relativeTimeFormat = new Intl.RelativeTimeFormat("en", {
        style: "long",
    });
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return relativeTimeFormat.format(-diffInMinutes, "minute");
    if (diffInHours < 24) return relativeTimeFormat.format(-diffInHours, "hour");
    if (diffInDays < 30) return relativeTimeFormat.format(-diffInDays, "day");
    if (diffInMonths < 12) return relativeTimeFormat.format(-diffInMonths, "month");
    return relativeTimeFormat.format(-diffInYears, "year");
}
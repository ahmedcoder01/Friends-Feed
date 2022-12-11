import React from "react";
import { getRelativeTime } from "../../utils/helpers";

type Props = {
  timestamp: string;
};

const Timestamp = ({ timestamp }: Props) => {
  return (
    <span className="text-sm text-gray-400">{getRelativeTime(timestamp)}</span>
  );
};

export default Timestamp;

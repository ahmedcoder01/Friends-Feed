import axios from "axios";
import { useEffect, useState } from "react";
import { globalInstance } from "../axios/axiosInstances";
import feedMock from "../mock/feed.json";

function useFeed() {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    //TODO: send feed request
    // globalInstance.get("/feed").then((res) => {
    //   setFeed(res.data);
    // }).catch((err) => {
    //   console.log(err);
    //   setError(err.message);
    // }).finally(() => {
    //   setLoading(false);
    // });

    //* use mock data for now
    setFeed(feedMock);
    setLoading(false);


  }, [feed]);

  return { feed, loading, error };
}

export default useFeed;

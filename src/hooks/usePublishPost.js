import React, { useState } from "react";
import { globalInstance } from "../axios/axiosInstances";

function usePublishPost() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const post = async (data) => {
    setError(null);
    setLoading(true);

    try {
      const response = await globalInstance.post("/posts", data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { post, loading, error, setError };
}

export default usePublishPost;

import axios from "axios";
import { useEffect, useState } from "react";

function useFriends(user) {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    //TODO: send feed request
    axios
      .get("https://react-http-8ba6b-default-rtdb.firebaseio.com/friends.json")
      .then((res) => {
        const data = res.data;
        console.log(res.data);
        if (data) setFriends(data);
      });
  }, [friends]);

  return friends;
}

export default useFriends;

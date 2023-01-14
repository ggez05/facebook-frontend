import { Dots } from "../../svg";
import { stories } from "../../data/home";
import AddFriendSmallCard from "./AddFriendSmallCard";
import axios from "axios";
import { useEffect, useState } from "react";
export default function PplYouMayKnow() {
  const [users, setUsers] = useState([]);
  const getusers = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getfiveusers`
      );
      setUsers(data.users);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getusers();
  }, []);
  return (
    <div className="pplumayknow">
      <div className="pplumayknow_header">
        People You May Know
        <div className="post_header_right ppl_circle hover1">
          <Dots />
        </div>
      </div>
      <div className="pplumayknow_list">
        {users.length > 0
          ? users.map((item, i) => <AddFriendSmallCard item={item} key={i} />)
          : ""}
      </div>
    </div>
  );
}

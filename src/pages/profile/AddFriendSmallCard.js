export default function AddFriendSmallCard({ item }) {
  return (
    <div className="addfriendCard">
      <div className="addfriend_imgsmall">
        <img src={item.picture} alt="" />
        <div className="addfriend_infos">
          <div className="addfriend_name">
            {item.username.length > 11
              ? `${item.username.substring(0, 11)}...`
              : item.username}
          </div>
          <div className="light_blue_btn">
            <img
              src="../../../icons/addFriend.png"
              alt=""
              className="filter_blue"
            />
            Add Friend
          </div>
        </div>
      </div>
    </div>
  );
}

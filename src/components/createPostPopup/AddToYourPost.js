import { Dots, Feeling, Photo } from "../../svg";
export default function AddToYourPost({ setShowPrev }) {
  return (
    <div className="addtoyourpost">
      <div className="addto_text">Add to your post</div>
      <div
        className="post_header_right hover1"
        onClick={() => {
          setShowPrev(true);
        }}
      >
        <Photo color="#45bd62" />
      </div>
      <div className="post_header_right hover1">
        <Feeling color="#f7b928" />
      </div>
    </div>
  );
}

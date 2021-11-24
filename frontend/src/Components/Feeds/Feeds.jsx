import ViewFeed from "./ViewFeed/ViewFeed";
import PostFeed from "./PostFeed/PostFeed";
import { useState } from "react";

const Feeds = (props) => {
  let [update, setUpdate] = useState();

  const feedUpdate = (value) => {
    setUpdate(!update);
  };
  return (
    <>
      <PostFeed feedUpdate={feedUpdate} />
      <ViewFeed tweetsUpdated={props.tweetsUpdated} update={update} />
    </>
  );
};

export default Feeds;

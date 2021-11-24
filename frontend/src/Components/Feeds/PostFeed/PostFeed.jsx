import { Card } from "react-bootstrap";
import React from "react";
import { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-regular-svg-icons/faImage";
import { AuthContext } from "../../../Context/auth-context";
import { faSmile } from "@fortawesome/free-regular-svg-icons/faSmile";

const ViewFeed = (props) => {
  const auth = useContext(AuthContext);

  const [tweetText, setTweetText] = useState();

  const handleSubmit = async event => {
    event.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/tweets/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            uid: auth.uid,
            tweet: tweetText
        })
    })
    props.feedUpdate(true);
    setTweetText("");

    console.log(response)

  }

  return (
    <Card className="mb-n2 w-100 pb-1 mt-n2"  style={{ padding: "0",marginRight:"2rem" }} >
      <Card.Body>
        <Card.Title>Home</Card.Title>
        <Card.Text>
          <textarea
            className="w-100 p-2"
            style={{ maxHeight: "80vh" }}
            name="text"
            onChange={(e)=> setTweetText(e.target.value)}
            value={tweetText}
            placeholder="What's happening?"
          ></textarea>
          <div className="border-top d-flex justify-content-between align-items-center pt-2">
            <div style={{ fontSize: "1.5em" }}>
             
              <button className=" text-primary btn btn-lg rounded-circle btn-naked-primary p-2">
              <FontAwesomeIcon size="lg" icon={faSmile} />
              </button>
              <button className=" text-primary btn btn-lg rounded-circle btn-naked-primary p-2">
                <FontAwesomeIcon size="lg" icon={faImage} />
              </button>
            </div>
            <div className="right">
              <button
                onClick={handleSubmit}
                className="btn btn-primary rounded-pill px-3 py-2 font-weight-bold"
              >
                Tweet
              </button>
            </div>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ViewFeed;

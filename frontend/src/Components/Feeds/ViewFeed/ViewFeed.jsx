import { useEffect, useState, useContext } from "react";
import Spinner from "../../Spinner/Spinner";
import { Card, Row, ListGroup, Figure } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons/faHeart";
import { faReply } from "@fortawesome/free-solid-svg-icons/faReply";
import { AuthContext } from "../../../Context/auth-context";
const PostFeed = ({ update, tweetsUpdated }) => {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedTweets, setLoadedTweets] = useState();

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/tweets/${auth.uid}`);
        const responseData = await response.json();
        console.log(response, responseData);
        setLoadedTweets(responseData.tweets);
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    };
    sendRequest();
  }, [update, tweetsUpdated]);

  return (
    <ListGroup>
      {loadedTweets && loadedTweets.length > 0 ? (
        loadedTweets.map((post) => {
          return (
            <ListGroup.Item
              className="px-3"
              action
              as={"div"}
              style={{ padding: "0", border: "none" }}
            >
              <Row className="d-flex px-3 pb-1 mt-n2 text-muted"></Row>

              <Card className="mb-n2 w-100">
                <Card.Body>
                  <div style={{ display: "flex" }}>
                    <div className="rounded-circle">
                      <Figure
                        className="bg-border-color rounded-circle mr-2 overflow-hidden"
                        style={{ height: "50px", width: "50px" }}
                      >
                        <Figure.Image
                          src={
                            post.image
                              ? post.user.profile_image_url
                              : "/img/default-profile-vector.svg"
                          }
                          className="w-100 h-100"
                        />
                      </Figure>
                    </div>
                    <div style={{ marginLeft: "1rem" }}>
                      <div className="d-flex">
                        <div className="text-dark font-weight-bold mr-1">
                          {post.name}
                        </div>
                        <span className="text-muted mr-1">@{post.uid}</span>
                        <pre className="m-0 text-muted">{" - "}</pre>
                        <span className="text-muted">
                          {new Date(post.createdDate)
                            .toUTCString()
                            .slice(5, 11)}
                        </span>
                      </div>
                      <div className="mb-n1 mt-1">
                        <blockquote className="mb-1 mw-100">
                          <div className="mw-100 overflow-hidden">
                            {post.tweet}
                          </div>
                        </blockquote>
                      </div>
                    </div>
                  </div>

                  <Row className="d-flex justify-content-end align-items-center position-static">
                    <div className="d-flex align-items-center">
                      <div className="btn btn-naked-secondary rounded-pill high-index">
                        <FontAwesomeIcon
                          style={{ fontSize: "1.2em" }}
                          className="mb-1 text-muted"
                          icon={faReply}
                        />
                      </div>
                      <button className="btn btn-naked-danger rounded-pill high-index">
                        <FontAwesomeIcon icon={faHeart} />
                      </button>
                    </div>
                  </Row>
                </Card.Body>
              </Card>
            </ListGroup.Item>
          );
        })
      ) : isLoading ? (
        <Spinner />
      ) : (
        <h1 style={{ padding: "2rem", margin: "4rem" }}>No tweets</h1>
      )}
    </ListGroup>
  );
};

export default PostFeed;

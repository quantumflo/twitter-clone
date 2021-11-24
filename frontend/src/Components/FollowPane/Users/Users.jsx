import { useEffect, useState, useContext } from "react";
import { ListGroup, Row, Col, Button } from "react-bootstrap";
import Spinner from "../../Spinner/Spinner";
import { AuthContext } from "../../../Context/auth-context";

export default (props) => {
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState();
  const [loadedUsers, setLoadedUsers] = useState();
  const [newFollow, setNewFollow] = useState();

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/users/${auth.uid}`
        );
        const responseData = await response.json();
        console.log( responseData.message);
        setLoadedUsers(responseData.users);
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    };
    sendRequest();
  }, [newFollow]);

  const follow =async (followUid) => {
    let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${auth.uid}`, {
      method: 'PATCH',
      body: JSON.stringify({
        followUid: followUid,
      }),
      headers: {
          'Content-Type': 'application/json'
      }
  })
  const responseData = await response.json();
  setNewFollow(!newFollow);
  console.log(response, responseData);
  console.log("LOADED:", loadedUsers);
  props.updateTweet(true);
  
  };

  return (
    <>
      <ListGroup className={"border-bottom "} variant="flush">
        {loadedUsers && loadedUsers.length ? (
          loadedUsers.map((user) => {
            return (
              <ListGroup.Item
                className="px-1 text-truncate"
                action
                key={user.uid}
                user={user}
                to={`/user/${user.uid}`}
              >
                <div style={{ display: "flex", alignItems: "flex-start" }}>
                  <img
                    width={50}
                    height={50}
                    className="rounded-circle mx-1"
                    src={
                      user.profile_image_url_https ||
                      "/img/default-profile-vector.svg"
                    }
                    alt=""
                  />
                  <div style={{ flex: "1 1" }}>
                    <Row>
                      <Col className="pr-5 pr-lg-4 pr-xl-2" xs="8">
                        <p className="text-dark mb-0 text-truncate text-capitalize font-weight-bold">
                          {user.name}
                        </p>
                        <p className="text-muted text-truncate mt-n1">
                          {" "}
                          @{user.uid}
                        </p>
                      </Col>
                      <Col
                        className="d-flex align-items-center justify-content-end px-1"
                        xs="4"
                      >
                        <Button
                          onClick={()=>follow(user.uid)}
                          className="rounded-pill px-3 py-1 font-weight-bold"
                        >
                          <span>Follow</span>
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </div>
              </ListGroup.Item>
            );
          })
        ) : isLoading? <Spinner />: <h4 style={{padding: "1rem"}}> No users</h4>}
      </ListGroup>
    </>
  );
};

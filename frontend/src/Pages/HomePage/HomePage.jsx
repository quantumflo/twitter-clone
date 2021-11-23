import React, {useState} from 'react';
import Feeds from "../../Components/Feeds/Feeds";
import FollowPane from "../../Components/FollowPane/FollowPane";
import MenuBar from "../../Components/MenuBar/MenuBar";
import MediaQuery from 'react-responsive'
import { Row, Col } from 'react-bootstrap'
import "./HomePage.css"

const HomePage = () => {
  const [updateTweet, setUpdateTweet] = useState();
  const updateTweets = (value) => {
    setUpdateTweet(!updateTweet);
  }
  return (
    
          <Row className="home-page-row">
            <MediaQuery minWidth={576}>
              <Col sm="1" xl="2" className="d-flex flex-column align-items-end p-0 sticky-top vh-100">
                <MenuBar />
              </Col>
            </MediaQuery>
            <Col sm="11" xl="6" lg="4" md="4">
                <Feeds tweetsUpdated={updateTweet}/>
            </Col>
            <MediaQuery minWidth={322}>
                <Col lg="4" xl="4" className="vh-100 overflow-y-auto hide-scroll sticky-top">
                <FollowPane homeTweetUpdate={updateTweets}/>
                </Col>
            </MediaQuery>
           
          </Row>
  );
}

export default HomePage;

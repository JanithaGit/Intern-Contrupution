
import React from 'react';
import i from "react-icofont";
import { Button, Col, Modal, ModalFooter, CardImg, Card, UncontrolledCollapse, Row } from "reactstrap";
import moment from "moment";
import '../../../../components/Articles/AticleTable/ArticleTable.scss'

const App = (props) => {





  return <Modal isOpen={true} className={"modal-main"}>

    <p className={"modal-hedline"}>{props.body.headline}</p>
    <Row className={"row-one"}>



      <Col sm="4" >
        <img src={props.body.images[0].imageUrl} className={"modal-img"} alt="." />

        <p className={" more-btn"} id="toggler" style={{ marginBottom: '1rem' }}>
          More images<i class="icofont-hand-up"></i>
        </p>
      </Col>

      <Col sm="8">
        <ul>
          <li>{`Create Date and Time : ${moment(props.body.create).format("YYYY-MM-DD hh:mm a")}`}</li>
          <li>{`Publish Date and Time : ${moment(props.body.update).format("YYYY-MM-DD hh:mm a")}`}</li>
          {/*props.body.create !== props.body.update ? */}
          <br />
          <li>{`No of Views: ${props.body.noOfViews}`} </li>
          <li>{`No of Likes: ${props.like}`} </li>
          <br />
          <li>{props.body.state === 1 ? "PUBLISH" : props.body.state === 2 ? "HIDE" : props.body.state === 0 ? "DRAFT" : "-"} </li>
        </ul>
      </Col>
    </Row>

    <UncontrolledCollapse toggler="#toggler">

      <Row className={"row-one"}>
        {
          props.body.images.map(image => (

            <Col lg="3" key={image.id} className={"more-col"}>
              <Card className={"card"}>
                <CardImg className={"image-grid"} src={image.imageUrl} alt="test">
                </CardImg>
              </Card>
            </Col>

          ))
        }
      </Row>
    </UncontrolledCollapse>

    <Row className={"row-one"}>
      <Col>
        <div className={"modal-text"}>
          <p className={"article-content"} dangerouslySetInnerHTML={{ __html: props.body.content }} />
        </div>
      </Col>
    </Row>

    <ModalFooter>
      <Button className="com-btn close-btn" onClick={() => props.modalHandler(null)}>Close</Button>
    </ModalFooter>
  </Modal>
};
export default App;

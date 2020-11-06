import React from 'react';
import {Card, CardBody, Col,} from 'reactstrap';
import {Button} from "react-bootstrap";

const AppTeachersTile = (props) => {
  return (
    <Col xs="12" sm="6" lg="6">
      <div onClick={props.clickTeacher}>
        <Card
          className="text-black-50 bg-white p-1"
          tag="a"
          style={{cursor: "pointer"}}>
          <CardBody>
            <div style={{display: 'flex', overflow: "hidden"}}>
              <Button

                className="com-btn btn-primary" style={{position: 'absolute',opacity:0.5, right: 0, top: 0, borderWidth: 0}}
                onClick={(e) => {
                  e.stopPropagation();
                  props.clickTeacherEdit();
                }}>
                Edit
              </Button>
              <div style={{position: 'absolute', right: 10, bottom: 10, fontSize: '0.95em', color:'blue' }}>view More</div>
              <div
                style={{width: '80px', height: '80px', borderRadius: '40px', overflow: 'hidden', position: "relative"}}>
                <img src={props.userPic} alt={props.teacherName}
                     style={{width: '100%'}}/>
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    backgroundColor: '#00000080',
                    color: "white",
                    textAlign: "center",
                    fontSize: '0.8em',
                    cursor: "pointer"
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    props.clickProfilePicEdit();
                  }}>
                  Edit
                </div>
              </div>
              <div style={{marginLeft: '15px', display: 'flex', alignItems: 'center'}}>
                <div style={{width: '100%'}}>
                  <div className="tea-name">{props.teacherName}</div>
                  {/*<div>{props.teacherSubject}</div>*/}
                  <div className="tea-qf">{props.teacherQualification}</div>
                  <div style={{padding: '3px 10px', borderRadius: '15px', display: 'inline-block'}}
                       className="amount">
                    <div style={{fontSize: '0.8em'}}>{"Max Enrolls : " + props.maxEnroll}</div>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </Col>
  );
};

export default AppTeachersTile;

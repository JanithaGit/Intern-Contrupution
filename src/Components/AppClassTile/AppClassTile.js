import React from 'react';
import {Card,Button, CardBody, Col,} from 'reactstrap';
import CardFooter from "reactstrap/es/CardFooter";
// import {Button} from "react-bootstrap";
import Row from "react-bootstrap/Row";


function tConvert(time) {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) { // If time format correct
    time = time.slice(1);  // Remove full string match value
    time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  time.splice(3, 1);
  return time.join(''); // return adjusted time or original string
}

const AppClassTile = (props) => {
  return (
    <Col xs="12" sm="12" lg="12">
      <div className="card-wrap">
        <Card className="card-bg card-ctrl">
          <CardBody>
            <Row>

              <Col md="3" style={{
                height: '180px',
                paddingLeft: '15px',
                borderRadius: '10px',
                display: 'flex',
                overflow: 'hidden'
              }}>
                <img src={props.classPic} alt={props.teacherName}
                     className="class-img"
                     style={{minWidth: '100%', minHeight: '100%', objectFit: 'cover'}}/>
                <Button
                  className="com-btn btn-primary"
                  onClick={props.editClassPic}
                  style={{
                    position: 'absolute',
                    right: 15,
                    borderRadius:10,
                    opacity: 0.5,
                    borderWidth: 0
                  }}
                >Edit
                </Button>
              </Col>

              <Col md="6" className="mt-md-0 mt-2" style={{display: 'flex'}}>
                <div style={{width: '100%'}}>
                  <div className="sub-title">{props.className}</div>
                  <div className="sub-name">{props.Subject}</div>
                  <div>
                    {
                      props.dateTime.map((value, index) => {
                        return (
                          <div className="card-dis"
                               key={index}>{value.day + " " + tConvert(value.startTime) + " to " + tConvert(value.endTime)}</div>
                        )
                      })
                    }
                  </div>
                  <div style={{padding: '3px 10px', borderRadius: '15px', display: 'inline-block'}}
                       className="amount">
                    <div >LKR {props.price.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</div>
                  </div>
                </div>
              </Col>

              <Col md="3" className="mt-md-0 mt-2"
                   style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', minWidth: '100px',}}>
                <Button className="btn-orange com-btn " style={{marginBottom: '5px'}} onClick={props.startMeeting}>Start Class</Button>
                <Button className="btn-primary com-btn" style={{marginBottom: '5px'}} onClick={props.clickEdit}>Edit
                  Class</Button>
                <Button className="btn-primary com-btn" onClick={props.clickEnrollment}>View Enrollments</Button>
              </Col>

            </Row>
          </CardBody>
          <CardFooter>
            <div className="card-dis">
              {props.description}
            </div>
            <br/>
            <h6 className="card-topic">Syllabus</h6>
            <ol className="card-dis">
              {
                props.syllabus.split(',').map((value, index) => {
                  return (
                    <li key={index}>{value}</li>
                  )
                })
              }
            </ol>
          </CardFooter>
        </Card>
      </div>
    </Col>
  );
};

export default AppClassTile;

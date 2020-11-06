import React, {Component} from 'react';
import {Col, Row,Button} from 'reactstrap';
import AppClassTile from "../../Components/AppClassTile/AppClassTile";
import { Form} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import 'antd/dist/antd.css';
import {ToastUtil} from "../../Util/ToastUtil";
import {ValidatorUtil} from "../../Util/ValidatorUtil";
import moment from 'moment';
import ReactListInput from 'react-list-input'
import {SwalUtil} from "../../Util/SwalUtil";
import axios from "../../axios-order";
import ReactTable from "react-table";
import "react-table/react-table.css";
import {BASE_ROUTE} from "../../Constants/Constants";
import Card from "react-bootstrap/Card";

const ListInput = ({value, onChange, type = 'text', placeholder = ''}) =>
  <Form.Control
    type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
  />;

const defaultTableSize = 5;

let date = new Date();
let month = new Array(12);
month[0] = "JANUARY";
month[1] = "FEBRUARY";
month[2] = "MARCH";
month[3] = "APRIL";
month[4] = "MAY";
month[5] = "JUNE";
month[6] = "JULY";
month[7] = "AUGUST";
month[8] = "SEPTEMBER";
month[9] = "OCTOBER";
month[10] = "NOVEMBER";
month[11] = "DECEMBER";

let selectedMonth = month[date.getMonth()];

class Class extends Component {

  state = {
    showAddClassModal: false,
    showViewEnrollmentModal: false,
    showEditClassModal: false,
    showEditProfilePicModal: false,
    classes: [],
    students: [],
    loading: false,
    className: '',
    subjectName: '',
    grade: '',
    day: '',
    description: '',
    syllabus: [],
    price: '',
    startTime: '',
    endTime: '',
    selectedDayTimes: [],
    addClassFormValidated: false,
    classImage: null,
    selectedClassId: 0,
    pages: 0,
    editClassName: '',
    editSubjectName: '',
    editDayTimes: [],
    editGrade: '',
    editDescription: '',
    editPrice: '',
    editDay: '',
    editStartTime: '',
    editEndTime: '',
    editSyllabus: [],
    selectedProfilePic: null,
    editClassImage: null,

    selectMonth: selectedMonth

    // textToCopy: 'https://www.sampathathukorale.edulab.lk',
  };

  // textToCopy: window.location.origin;
  addClassForm = {};
  editClassForm = {};

  componentDidMount() {
    this.getAllClasses();
  }

  clearFormData = () => {
    this.setState({
      className: '',
      subjectName: '',
      grade: '',
      day: '',
      description: '',
      syllabus: [],
      price: '',
      startTime: '',
      endTime: '',
      selectedDayTimes: [],
      classImage: null,
    })
  };

  getAllClasses = () => {
    SwalUtil.showLoadingSwal();
    axios.get('institute/class/teacher/' + this.props.location.state.teacherId)
      .then(res => {
          SwalUtil.closeSwal();
          if (res.data.success) {
            this.setState({
              classes: res.data.body
            });
          } else {
            this.setState({
              classes: [],
            });
            SwalUtil.showErrorSwal("Something went wrong, please try again!")
          }
        }
      ).catch(err => {
      SwalUtil.closeSwal();
      console.log(err);
      SwalUtil.showErrorSwal("Something went wrong, please try again!")
    });
  };

  getUploadParams = ({meta}) => {
    return {url: 'https://httpbin.org/post'}
  };

  handleChangeStatus = async ({meta, file}, status) => {
    if (status === 'done') {
      const base64String = await this.fileToBase64(file);
      this.setState({
        classImage: base64String,
      });
    }
  };

  handleChangeStatusEdit = async ({meta, file}, status) => {
    if (status === 'done') {
      const base64String = await this.fileToBase64(file);
      this.setState({
        editClassImage: base64String,
      });
    }
  };

  fileToBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  changeState = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  changeMonth = (event) => {
    this.setState({
      selectMonth: event.target.value
    });
    this.viewAllEnrollStudents(this.state.selectedClassId, 0 , 5, event.target.value)
  };

  onAddClassModalSubmit = () => {
    if (this.validateAddClassForm()) {
      const formattedSelectedDayTimes = [];
      for (const selectedDayTime of this.state.selectedDayTimes) {
        formattedSelectedDayTimes.push({
          day: selectedDayTime.day,
          startTime: this.timeToMoment(selectedDayTime.startTime).format("hh:mm:ss"),
          endTime: this.timeToMoment(selectedDayTime.endTime).format("hh:mm:ss"),
        });
      }
      const data = {
        "name": this.state.className,
        "description": this.state.description,
        "subject": this.state.subjectName,
        "grade": this.state.grade,
        "syllabus": this.state.syllabus.join(','),
        "fee": this.state.price,
        "dayTimes": formattedSelectedDayTimes,
        "teacher": {
          "id": this.props.location.state.teacherId,
        },
        "imageBase64": this.state.classImage,
      };
      SwalUtil.showLoadingSwal();
      axios.post('institute/class', data)
        .then(res => {
            SwalUtil.closeSwal();
            if (res.data.success) {
              this.getAllClasses();
              this.clearFormData();
              this.setState({
                showAddClassModal: false
              });
              ToastUtil.showSuccessToast("Class added successfully")
            } else {
              SwalUtil.showErrorSwal("Something went wrong, please try again!")
            }
          }
        ).catch(err => {
        SwalUtil.closeSwal();
        console.log(err);
        SwalUtil.showErrorSwal("Something went wrong, please try again!")
      });
    }
  };

  validateAddClassForm = () => {

    if (ValidatorUtil.isEmpty(this.state.className)) {
      ToastUtil.showWarningToast('Please enter the class name!');
      this.addClassForm.className.focus();
      return false;
    }

    if (ValidatorUtil.isEmpty(this.state.classImage)) {
      ToastUtil.showWarningToast('Please upload class image!');
      return false;
    }

    if (ValidatorUtil.isEmpty(this.state.subjectName)) {
      ToastUtil.showWarningToast('Please enter the subject name!');
      this.addClassForm.subjectName.focus();
      return false;
    }

    if (ValidatorUtil.isEmpty(this.state.grade)) {
      ToastUtil.showWarningToast('Please select the grade!');
      this.addClassForm.grade.focus();
      return false;
    }

    if (this.state.selectedDayTimes.length <= 0) {
      ToastUtil.showWarningToast('Please add at least one class day!');
      this.addClassForm.day.focus();
      return false;
    }

    if (ValidatorUtil.isEmpty(this.state.description)) {
      ToastUtil.showWarningToast('Please enter the description!');
      this.addClassForm.description.focus();
      return false;
    }

    if (this.state.syllabus.length <= 0) {
      ToastUtil.showWarningToast('Please add at least one lesson');
      return false;
    }

    if (ValidatorUtil.isEmpty(this.state.price)) {
      ToastUtil.showWarningToast('Please enter the price!');
      this.addClassForm.price.focus();
      return false;
    }

    return true;
  };

  itemComponent = ({decorateHandle, removable, onChange, onRemove, value}) => {
    return (
      <div style={{display: "flex", alignItems: "center", marginTop: 10}}>
        {decorateHandle(<span style={{cursor: 'move', marginRight: 10, fontSize: 20}}> = </span>)}
        <ListInput value={value} onChange={onChange}/>
        <span
          onClick={removable ? onRemove : x => x}
          style={{
            cursor: removable ? 'pointer' : 'not-allowed',
            color: removable ? 'black' : 'gray',
            marginLeft: 10,
            fontWeight: "bold",
          }}>X</span>
      </div>
    )
  };

  stagingComponent = ({value, onAdd, canAdd, add, onChange}) => {
    return (
      <div style={{display: "flex", alignItems: "center", marginTop: 10}}>
        <ListInput value={value} onChange={onChange} placeholder="Enter lesson name"/>
        <Button className="com-btn" style={{
          marginLeft: 10,
         backgroundColor: canAdd ? '#293D60': '#F06334' ,
          cursor: canAdd ? 'pointer' : 'not-allowed'
        }} onClick={canAdd ? onAdd : undefined}>Add</Button>
      </div>
    )
  };

  viewAllEnrollStudents = (id, pages, size, month) => {
    SwalUtil.showLoadingSwal();
    axios.get('institute/class/' + id + '/enrolls?page=' + pages + '&size=' + size + '&month=' + month)
      .then(res => {
          SwalUtil.closeSwal();
          if (res.data.success) {
            this.setState({
              students: res.data.body.content,
              pages: res.data.body.totalPages,
              loading: false
            });
          } else {
            this.setState({
              students: [],
            });
            SwalUtil.showErrorSwal("Something went wrong, please try again!")
          }
        }
      ).catch(err => {
      console.log(err);
      SwalUtil.showErrorSwal("Something went wrong, please try again!")
    });
  };

  onEditClassModalSubmit = () => {
    const formattedSelectedDayTimes = [];
    for (const selectedDayTime of this.state.editDayTimes) {
      formattedSelectedDayTimes.push({
        day: selectedDayTime.day,
        startTime: this.timeToMoment(selectedDayTime.startTime).format("hh:mm:ss"),
        endTime: this.timeToMoment(selectedDayTime.endTime).format("hh:mm:ss"),
      });
    }
    const data = {
      "id": this.state.selectedClassId,
      "name": this.state.editClassName,
      "description": this.state.editDescription,
      "subject": this.state.editSubjectName,
      "grade": this.state.editGrade,
      "syllabus": this.state.editSyllabus.join(","),
      "fee": this.state.editPrice,
      "dayTimes": formattedSelectedDayTimes,
      "teacher": {
        "id": this.props.location.state.teacherId
      }
    };
    SwalUtil.showLoadingSwal();
    axios.put('institute/class', data)
      .then(res => {
          SwalUtil.closeSwal();
          if (res.data.success) {
            this.getAllClasses();
            this.setState({
              showEditClassModal: false
            });
            ToastUtil.showSuccessToast("Class updated successfully")
          } else {
            SwalUtil.showErrorSwal(res.data.message)
          }
        }
      ).catch(err => {
      console.log(err);
      SwalUtil.showErrorSwal("Something went wrong, please try again!")
    });
  };

  onEditClassProfilePic = () => {
    if (ValidatorUtil.isEmpty(this.state.editClassImage)) {
      ToastUtil.showWarningToast('Please select a class image!');
    } else {
      const data = {
        "id": this.state.selectedClassId,
        "imageBase64": this.state.editClassImage
      };
      SwalUtil.showLoadingSwal();
      axios.put('institute/class/image', data)
        .then(res => {
            SwalUtil.closeSwal();
            if (res.data.success) {
              this.getAllClasses();
              this.setState({
                showEditProfilePicModal: false,
                editClassImage: null
              });
              ToastUtil.showSuccessToast("Class profile picture updated successfully")
            } else {
              SwalUtil.showErrorSwal(res.data.message)
            }
          }
        ).catch(err => {
        console.log(err);
        SwalUtil.showErrorSwal("Something went wrong, please try again!")
      });
    }
  };

  startMetingHandler = (joinUrl, metingId, startUrl, password, classId) => {
    SwalUtil.showLoadingSwal();
    axios.post('institute/class/' + classId + '/start')
      .then(res => {
        SwalUtil.closeSwal();
        if (res.data.success) {
          let zoomBody = {
            zoomMeetingId: res.data.body.zoomMeetingId,
            zoomMeetingPassword: res.data.body.zoomMeetingPassword,
            zoomSignatureJwt: res.data.body.zoomSignatureJwt,
            teacherName: this.props.location.state.teacherName
          };

          this.props.history.push({pathname: `${BASE_ROUTE}/class/start`, state: JSON.stringify(zoomBody)});

        } else {
          console.log(res.data.message);
          ToastUtil.showErrorToast(res.data.message)
        }
      })
      .catch(err => {
        SwalUtil.closeSwal();
        console.log(err);
      });
  };

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

  timeToMoment = (timeString) => {
    return moment("1970-01-01 " + timeString + ":00");
  };

  render() {
    return (
      <div className="animated fadeIn" style={{marginBottom: '20px'}}>

        <Card style={{
          width: '100%',
          backgroundColor: 'white',
          padding: '10px',
          marginTop: '40px',
          marginBottom: '40px',
          borderRadius: '10px',
        }}>
          <Row style={{alignItems: 'center'}}>
            <Col xs="10" className="link-respo">
              <Row style={{alignItems: 'center'}}>
                <Col xs="5" className="link-respo">
                  <div style={{marginLeft: '25px', borderRight: '1px dashed #333'}} className="link-title">
                    Share your institute URL among students
                  </div>
                </Col>
                <Col xs="6" className="link-respo">
                  <input id='textCopy' readOnly={true}
                         className="link-style"
                         style={{color: 'blue', marginLeft: '10px', borderWidth: 0, border: 'none'}}
                         defaultValue={window.location.origin}/>
                </Col>
              </Row>
            </Col>
            <Col xs="2" className="link-respo">
              <div
                style={{
                  color:' white',
                  width: '65px',
                  padding: '5px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginRight: '10px'
                }}
                className='btn-primary float-right'
                onClick={() => {
                  let copyText = document.getElementById("textCopy");
                  copyText.select();
                  document.execCommand("copy");
                  ToastUtil.showAlertToast('URL copied to clipboard!')
                }}
              >
                <i className="fa fa-copy" style={{marginRight: '3px'}}/>
                copy
              </div>
            </Col>
          </Row>
        </Card>

        {/*<div style={{width: '100%'}} >*/}

        {/*</div>*/}
<Row>
  <Col sm="9">
  <div style={{display: 'flex',  width: '100%', marginBottom: '0px'}}><p className="sub-title">{this.props.location.state.teacherName}</p></div></Col>
  <Col sm="3">
    <div style={{display: 'flex', justifyContent: 'flex-end', width: '100%', marginBottom: '0px', paddingRight:'20px'}}>

      <Button
        className="com-btn btn-primary"
        data-toggle="modal"
        onClick={() => {
          this.setState({showAddClassModal: true});
        }}
      >+ Add New Class
      </Button>
    </div>
  </Col>
</Row>


        <Row>
          {/*View ALL Classes*/}
          {
            this.state.classes.length > 0 ? this.state.classes.map((value, index) => {
              return (
                <AppClassTile
                  key={index}
                  classPic={value.imageUrl}
                  teacherName={value.name}
                  className={value.name}
                  Subject={value.subject}
                  dateTime={value.dayTimes}
                  price={value.fee}
                  description={value.description}
                  syllabus={value.syllabus}
                  startMeeting={() => {
                    this.startMetingHandler(
                      value.zoomJoinUrl,
                      value.zoomMeetingId,
                      value.zoomStartUrl,
                      value.zoomMeetingPassword,
                      value.id
                    );
                  }}
                  clickEnrollment={() => {
                    this.setState({
                      selectedClassId: value.id,
                      selectMonth: selectedMonth,
                      showViewEnrollmentModal: true,
                    });
                  }}
                  clickEdit={() => {
                    this.setState({
                      selectedClassId: value.id,
                      editClassName: value.name,
                      editSubjectName: value.subject,
                      editDayTimes: value.dayTimes,
                      editGrade: value.grade,
                      editDescription: value.description,
                      editPrice: value.fee,
                      editSyllabus: value.syllabus.split(','),
                      showEditClassModal: true,
                    })
                  }}
                  editClassPic={() => {
                    this.setState({
                      selectedClassId: value.id,
                      selectedProfilePic: value.imageUrl,
                      showEditProfilePicModal: true,
                    });
                  }}
                />
              )
            }) : null
          }
        </Row>

        {/*ADD Class Modal*/}

        {
          this.state.showAddClassModal && (
            <Modal
              show={this.state.showAddClassModal}
              onHide={() => {
                this.setState({showAddClassModal: false});
                this.clearFormData();
              }}
              backdrop="static"
              keyboard={false}
              size="lg"
            >
              <Modal.Header closeButton>
                <Modal.Title>Add New Class</Modal.Title>
              </Modal.Header>
              <dic>
                <Modal.Body>
                  <Form.Group as={Row} controlId="className">
                    <Form.Label column sm="2">
                      Class Name
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        ref={(input) => {
                          this.addClassForm.className = input;
                        }}
                        type="text"
                        placeholder="Enter class name"
                        name="className"
                        value={this.state.className}
                        onChange={this.changeState}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formPlaintextClassName">
                    <Form.Label column sm="2">
                      Class Image
                    </Form.Label>
                    <Col sm="10">
                      <Dropzone

                        maxFiles={1}
                        getUploadParams={this.getUploadParams}
                        onChangeStatus={this.handleChangeStatus}
                        accept="image/*"
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formPlaintextSubjectName">
                    <Form.Label column sm="2">
                      Subject Name
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        ref={(input) => {
                          this.addClassForm.subjectName = input;
                        }}
                        type="text"
                        placeholder="Enter subject name"
                        name="subjectName"
                        value={this.state.subjectName}
                        onChange={this.changeState}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="exampleForm.ControlSelect">
                    <Form.Label column sm="2">Grade</Form.Label>
                    <Col sm="10">
                      <Form.Control
                        ref={(input) => {
                          this.addClassForm.grade = input;
                        }}
                        as="select"
                        name="grade"
                        onChange={this.changeState}
                        value={this.state.grade}>
                        <option value="" disabled hidden>Select grade</option>
                        <option value={'1'}>Grade 1</option>
                        <option value={'2'}>Grade 2</option>
                        <option value={'3'}>Grade 3</option>
                        <option value={'4'}>Grade 4</option>
                        <option value={'5'}>Grade 5</option>
                        <option value={'6'}>Grade 6</option>
                        <option value={'7'}>Grade 7</option>
                        <option value={'8'}>Grade 8</option>
                        <option value={'9'}>Grade 9</option>
                        <option value={'10'}>Grade 10</option>
                        <option value={'O/L'}>O/L</option>
                        <option value={'A/L'}>A/L</option>
                      </Form.Control>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formPlaintextDescription">
                    <Form.Label column sm="2">
                      Day & Time
                    </Form.Label>
                    <Col sm="3">
                      <Form.Control
                        ref={(input) => {
                          this.addClassForm.day = input;
                        }}
                        as="select"
                        name="day"
                        onChange={this.changeState}
                        value={this.state.day}>
                        <option value="" disabled hidden>Select Day</option>
                        <option value={'MONDAY'}>MONDAY</option>
                        <option value={'TUESDAY'}>TUESDAY</option>
                        <option value={'WEDNESDAY'}>WEDNESDAY</option>
                        <option value={'THURSDAY'}>THURSDAY</option>
                        <option value={'FRIDAY'}>FRIDAY</option>
                        <option value={'SATURDAY'}>SATURDAY</option>
                        <option value={'SUNDAY'}>SUNDAY</option>
                      </Form.Control>
                    </Col>
                    <Col sm="2">
                      <Form.Control
                        ref={(input) => {
                          this.addClassForm.startTime = input;
                        }}
                        type="time"
                        placeholder="Start Time"
                        name="startTime"
                        value={this.state.startTime}
                        onChange={this.changeState}
                      />
                    </Col>
                    <Col sm="2">
                      <Form.Control
                        ref={(input) => {
                          this.addClassForm.endTime = input;
                        }}
                        type="time"
                        placeholder="End Time"
                        name="endTime"
                        value={this.state.endTime}
                        onChange={this.changeState}
                      />
                    </Col>
                    <Col sm="2">
                      <Button
                        className={(this.state.day === '' || this.state.startTime === '' || this.state.endTime === '') ? " com-btn btn-orange" : "com-btn btn-primary"}
                        style={{
                          width: '100%',
                          cursor: (this.state.day === '' || this.state.startTime === '' || this.state.endTime === '') ? "not-allowed" : "pointer"
                        }}
                        onClick={() => {
                          if (this.timeToMoment(this.state.startTime).unix() < this.timeToMoment(this.state.endTime).unix()) {
                            const dayTimes = this.state.selectedDayTimes;
                            dayTimes.push({
                              day: this.state.day,
                              startTime: this.state.startTime,
                              endTime: this.state.endTime,
                            });
                            this.setState({
                              selectedDayTimes: dayTimes,
                              day: '',
                              startTime: '',
                              endTime: '',
                            })
                          } else {
                            ToastUtil.showWarningToast("End time must be greater than Start time")
                          }
                        }}
                        disabled={this.state.day === '' || this.state.startTime === '' || this.state.endTime === ''}
                      >
                        Add
                      </Button>
                    </Col>
                  </Form.Group>

                  <Row>
                    <Col sm="2"/>
                    <Col sm="10">
                      <ul>
                        {
                          this.state.selectedDayTimes.map((value, index) => {
                            return (
                              <li
                                key={index}>{value.day} {this.timeToMoment(value.startTime).format('LT')} - {this.timeToMoment(value.endTime).format('LT')} &nbsp;&nbsp;
                                <span
                                  style={{fontWeight: 'bold', cursor: 'pointer'}}
                                  onClick={() => {
                                    const dayTimes = this.state.selectedDayTimes;
                                    dayTimes.splice(index, 1);
                                    this.setState({
                                      selectedDayTimes: dayTimes
                                    });
                                  }}
                                >X
                                </span>
                              </li>
                            )
                          })
                        }
                      </ul>
                    </Col>
                  </Row>


                  <Form.Group as={Row} controlId="formPlaintextDescription">
                    <Form.Label column sm="2">
                      Description
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        ref={(input) => {
                          this.addClassForm.description = input;
                        }}
                        as="textarea"
                        type="text"
                        name="description"
                        placeholder="Enter description"
                        value={this.state.description}
                        onChange={this.changeState}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formPlaintextSyllabus">
                    <Form.Label column sm="2">
                      Syllabus
                    </Form.Label>
                    <Col sm="10">
                      <ReactListInput
                        initialStagingValue=''
                        onChange={value => {
                          this.setState({syllabus: value});
                        }}
                        minItems={0}
                        maxItems={1000}
                        ItemComponent={this.itemComponent}
                        StagingComponent={this.stagingComponent}
                        value={this.state.syllabus}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formPlaintextFee">
                    <Form.Label column sm="2">
                      Monthly Fee
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        ref={(input) => {
                          this.addClassForm.price = input;
                        }}
                        type="number"
                        name="price"
                        placeholder="Enter Monthly Fee"
                        value={this.state.price}
                        onChange={this.changeState}
                      />
                    </Col>
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    className="com-btn btn-primary"
                    variant="primary"
                    onClick={() => {
                      this.onAddClassModalSubmit();
                    }}>
                    Save
                  </Button>
                  <Button
                    className="com-btn btn-orange"
                    variant="secondary"
                    onClick={() => {
                      this.setState({showAddClassModal: false});
                      this.clearFormData();
                    }}>
                    Close
                  </Button>
                </Modal.Footer>
              </dic>
            </Modal>
          )
        }

        {/*View Enrollements Modal*/}

        {
          this.state.showViewEnrollmentModal && (
            <Modal
              show={this.state.showViewEnrollmentModal}
              onHide={() => {
                this.setState({showViewEnrollmentModal: false});
              }}
              backdrop="static"
              keyboard={false}
              size="xl"
            >
              <Modal.Header closeButton>
                <Modal.Title style={{marginLeft: 15, color: 'blue'}}>Enrollments</Modal.Title>
                <Form.Control
                  style={{marginLeft: 50}}
                  as="select"
                  name="selectMonth"
                  onChange={this.changeMonth}
                  value={this.state.selectMonth}>
                  <option value="" disabled hidden>Select month</option>
                  <option value={'JANUARY'}>JANUARY</option>
                  <option value={'FEBRUARY'}>FEBRUARY</option>
                  <option value={'MARCH'}>MARCH</option>
                  <option value={'APRIL'}>APRIL</option>
                  <option value={'MAY'}>MAY</option>
                  <option value={'JUNE'}>JUNE</option>
                  <option value={'JULY'}>JULY</option>
                  <option value={'AUGUST'}>AUGUST</option>
                  <option value={'SEPTEMBER'}>SEPTEMBER</option>
                  <option value={'OCTOBER'}>OCTOBER</option>
                  <option value={'NOVEMBER'}>NOVEMBER</option>
                  <option value={'DECEMBER'}>DECEMBER</option>
                </Form.Control>
                {/*</Col>*/}
                {/*</Form.Group>*/}
              </Modal.Header>
              <Modal.Body>
                <ReactTable
                  // filterable={true}
                  data={this.state.students}
                  pages={this.state.pages}
                  columns={[
                    {
                      Header: "Student Name",
                      accessor: "studentName"
                    },
                    {
                      Header: "School",
                      accessor: "school"
                    },
                    {
                      Header: "Mobile",
                      accessor: "mobile"
                    },
                    {
                      Header: "Email",
                      accessor: "email"
                    },
                    {
                      Header: "Enroll Type",
                      accessor: "enrollType"
                    },
                    {
                      Header: "Reg. Date",
                      accessor: "dateTime"
                    },
                  ]}
                  defaultPageSize={defaultTableSize}
                  className="-striped -highlight"
                  loading={this.state.loading}
                  showPagination={true}
                  sortable={false}
                  showPaginationTop={false}
                  showPaginationBottom={true}
                  pageSizeOptions={[5, 10, 20, 25, 50, 100]}
                  manual // this would indicate that server side pagination has been enabled
                  onFetchData={(state, instance) => {
                    // console.log(state.filtered);
                    this.viewAllEnrollStudents(this.state.selectedClassId, state.page, state.pageSize, this.state.selectMonth);
                  }}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button className="com-btn btn-orange" variant="secondary" onClick={() => {

                  this.setState({showViewEnrollmentModal: false});
                }}>
                  Done
                </Button>
              </Modal.Footer>
            </Modal>
          )
        }

        {/*Edit Class Modal*/}

        {
          this.state.showEditClassModal && (
            <Modal
              show={this.state.showEditClassModal}
              onHide={() => {
                this.setState({showEditClassModal: false});
              }}
              backdrop="static"
              keyboard={false}
              size="lg"
            >
              <Modal.Header closeButton>
                <Modal.Title>Edit Class</Modal.Title>
              </Modal.Header>
              <div >
                <Modal.Body>
                  <Form.Group as={Row} controlId="className">
                    <Form.Label column sm="2">
                      Class Name
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        ref={(input) => {
                          this.editClassForm.editClassName = input;
                        }}
                        type="text"
                        placeholder="Enter class name"
                        name="editClassName"
                        value={this.state.editClassName}
                        onChange={this.changeState}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formPlaintextSubjectName">
                    <Form.Label column sm="2">
                      Subject Name
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        ref={(input) => {
                          this.editClassForm.editSubjectName = input;
                        }}
                        type="text"
                        placeholder="Enter subject name"
                        name="editSubjectName"
                        value={this.state.editSubjectName}
                        onChange={this.changeState}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="exampleForm.ControlSelect">
                    <Form.Label column sm="2">Grade</Form.Label>
                    <Col sm="10">
                      <Form.Control
                        ref={(input) => {
                          this.editClassForm.editGrade = input;
                        }}
                        as="select"
                        name="editGrade"
                        onChange={this.changeState}
                        value={this.state.editGrade}>
                        <option value="" disabled hidden>Select grade</option>
                        <option value={'1'}>Grade 1</option>
                        <option value={'2'}>Grade 2</option>
                        <option value={'3'}>Grade 3</option>
                        <option value={'4'}>Grade 4</option>
                        <option value={'5'}>Grade 5</option>
                        <option value={'6'}>Grade 6</option>
                        <option value={'7'}>Grade 7</option>
                        <option value={'8'}>Grade 8</option>
                        <option value={'9'}>Grade 9</option>
                        <option value={'10'}>Grade 10</option>
                        <option value={'O/L'}>O/L</option>
                        <option value={'A/L'}>A/L</option>
                      </Form.Control>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formPlaintextDescription">
                    <Form.Label column sm="2">
                      Day & Time
                    </Form.Label>
                    <Col sm="3">
                      <Form.Control
                        ref={(input) => {
                          this.editClassForm.editDay = input;
                        }}
                        as="select"
                        name="editDay"
                        onChange={this.changeState}
                        value={this.state.editDay}>
                        <option value="" disabled hidden>Select Day</option>
                        <option value={'MONDAY'}>MONDAY</option>
                        <option value={'TUESDAY'}>TUESDAY</option>
                        <option value={'WEDNESDAY'}>WEDNESDAY</option>
                        <option value={'THURSDAY'}>THURSDAY</option>
                        <option value={'FRIDAY'}>FRIDAY</option>
                        <option value={'SATURDAY'}>SATURDAY</option>
                        <option value={'SUNDAY'}>SUNDAY</option>
                      </Form.Control>
                    </Col>
                    <Col sm="3">
                      <Form.Control
                        ref={(input) => {
                          this.editClassForm.editStartTime = input;
                        }}
                        type="time"
                        placeholder="Start Time"
                        name="editStartTime"
                        value={this.state.editStartTime}
                        onChange={this.changeState}
                      />
                    </Col>
                    <Col sm="2">
                      <Form.Control
                        ref={(input) => {
                          this.editClassForm.editEndTime = input;
                        }}
                        type="time"
                        placeholder="End Time"
                        name="editEndTime"
                        value={this.state.editEndTime}
                        onChange={this.changeState}
                      />
                    </Col>
                    <Col sm="2">
                      <Button
                        className={(this.state.editDay === '' || this.state.editStartTime === '' || this.state.editEndTime === '') ? "com-btn btn-orange" : " com-btn btn-primary"}
                        style={{
                          width: '100%',
                          cursor: (this.state.editDay === '' || this.state.editStartTime === '' || this.state.editEndTime === '') ? "not-allowed" : "pointer"
                        }}
                        onClick={() => {
                          if (this.timeToMoment(this.state.editStartTime).unix() < this.timeToMoment(this.state.editEndTime).unix()) {
                            const dayTimes = this.state.editDayTimes;
                            dayTimes.push({
                              day: this.state.editDay,
                              startTime: this.state.editStartTime,
                              endTime: this.state.editEndTime,
                            });
                            this.setState({
                              editDayTimes: dayTimes,
                              editDay: '',
                              editStartTime: '',
                              editEndTime: '',
                            })
                          } else {
                            ToastUtil.showWarningToast("End time must be greater than Start time")
                          }
                        }}
                        disabled={this.state.editDay === '' || this.state.editStartTime === '' || this.state.editEndTime === ''}

                      >
                        Add
                      </Button>
                    </Col>
                  </Form.Group>

                  <Row>
                    <Col sm="2"/>
                    <Col sm="10">
                      <ul>
                        {
                          this.state.editDayTimes.map((value, index) => {
                            return (
                              <li
                                key={index}>{value.day} {this.timeToMoment(value.startTime).format('LT')} - {this.timeToMoment(value.endTime).format('LT')} &nbsp;&nbsp;
                                <span
                                  style={{fontWeight: 'bold', cursor: 'pointer'}}
                                  onClick={() => {
                                    const dayTimes = this.state.editDayTimes;
                                    dayTimes.splice(index, 1);
                                    this.setState({
                                      editDayTimes: dayTimes
                                    });
                                  }}
                                >X
                                </span>
                              </li>
                            )
                          })
                        }
                      </ul>
                    </Col>
                  </Row>


                  <Form.Group as={Row} controlId="formPlaintextDescription">
                    <Form.Label column sm="2">
                      Description
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        ref={(input) => {
                          this.editClassForm.editDescription = input;
                        }}
                        as="textarea"
                        type="text"
                        name="editDescription"
                        placeholder="Enter description"
                        value={this.state.editDescription}
                        onChange={this.changeState}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formPlaintextSyllabus">
                    <Form.Label column sm="2">
                      Syllabus
                    </Form.Label>
                    <Col sm="10">
                      <ReactListInput
                        initialStagingValue=''
                        onChange={value => {
                          this.setState({editSyllabus: value});
                        }}
                        minItems={0}
                        maxItems={1000}
                        ItemComponent={this.itemComponent}
                        StagingComponent={this.stagingComponent}
                        value={this.state.editSyllabus}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formPlaintextFee">
                    <Form.Label column sm="2">
                      Monthly Fee
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        ref={(input) => {
                          this.editClassForm.editPrice = input;
                        }}
                        type="number"
                        name="editPrice"
                        placeholder="Enter Monthly Fee"
                        value={this.state.editPrice}
                        onChange={this.changeState}
                      />
                    </Col>
                  </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    className="com-btn btn-primary"
                    variant="primary"
                    onClick={() => {
                      this.onEditClassModalSubmit();
                    }}>
                    Save
                  </Button>
                  <Button
                    className="com-btn btn-orange"
                    variant="secondary"
                    onClick={() => {
                      this.setState({showEditClassModal: false});
                    }}>
                    Close
                  </Button>
                </Modal.Footer>
              </div>
            </Modal>
          )
        }

        {
          this.state.showEditProfilePicModal && (
            <Modal
              show={this.state.showEditProfilePicModal}
              onHide={() => {
                this.setState({showEditProfilePicModal: false});
              }}
              backdrop="static"
              keyboard={false}
              size="lg"
            >
              <Modal.Header closeButton>
                <Modal.Title>Edit Class Profile Picture</Modal.Title>
              </Modal.Header>
              <Form>
                <Modal.Body>
                  <Row>
                    <Col sm="6">
                      <Form.Group controlId="formPlaintextClassName">
                        <Form.Label>
                          Old Image
                        </Form.Label>
                        <div style={{width: '100%'}}>
                          <img src={this.state.selectedProfilePic} alt={"class"}
                               style={{width: '100%'}}/>
                        </div>
                      </Form.Group>
                    </Col>
                    <Col sm="6">
                      <Form.Group controlId="formPlaintextClassName">
                        <Form.Label>
                          New Image
                        </Form.Label>
                        <Dropzone
                          maxFiles={1}
                          getUploadParams={this.getUploadParams}
                          onChangeStatus={this.handleChangeStatusEdit}
                          accept="image/*"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    className="com-btn btn-primary"
                    variant="primary"
                    onClick={() => {
                      this.onEditClassProfilePic();
                    }}>
                    Save
                  </Button>
                  <Button
                    className="com-btn btn-orange"
                    variant="secondary"
                    onClick={() => {
                      this.setState({showEditProfilePicModal: false});
                    }}>
                    Close
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal>
          )
        }

      </div>
    );
  }

}

export default Class;

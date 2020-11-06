import React, {Component} from 'react';
import {Col, Row, Button} from 'reactstrap';
import AppTeachersTile from "../../Components/AppTeachersTile/AppTeachersTile";
import axios from '../../axios-order';
import {SwalUtil} from "../../Util/SwalUtil";
import { Form} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import {ToastUtil} from "../../Util/ToastUtil";
import {ValidatorUtil} from "../../Util/ValidatorUtil";
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import Card from "react-bootstrap/Card";

class Dashboard extends Component {

  state = {
    teachers: [],
    showAddModal: false,
    teacherName: '',
    gender: '',
    email: '',
    description: '',
    mobile: '',
    qualification: '',
    maxEnrolls: '',
    dob: '',
    image: null,
    editTeacherImage: null,
    showEditProfilePicModal: false,
    selectedId: '',
    selectedImage: null,
    showEditModal: false,

    editTeacherName: '',
    editGender: '',
    editDob: '',
    editEmail: '',
    editDescription: '',
    editMobile: '',
    editQualification: '',
    editMaxEnrolls: '',

    // textToCopy: 'https://www.sampathathukorale.edulab.lk'
  };

  addTeacherForm = {};
  editTeacherForm = {};

  // textToCopy: window.location.origin;

  componentDidMount() {
    this.getAllTeachers();
  }

  changeState = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  clickTeacherHandler = (id, name) => {
    this.props.history.push('class', {teacherId: id, teacherName: name});
  };

  clearFormData = () => {
    this.setState({
      teacherName: '',
      gender: '',
      email: '',
      description: '',
      mobile: '',
      qualification: '',
      maxEnrolls: '',
      dob: '',
      image: null,
    })
  };

  getAllTeachers = () => {
    SwalUtil.showLoadingSwal();
    axios.get('institute/teacher')
      .then(res => {
          if (res.data.success) {
            SwalUtil.closeSwal();
            this.setState({
              teachers: res.data.body
            });
          } else {
            this.setState({
              teachers: [],
            });
            SwalUtil.showErrorSwal("Something went wrong, please try again!")
          }
        }
      ).catch(err => {
      console.log(err);
      SwalUtil.showErrorSwal("Something went wrong, please try again!")
    });
  };

  validateAddTeacherForm = () => {

    if (ValidatorUtil.isEmpty(this.state.teacherName)) {
      ToastUtil.showWarningToast('Please enter teachers name!');
      this.addTeacherForm.teacherName.focus();
      return false;
    }

    if (ValidatorUtil.isEmpty(this.state.image)) {
      ToastUtil.showWarningToast('Please upload Teacher image!');
      return false;
    }

    if (ValidatorUtil.isEmpty(this.state.gender)) {
      ToastUtil.showWarningToast('Please select gender!');
      this.addTeacherForm.gender.focus();
      return false;
    }

    // if (ValidatorUtil.isEmpty(this.state.dob)) {
    //   ToastUtil.showWarningToast('Please select your date of birth!');
    //   this.addTeacherForm.dob.focus();
    //   return false;
    // }

    if (ValidatorUtil.isEmpty(this.state.email)) {
      ToastUtil.showWarningToast('Please enter email!');
      this.addTeacherForm.email.focus();
      return false;
    }

    if (!ValidatorUtil.isValidEmail(this.state.email)) {
      ToastUtil.showWarningToast('Please enter valid email!');
      this.addTeacherForm.email.focus();
      return false;
    }

    if (ValidatorUtil.isEmpty(this.state.mobile)) {
      ToastUtil.showWarningToast('Please enter mobile!');
      this.addTeacherForm.mobile.focus();
      return false;
    }

    if (!ValidatorUtil.isValidMobile(this.state.mobile)) {
      ToastUtil.showWarningToast('Please enter valid mobile!');
      this.addTeacherForm.mobile.focus();
      return false;
    }

    if (ValidatorUtil.isEmpty(this.state.description)) {
      ToastUtil.showWarningToast('Please enter the description!');
      this.addTeacherForm.description.focus();
      return false;
    }

    if (ValidatorUtil.isEmpty(this.state.qualification)) {
      ToastUtil.showWarningToast('Please enter the qualification!');
      this.addTeacherForm.qualification.focus();
      return false;
    }

    if (ValidatorUtil.isEmpty(this.state.maxEnrolls)) {
      ToastUtil.showWarningToast('Please enter the max enrolls!');
      this.addTeacherForm.maxEnrolls.focus();
      return false;
    }

    return true;
  };

  fileToBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  getUploadParams = ({meta}) => {
    return {url: 'https://httpbin.org/post'}
  };

  handleChangeStatus = async ({meta, file}, status) => {
    if (status === 'done') {
      const base64String = await this.fileToBase64(file);
      this.setState({
        image: base64String,
      });
    }
  };

  onAddTeacherModalSubmit = () => {
    if (this.validateAddTeacherForm()) {
      const data = {
        "name": this.state.teacherName,
        "gender": this.state.gender,
        "description": this.state.description,
        "dob": this.state.dob,
        "email": this.state.email,
        "mobile": this.state.mobile,
        "qualification": this.state.qualification,
        "maxEnrolls": this.state.maxEnrolls,
        "imageBase64": this.state.image
      };
      SwalUtil.showLoadingSwal();
      axios.post('institute/teacher', data)
        .then(res => {
            SwalUtil.closeSwal();
            if (res.data.success) {
              this.getAllTeachers();
              this.clearFormData();
              this.setState({
                showAddModal: false
              });
              ToastUtil.showSuccessToast("Teacher added successfully")
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

  clickTeacherEditHandler = () => {
    const data = {
      "id": this.state.selectedId,
      "name": this.state.editTeacherName,
      "gender": this.state.editGender,
      "description": this.state.editDescription,
      "dob": this.state.editDob,
      "email": this.state.editEmail,
      "qualification": this.state.editQualification,
      "maxEnrolls": this.state.editMaxEnrolls
    };
    SwalUtil.showLoadingSwal();
    axios.put('institute/teacher', data)
      .then(res => {
          SwalUtil.closeSwal();
          if (res.data.success) {
            this.getAllTeachers();
            this.setState({
              showEditModal: false
            });
            ToastUtil.showSuccessToast("Teacher updated successfully")
          } else {
            SwalUtil.showErrorSwal(res.data.message)
          }
        }
      ).catch(err => {
      SwalUtil.closeSwal();
      console.log(err);
      SwalUtil.showErrorSwal("Something went wrong, please try again!")
    });
  };

  handleChangeStatusEdit = async ({meta, file}, status) => {
    if (status === 'done') {
      const base64String = await this.fileToBase64(file);
      this.setState({
        editTeacherImage: base64String,
      });
    }
  };

  clickProfilePicEditHandler = () => {
    if (ValidatorUtil.isEmpty(this.state.editTeacherImage)) {
      ToastUtil.showWarningToast('Please select a Teacher image!');
    } else {
      const data = {
        "id": this.state.selectedId,
        "imageBase64": this.state.editTeacherImage
      };
      SwalUtil.showLoadingSwal();
      axios.put('institute/teacher/photo', data)
        .then(res => {
            SwalUtil.closeSwal();
            if (res.data.success) {
              this.getAllTeachers();
              this.setState({
                showEditProfilePicModal: false,
                editTeacherImage: null
              });
              ToastUtil.showSuccessToast("Teacher profile picture updated successfully")
            } else {
              SwalUtil.showErrorSwal(res.data.message)
            }
          }
        ).catch(err => {
        SwalUtil.closeSwal();
        console.log(err);
        SwalUtil.showErrorSwal("Something went wrong, please try again!")
      });
    }
  };

  loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>;

  render() {

    return (
      <div className="animated fadeIn">
        <Card style={{
          width: '100%',
          backgroundColor: 'white',
          padding: '10px',
          marginBottom: '40px',
          marginTop: '40px',
          borderRadius: '10px',
        }}>

          <Row style={{alignItems: 'center'}}>
            <Col xs="10" className="link-respo">
              <Row style={{alignItems: 'center'}}>
                <Col  xs="5" className="link-respo">
                  <div style={{marginLeft: '25px', borderRight: '1px dashed #333'}} className="link-title">
                    Share your institute URL among students
                  </div>
                </Col>
                <Col xs="6" className="link-respo">
                  <input id='textCopy' readOnly={true} className="link-style "
                         style={{color: 'blue', marginLeft: '10px', borderWidth: 0, border: 'none'}}
                         defaultValue={window.location.origin}/>
                </Col>
              </Row>
            </Col>
            <Col xs="2" className="link-respo">
              <div
                style={{
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

        <div style={{display: 'flex', justifyContent: 'flex-end', width: '100%', marginBottom: '20px'}}>
          <Button
            className="com-btn btn-primary"
            style={{borderWidth: 0, marginRight: '20px'}}
            data-toggle="modal"
            onClick={() => {
              this.setState({
                showAddModal: true
              })
            }}
          >+ Add New Teacher
          </Button>
        </div>

        <Row>

          {
            this.state.teachers.length > 0 ? this.state.teachers.map((value, index) => {
              return (
                <AppTeachersTile
                  key={index}
                  clickTeacher={() => this.clickTeacherHandler(value.id, value.name)}
                  teacherName={value.name}
                  teacherSubject={value.name}
                  userPic={value.imageUrl}
                  teacherQualification={value.qualification}
                  maxEnroll={value.maxEnrolls}
                  clickTeacherEdit={() => {
                    this.setState({
                      selectedId: value.id,
                      editTeacherName: value.name,
                      editGender: value.gender,
                      editDob: value.dob,
                      editEmail: value.email,
                      editDescription: value.description,
                      editMobile: value.mobile,
                      editQualification: value.qualification,
                      editMaxEnrolls: value.maxEnrolls,
                      showEditModal: true,
                    })
                  }}
                  clickProfilePicEdit={() => {
                    this.setState({
                      selectedId: value.id,
                      selectedImage: value.imageUrl,
                      showEditProfilePicModal: true,
                    });
                  }}
                />
              )
            }) : null
          }

        </Row>

        {
          this.state.showAddModal && (
            <Modal
              show={this.state.showAddModal}
              onHide={() => {
                this.setState({showAddModal: false});
                this.clearFormData();
              }}
              backdrop="static"
              keyboard={false}
              size="lg"
            >
              <Modal.Header closeButton>
                <Modal.Title>Add New Teacher</Modal.Title>
              </Modal.Header>
              <Form>
                <Modal.Body>

                  <Form.Group as={Row} controlId="className">
                    <Form.Label column sm="2">
                      Teacher Name
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        ref={(input) => {
                          this.addTeacherForm.teacherName = input;
                        }}
                        type="text"
                        placeholder="Enter teacher name"
                        name="teacherName"
                        value={this.state.teacherName}
                        onChange={this.changeState}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="image">
                    <Form.Label column sm="2">
                      Teacher Image
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

                  <Form.Group as={Row} controlId="exampleForm.ControlSelect">
                    <Form.Label column sm="2">Gender</Form.Label>
                    <Col sm="10">
                      <Form.Control
                        ref={(input) => {
                          this.addTeacherForm.gender = input;
                        }}
                        as="select"
                        name="gender"
                        onChange={this.changeState}
                        value={this.state.gender}>
                        <option value="" disabled hidden>Select gender</option>
                        <option value={'MALE'}>MALE</option>
                        <option value={'FEMALE'}>FEMALE</option>
                      </Form.Control>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="dob">
                    <Form.Label column sm="2">Birthday</Form.Label>
                    <Col sm="10">
                      <Form.Control
                        ref={(input) => {
                          this.addTeacherForm.dob = input;
                        }}
                        type="date"
                        placeholder="Birthday"
                        name="dob"
                        value={this.state.dob}
                        onChange={this.changeState}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="email">
                    <Form.Label column sm="2">
                      Email
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        ref={(input) => {
                          this.addTeacherForm.email = input;
                        }}
                        type="text"
                        placeholder="Enter email"
                        name="email"
                        value={this.state.email}
                        onChange={this.changeState}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="mobile">
                    <Form.Label column sm="2">
                      Mobile
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        ref={(input) => {
                          this.addTeacherForm.mobile = input;
                        }}
                        type="number"
                        name="mobile"
                        placeholder="Enter mobile"
                        value={this.state.mobile}
                        onChange={this.changeState}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formPlaintextDescription">
                    <Form.Label column sm="2">
                      Description
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        ref={(input) => {
                          this.addTeacherForm.description = input;
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

                  <Form.Group as={Row} controlId="qualification">
                    <Form.Label column sm="2">
                      Qualification
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        ref={(input) => {
                          this.addTeacherForm.qualification = input;
                        }}
                        type="text"
                        name="qualification"
                        placeholder="Enter qualification"
                        value={this.state.qualification}
                        onChange={this.changeState}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="maxEnrolls">
                    <Form.Label column sm="2">
                      Max Enrolls
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        ref={(input) => {
                          this.addTeacherForm.maxEnrolls = input;
                        }}
                        type="number"
                        name="maxEnrolls"
                        placeholder="Enter maxEnrolls"
                        value={this.state.maxEnrolls}
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
                      this.onAddTeacherModalSubmit();
                    }}>
                    Save
                  </Button>
                  <Button
                    className="com-btn btn-orange"
                    variant="secondary"
                    onClick={() => {
                      this.setState({showAddModal: false});
                      this.clearFormData();
                    }}>
                    Close
                  </Button>
                </Modal.Footer>
              </Form>
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
                <Modal.Title>Edit Teacher Profile Picture</Modal.Title>
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
                          <img src={this.state.selectedImage} alt={"teacher"}
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
                      this.clickProfilePicEditHandler();
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

        {
          this.state.showEditModal && (
            <Modal
              show={this.state.showEditModal}
              onHide={() => {
                this.setState({showEditModal: false});
              }}
              backdrop="static"
              keyboard={false}
              size="lg"
            >
              <Modal.Header closeButton>
                <Modal.Title>Edit Teacher</Modal.Title>
              </Modal.Header>
              <Form>
                <Modal.Body>

                  <Form.Group as={Row} controlId="editTeacherName">
                    <Form.Label column sm="2">
                      Teacher Name
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        ref={(input) => {
                          this.editTeacherForm.editTeacherNamze = input;
                        }}
                        type="text"
                        placeholder="Enter teacher name"
                        name="editTeacherName"
                        value={this.state.editTeacherName}
                        onChange={this.changeState}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="editGender">
                    <Form.Label column sm="2">Gender</Form.Label>
                    <Col sm="10">
                      <Form.Control
                        ref={(input) => {
                          this.editTeacherForm.editGender = input;
                        }}
                        as="select"
                        name="editGender"
                        onChange={this.changeState}
                        value={this.state.editGender}>
                        <option value="" disabled hidden>Select gender</option>
                        <option value={'MALE'}>MALE</option>
                        <option value={'FEMALE'}>FEMALE</option>
                      </Form.Control>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="editDob">
                    <Form.Label column sm="2">Birthday</Form.Label>
                    <Col sm="10">
                      <Form.Control
                        ref={(input) => {
                          this.editTeacherForm.editDob = input;
                        }}
                        type="date"
                        placeholder="Birthday"
                        name="editDob"
                        value={this.state.editDob}
                        onChange={this.changeState}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="email">
                    <Form.Label column sm="2">
                      Email
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        ref={(input) => {
                          this.editTeacherForm.editEmail = input;
                        }}
                        type="text"
                        placeholder="Enter email"
                        name="editEmail"
                        value={this.state.editEmail}
                        onChange={this.changeState}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="mobile">
                    <Form.Label column sm="2">
                      Mobile
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        ref={(input) => {
                          this.editTeacherForm.editMobile = input;
                        }}
                        type="number"
                        name="editMobile"
                        placeholder="Enter mobile"
                        value={this.state.editMobile}
                        onChange={this.changeState}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formPlaintextDescription">
                    <Form.Label column sm="2">
                      Description
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        ref={(input) => {
                          this.editTeacherForm.editDescription = input;
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

                  <Form.Group as={Row} controlId="editQualification">
                    <Form.Label column sm="2">
                      Qualification
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        ref={(input) => {
                          this.editTeacherForm.editQualification = input;
                        }}
                        type="text"
                        name="editQualification"
                        placeholder="Enter qualification"
                        value={this.state.editQualification}
                        onChange={this.changeState}
                      />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="maxEnrolls">
                    <Form.Label column sm="2">
                      Max Enrolls
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        ref={(input) => {
                          this.editTeacherForm.editMaxEnrolls = input;
                        }}
                        type="number"
                        name="editMaxEnrolls"
                        placeholder="Enter maxEnrolls"
                        value={this.state.editMaxEnrolls}
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
                      this.clickTeacherEditHandler();
                    }}>
                    Save
                  </Button>
                  <Button
                    className="com-btn btn-orange"
                    variant="secondary"
                    onClick={() => {
                      this.setState({showEditModal: false});
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

export default Dashboard;

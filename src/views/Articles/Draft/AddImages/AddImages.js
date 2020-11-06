/* Created By Janitha Prashad Katukenda
 jpk Created on Thu Oct 29 2020
Copyright (c) 2020 Ceyentra TechNologies
APPLAB */

import React, { Component } from 'react';
import 'react-quill/dist/quill.snow.css';
import i from 'react-icofont';
import './AddImages.scss';
import 'react-image-crop/dist/ReactCrop.css';
import axios from '../../../../services/axios';
import ReactCrop from 'react-image-crop';

import {
  Button,
  Row,
  Col,
  Modal,
  ModalBody,
  Card,
  CardImg,
  Label,

} from 'reactstrap';
import { connect } from "react-redux";
import * as commonFunction from '../../../../utils/commonFunction';
import * as constants from '../../../../const/constants';

import swal from "sweetalert";

import { withRouter } from "react-router-dom";
import * as actionSpinnerCreator from "../../../../store/spinner/actions";

const initialState = {
  src: null,
  crop: {
    unit: '%',
    width: 30,
    aspect: 1 / 1,
  },
  croppedImageUrl: "",
  topic: '', //for heading
  base64string: '',//for img
  allImages: [],

};

class App extends Component {
  state = Object.assign({}, initialState);

  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  // If you setState the crop in here you should return false.
  onImageLoaded = image => {
    this.imageRef = image;
  };
  onCropComplete = crop => {
    this.makeClientCrop(crop);
  };
  onCropChange = (crop, percentCrop) => {
    this.setState({ crop });

  };

  setArticleDetails = (images) => {
    let { body } = this.props;
    if (body) {
      this.setState({
        topic: body.headline,
        id: body.id,
        allImages: images ? images : body.images,
      })
    }
  };


  manageAddImageHandler = (id) => {
    swal({
      title: constants.ARE_YOU_SURE_TEXT, icon: null, closeOnClickOutside: false,
      buttons: { cancel: 'No', dangerMode: { text: "Yes", value: "action", className: "okay-btn" } },
    }).then((value) => {
      switch (value) {
        case "action":
          this.props.spinnerHandler(true);
          const data = {
            id: this.state.id,
            images: [this.state.base64string],
          };
          axios.post(constants.SERVER_URL + 'article/addimage', data)
            .then(response => {
              if (response.data.success) {
                console.log(response.data.body.images);
                this.setState({
                  ...initialState
                });
                this.setArticleDetails(response.data.body.images);
                document.getElementById("crop-img-input").value = "";
              }
              commonFunction.warningAlert(response.data.success ? "The image has been added succesfully" : response.data.body, response.data.success);


            })
            .catch(error => {
            })
            .finally(fin => {
              this.props.spinnerHandler(false)
            });
          break;
        default:
          break;
      }
    });


  };
  deleteHandler = (id) => {
    swal({
      title: constants.ARE_YOU_SURE_TEXT, icon: null, closeOnClickOutside: false,
      buttons: { cancel: 'No', dangerMode: { text: "Yes", value: "action", className: "okay-btn" } },
    }).then((value) => {
      switch (value) {
        case "action":
          this.props.spinnerHandler(true);
          axios.delete(`${constants.SERVER_URL}article/deleteimage/${id}`)
            .then(response => {
              if (response.data.success) {
                let imageList = this.state.allImages;
                let index = imageList.findIndex(item => id === item.id);
                imageList.splice(index, 1);
                this.setState({ allImages: imageList })
              }
              commonFunction.warningAlert(response.data.success ? "The image has been deleted" : response.data.message, response.data.success);
            })
            .catch(error => {
            })
            .finally(fin => {
              this.props.spinnerHandler(false)
            });
          break;
        default:
          break;
      }
    })
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        'newFile.jpeg'
      );
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {

    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(image, crop.x * scaleX, crop.y * scaleY, crop.width * scaleX, crop.height * scaleY, 0, 0, crop.width, crop.height);

    const base64string = canvas.toDataURL('image/jpeg');  //as a base64 string
    this.setState({ base64string });

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, 'image/jpeg');
    });
  }

  componentDidMount() {
    this.setArticleDetails();
  }

  render() {

    let { topic, crop, croppedImageUrl, src, } = this.state;

    return (
      <Modal isOpen={true}>
        <div className={"update-article-modal"}>
          <div>
            <div>

              <div className={"input-module"}>
                <div>
                  <h1 className="form-title article-topic">{topic}</h1>
                </div>
                <div>
                  <input type="file" accept="image/*" onChange={this.onSelectFile} id={"crop-img-input"} />
                </div>
                <Row>
                  <Col lg="12" className={"upload-img-col"}>
                    {src && (
                      <ReactCrop
                        src={src}
                        crop={crop}
                        ruleOfThirds
                        style={{ maxWidth: '50%' }}
                        onImageLoaded={this.onImageLoaded}
                        onComplete={this.onCropComplete}
                        onChange={this.onCropChange}
                      />
                    )}
                  </Col>
                  {
                    croppedImageUrl !== "" && <div>
                      <Col lg="12" className={"crop-img-col"}>
                        <img alt="Crop Img Preview Here" style={{ maxWidth: '50%' }} src={croppedImageUrl} />
                      </Col>
                      <div className={"add-btn"}>
                        <Button className="com-btn submit-btn" onClick={this.manageAddImageHandler}>Add</Button>
                      </div>
                    </div>
                  }
                </Row>
              </div>
            </div>


            <ModalBody>
              <Label className="form-labal">Available Images</Label>
              <Row>
                {
                  this.state.allImages.map(image => (

                    <Col lg="4" key={image.id}>
                      <Card className={"card"}>
                        <CardImg className={"image-grid"} src={image.imageUrl} alt="test">
                        </CardImg>
                        <i close className={"delete-icon icofont-close"} onClick={() => this.deleteHandler(image.id)} />
                      </Card>
                    </Col>

                  ))
                }
              </Row>
            </ModalBody>

            <div className={"button-group align-right"}>
              <Button className="com-btn close-btn" onClick={() => this.props.modalHandler(null)}>Close</Button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }


}


const mapDispatchToProps = (dispatch) => ({
  spinnerHandler: data => dispatch(actionSpinnerCreator.spinnerHandler(data)),
});


export default connect(null, mapDispatchToProps)(withRouter(App));

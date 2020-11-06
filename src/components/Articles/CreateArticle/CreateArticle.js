/* Created By Janitha Prashad Katukenda
 jpk Created on Thu Oct 29 2020
Copyright (c) 2020 Ceyentra TechNologies
APPLAB */

import React, { Component } from 'react';
import './CreateArticle.scss';
import i from 'react-icofont'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import axios from '../../../services/axios';
import Select from 'react-select';
import { Dropdown } from 'semantic-ui-react'
import {
  Button,
  Input,
  Col,
  Row,
  Label,
  Card,
  CardImg
} from 'reactstrap';
import * as commonFunc from '../../../utils/commonFunction';
import * as constants from '../../../const/constants';
import Cookies from "js-cookie";
import { ADMIN_USERNAME } from "../../../const/constants";
import swal from "sweetalert";
import * as actionSpinnerCreator from "../../../store/spinner/actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {

  ACCESS_TOKEN,

} from "../../../const/constants";


const initialState = {
  src: null,
  crop: {
    unit: '%',
    width: 30,
    aspect: 1 / 1,
  },
  croppedImageUrl: "",
  encoded: "",

  topic: '', //for heading
  base64string: '',//for img
  htmlText: '',//for text field
  contentLength: 1,
  discription: '',
  addMore: [],
  imageList: [],
  selectedApp: 'article',
  catagoryId:'',
  selectedCategoryId:'',
  categorys:[],
  allCaregories:[],

};

class App extends Component {

  state = Object.assign({},
    initialState);




  changeHandler = e => {
    this.setState({ catagoryId: e ? e.value : '' });
  };

  handleChangeQuil = (name) => (value, delta, source, editor) => {
    let quill = this.quillRef;
    let contentLength = editor.getLength();


    if (contentLength <= 1500) { //checking character length

      this.setState({
        [name]: value,
        contentLength: editor.getLength()
      })

      if (contentLength <= 100) { //send first 100 character without stylings 
        this.setState({
          discription: editor.getText()
        })


      }
      else {
        this.setState({
          discription: editor.getText(0, 100) + '...'
        })
      }

      //console.log(this.state.discription)

    } else {
      commonFunc.notifyMessage("The maximum content limit reached");
      quill.deleteText(1500, quill.getLength());
      this.setState({
        [name]: quill.getText(0, 1500),
        contentLength: editor.getLength()
      })
    }
  };

  selectCategory =() =>{
    const config = {
      headers: {
        'Authorization': `Bearer ${Cookies.get(ACCESS_TOKEN)}`,
      },
    };
    axios.post(`${constants.SERVER_URL}article/admin/viewcategory`, config)
      .then(response => {
        if (response.data.success) {

         
          this.setState({
            categorys : response.data.body,
           

          })
        }
      })
      .catch(error => {
      })
      .finally(fin => {

      })
  


  }




  changeState = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
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
  validateContent = (status) => {
    let { htmlText, croppedImageUrl, topic,selectedCategoryId } = this.state;
    topic.trim() === "" ? commonFunc.notifyMessage("Headline cannot be empty", 0) :
      croppedImageUrl === "" ? commonFunc.notifyMessage("Please select a image and crop", 0) :
      selectedCategoryId === "" ? commonFunc.notifyMessage("Please select a cetagory", 0) :
        htmlText.trim() === "<p><br></p>" || htmlText.trim() === "" ? commonFunc.notifyMessage("Content cannot be empty", 0) :
          swal({
            title: constants.ARE_YOU_SURE_TEXT, icon: null, closeOnClickOutside: false,
            buttons: { cancel: 'No', dangerMode: { text: "Yes", value: "action", className: "okay-btn" } },
          }).then((value) => {
            switch (value) {
              case "action":
                // 0 = Draft, 1 = publish, 2 = hidden
                this.manageArticleHandler(status);
                break;
              default:
                break;
            }
          });
  };
  attachQuillRefs = () => {
    if (typeof this.reactQuillRef.getEditor !== 'function') return;
    this.quillRef = this.reactQuillRef.getEditor();
  };

  manageArticleHandler = (status) => {

    switch (this.state.selectedApp) {
      case "Articles":
        {
          this.props.spinnerHandler(true);
          const data = {
            headline: this.state.topic,
            images: this.state.addMore,
            content: this.state.htmlText,
            description: this.state.discription,
            state: status,
            categoryId: this.state.selectedCategoryId,
            username: Cookies.get(ADMIN_USERNAME),
            appId: 1,
          };

          axios.post(constants.SERVER_URL + 'article/save', data)
            .then(response => {
              commonFunc.warningAlert(response.data.body, response.data.success);
              if (response.data.success) {
                this.setState({
                  ...initialState,

                });
                document.getElementById("crop-img-input").value = "";
                //console.log(this.state.addMore);
              }
              this.clear();
            })
            .catch(err => { })
            .finally(fin => {
              this.props.spinnerHandler(false);
            })
        }
        ; break;

      case "News":
        {
          console.log('still not develop');
        }
        ; break;

      default:
        break;
    }
  }




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
          // console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, 'image/jpeg');
    });
  }

  addMoreHandler = () => {
    this.setState(state => {
      let addMore = state.addMore.push(this.state.base64string);
    });
    this.setState({
      croppedImageUrl: false,
      src: false,
    })


  }


  deleteHandler = (addMoreIndex) => {
    const addMore = [...this.state.addMore];
    addMore.splice(addMoreIndex, 1);
    this.setState({ addMore: addMore })

  }
  clear = () => {
    this.setState({
      addMore: [],
      imageList: [],
      categorys:[],
      selectedApp: localStorage.getItem('selectedApp')
    });
  }

  render() {
 
    let { crop, croppedImageUrl, src, htmlText, topic, addMore, imageList } = this.state;
let optionItems = this.state.categorys.map(category =>
  ({ value: category.categoryId, label: category.categoryName})
  );

    return (
      <div className={"create-main"}>


<div>
  

</div>


        <div className={"form-body"}>
          <h1 className="form-title">Create {this.state.selectedApp}</h1>
          <div>
            <Label className="form-label">Headline</Label>
            <Input
              name={"topic"}
              type="text"
              value={topic}
              className="form-input"
              required
              onChange={this.changeState}
              placeholder="Add Headline" />
          </div>
          <div>
            <Label className="form-label">Select Category</Label>
            <Select
            className="select-input"
//value={this.state.selectedCategoryId}
              name="catagoryId"
             onChange={this.changeHandler}
              options={optionItems}
              onChange={e => this.setState({selectedCategoryId: e.value})}
            />
          </div>
          <div>
          </div>
          {/* { this.state.categorys !==null &&

this.state.categorys.map((category1,index)=> (

  <Col lg="2" key={category1.categoryId} className={"img-col"}>
    <Card className={"card"}>
{category1.categoryName}
      <i close className={"delete-icon icofont-close"} onClick={() => this.selectCateHandler(index)} />

    </Card>

  </Col>

))

} */}
          <div>
            <div>
              <input type="file" accept="image/*" onChange={this.onSelectFile} id={"crop-img-input"} />
            </div>
            <Row>
              <Col lg="12" className={"upload-img-col"}>
                {src && (

                  <div>
                    <Col lg="10">
                      <ReactCrop
                        src={src}
                        crop={crop}
                        ruleOfThirds
                        style={{ maxWidth: '25%' }}
                        onImageLoaded={this.onImageLoaded}
                        onComplete={this.onCropComplete}
                        onChange={this.onCropChange}
                      />

                    </Col>
                    <Col lg="2">
                      <Button className="com-btn submit-btn" onClick={this.addMoreHandler}>Select</Button>
                    </Col>
                  </div>
                )
                }
              </Col>
              {
                croppedImageUrl && (
                  croppedImageUrl !== "" && <Col lg="12" className={"crop-img-col"}>

                    <img alt="Crop Img Preview Here" style={{ maxWidth: '25%' }} src={croppedImageUrl} />



                  </Col>
                )
              }

            </Row>
            <Row>
              {

                this.state.addMore.map((image, index) => (

                  <Col lg="2" key={image.id} className={"img-col"}>
                    <Card className={"card"}>
                      <CardImg className={"image-grid"} src={image} alt="test">
                      </CardImg>
                      <i close className={"delete-icon icofont-close"} onClick={() => this.deleteHandler(index)} />

                    </Card>

                  </Col>

                ))

              }
    
            </Row>
          </div>
          <div>
            <Label className="form-label">Edit your content</Label>
            <ReactQuill
              ref={(el) => {
                this.reactQuillRef = el
              }}
              theme={"snow"}
              onChange={this.handleChangeQuil('htmlText')}
              value={htmlText}
              modules={App.modules}
              formats={App.formats}
              bounds={'.app'}
              placeholder={`Type your content`}
            />
          </div>

          <div>
            <div className={"content-length"}>
              <Label>

                {this.state.contentLength - 1} /1500
              </Label>
            </div>
          </div>

          <div className={"button-group"}>
            <Button className="com-btn submit-btn" onClick={() => this.validateContent(1)}>Publish</Button>
            <Button className="com-btn close-btn" onClick={() => this.validateContent(0)}>Draft</Button>
            {/*<Button className="com-btn close-btn">Reset</Button>*/}
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.attachQuillRefs()
    this.selectCategory()
    this.clear()
  }

  componentDidUpdate() {
    this.attachQuillRefs()
    this.selectCategory()
  }
}

App.modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' },
    { 'indent': '-1' }, { 'indent': '+1' }],
    ['link',
      // 'image', 'video'
    ],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
};

App.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  //
  // 'link',
  // 'image', 'video'
];

const mapDispatchToProps = (dispatch) => ({
  spinnerHandler: data => dispatch(actionSpinnerCreator.spinnerHandler(data)),

});
export default connect(null, mapDispatchToProps)(withRouter(App));

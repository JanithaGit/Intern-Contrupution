import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-image-crop/dist/ReactCrop.css';
import axios from '../../../../services/axios';
import {
  Button,
  Input,
  Label,
  Modal
} from 'reactstrap';
import { connect } from "react-redux";
import * as commonFunc from '../../../../utils/commonFunction';
import * as constants from '../../../../const/constants';
import Cookies from "js-cookie";
import { ADMIN_USERNAME } from "../../../../const/constants";
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
  encoded: "",

  topic: '', //for heading
  base64string: '',//for img
  htmlText: '',//for text field
  contentLength: 1,
  updateHeadline: '',
  updateImg: [],
  updateContent: '',

};

class App extends Component {
  state = Object.assign({}, initialState);

  handleChangeQuil = (name) => (value, delta, source, editor) => {
    let quill = this.quillRef_;
    let contentLength = editor.getLength();

    if (contentLength <= 1500) {
      this.setState({
        [name]: value,
        contentLength: editor.getLength(),
        discription: contentLength <= 100 ? editor.getText() : editor.getText(0, 100) + '...'
      });

    } else {
      commonFunc.notifyMessage("The maximum content limit reached");
      quill.deleteText(1500, quill.getLength());
      this.setState({
        [name]: quill.getText(0, 1500),
        contentLength: editor.getLength()
      })
    }
  };

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
  onImageLoaded = image => {
    this.imageRef = image;
  };
  onCropComplete = crop => {
    this.makeClientCrop(crop);
  };
  onCropChange = (crop, percentCrop) => {
    this.setState({ crop });

  };
  validateContent = () => {
    let { htmlText, topic } = this.state;
    topic.trim() === "" ? commonFunc.notifyMessage("Headline cannot be empty", 0) :
      htmlText.trim() === "<p><br></p>" || htmlText.trim() === "" ? commonFunc.notifyMessage("Content cannot be empty", 0) :
        swal({
          title: constants.ARE_YOU_SURE_TEXT, icon: null, closeOnClickOutside: false,
          buttons: { cancel: 'No', dangerMode: { text: "Yes", value: "action", className: "okay-btn" } },
        }).then((value) => {
          switch (value) {
            case "action":
              this.manageArticleHandler();
              break;
            default:
              break;
          }
        });
  };

  manageArticleHandler = () => {
    this.props.spinnerHandler(true);
    let { body } = this.props;
    const data = {
      id: body.id,
      noOfLikes: body.noOfLikes,
      noOfViews: body.noOfViews,
      headline: this.state.topic,
      images: [],
      content: this.state.htmlText,
      discription: this.state.discription,
      state: body.state,
      categoryId: body.categoryId,
      username: Cookies.get(ADMIN_USERNAME),
      appId: body.appId,
    };

    axios.put(constants.SERVER_URL + 'article/update', data)
      .then(response => {
        commonFunc.warningAlert(response.data.success ? "Article updated!" : response.data.message, response.data.success);
        this.props.refreshData();
      })
      .catch(err => { })
      .finally(fin => {
        this.props.spinnerHandler(false)
      })
  };

  attachQuillRefs = () => {
    if (typeof this.reactQuillRefEdt.getEditor !== 'function') return;
    this.quillRef_ = this.reactQuillRefEdt.getEditor();

    let quill = this.quillRef_;
    if (quill) {
      quill.deleteText(1500, quill.getLength());
      if (this.state.contentLength !== quill.getLength()) {
        this.setState({
          htmlText: quill.getText(0, 1500),
          contentLength: quill.getLength()
        });
      }
    }
  };
  setArticleDetails = () => {
    let { body } = this.props;
    if (body) {
      this.setState({
        topic: body.headline,
        htmlText: body.content,
        images: [],

      })
    }
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

  componentDidMount() {
    this.setArticleDetails();
  }

  componentDidUpdate() {
    this.attachQuillRefs();
  }

  render() {

    let { htmlText, topic } = this.state;

    return (
      <Modal isOpen={true}>
        <div className={"update-article-modal"}>
          <div>
            <h1 className="form-title">Update Article</h1>
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
              <Label className="form-label">Edit your content</Label>
              <ReactQuill
                ref={(el) => {
                  this.reactQuillRefEdt = el
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

            <div className={"button-group align-right"}>
              <Button className="com-btn submit-btn" onClick={this.validateContent}>Update</Button>
              <Button className="com-btn close-btn" onClick={() => this.props.modalHandler(null)}>Close</Button>

            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

App.modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' },
    { 'indent': '-1' }, { 'indent': '+1' }],
    ['link'],
    ['clean']
  ],
  clipboard: {
    matchVisual: false,
  }
};

App.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
];

const mapStateToProps = (state) => ({
  selectArticle: state.article.selectArticle
});

const mapDispatchToProps = (dispatch) => ({
  // updateDetailsHandler: data => dispatch(updateArticleHandler.updateDetailsHandler(data)),
  spinnerHandler: data => dispatch(actionSpinnerCreator.spinnerHandler(data)),
});


export default connect(null, mapDispatchToProps)(withRouter(App));

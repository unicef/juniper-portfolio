import React, { Fragment, Component } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";

export default class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploading: false,
      url: props.url || "/upload",
      showStatus: props.showStatus,
    };

    this.uploadId = Math.round(Math.random() * 1e9);
    this.fileInput = React.createRef();
  }

  uploadFile = async (e) => {
    if (this.fileInput.current.files[0]) {
      const formData = new FormData();

      formData.append("image", this.fileInput.current.files[0]);
      const response = await fetch(this.state.url, {
        method: "POST",
        body: formData,
      });
      const json = await response.json();
      const { url, size, mime } = json;

      if (this.props.afterUpload) {
        this.props.afterUpload(json);
      }

      this.setState({
        uploading: false,
      });

      this.fileInput.current.value = "";
    }
  };

  render() {
    return (
      <Fragment>
        <input
          accept="image/*"
          id={this.uploadId}
          multiple
          type="file"
          onChange={this.uploadFile}
          ref={this.fileInput}
          style={{ display: "none" }}
        />
        <div
          style={{ cursor: "pointer" }}
          onClick={(e) => {
            if (this.state.uploading || this.props.disabled) {
              return;
            }
            this.setState({
              uploading: true,
            });
            document.getElementById(`${this.uploadId}`).click();
          }}
        >
          {this.state.uploading && this.state.showStatus ? (
            <LinearProgress style={{ marginTop: "3em" }} />
          ) : (
            this.props.children
          )}
        </div>
      </Fragment>
    );
  }
}

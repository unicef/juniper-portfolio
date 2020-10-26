import React, { Fragment, Component } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";

export default class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: props.url || "/upload/image",
      showStatus: true, //props.showStatus,
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

      if (this.props.afterUpload) {
        this.props.afterUpload(json);
      }

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
          onBlur={() => {
            console.log("blur");
          }}
          ref={this.fileInput}
          style={{ display: "none" }}
        />
        <div
          style={{ cursor: "pointer", display: "inline-block" }}
          onClick={(e) => {
            if (!this.fileInput.current.value === "" || this.props.disabled) {
              return;
            }

            document.getElementById(`${this.uploadId}`).click();
          }}
        >
          {this.fileInput &&
          this.fileInput.current &&
          !this.fileInput.current.value === "" &&
          this.state.showStatus ? (
            <LinearProgress style={{ marginTop: "3em" }} />
          ) : (
            this.props.children
          )}
        </div>
      </Fragment>
    );
  }
}

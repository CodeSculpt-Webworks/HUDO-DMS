import "./IncomingForm.css";
import { useState, useCallback } from "react";
import { Button, TextInput, RadioButton } from "../..";
import { HudoLogo } from "../../../assets";
import { useDropzone } from "react-dropzone";
import Modal from "react-modal";
import axios from "axios";

const inputStyle = {
  height: 55,
  marginRight: 10,
};

const fullWidthInputStyle = {
  ...inputStyle,
  width: "100%",
};

const halfWidthInputStyle = {
  ...inputStyle,
  width: "50%",
};

const buttonStyle = {
  height: 55,
  width: "24%",
  marginRight: 10,
};

Modal.setAppElement("#root");

export const IncomingForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    trackingNumber: "",
    from: "",
    to: "",
    subject: "",
    option: "",
    attachmentFile: null,
    attachmentName: "",
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: useCallback((acceptedFiles: File[]) => {
      const attachment = acceptedFiles[0];
      const fileName = attachment.name;
      setFormData((prevFormData: FormData) => ({
        ...prevFormData,
        attachmentFile: attachment,
        attachmentName: fileName,
      }));
    }, []),
  });

  const handleRadioChange = (value: string) => {
    setFormData({ ...formData, option: value });
  };

  const handleInputChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async () => {
    try {
      const formDataObj = new FormData();
      formDataObj.append("title", formData.title);
      formDataObj.append("trackingNumber", formData.trackingNumber);
      formDataObj.append("from", formData.from);
      formDataObj.append("to", formData.to);
      formDataObj.append("subject", formData.subject);
      formDataObj.append("option", formData.option);
      formDataObj.append("attachmentFile", formData.attachmentFile);

      // Send form data to the backend
      const response = await axios.post(
        "http://192.168.1.16:5000/submit-form",
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);

      setFormData({
        title: "",
        trackingNumber: "",
        from: "",
        to: "",
        subject: "",
        option: "",
        attachmentFile: null,
        attachmentName: "",
      });

      alert("Form Submited Success!");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleClear = () => {
    setFormData({
      title: "",
      trackingNumber: "",
      from: "",
      to: "",
      subject: "",
      option: "",
      attachmentFile: null,
      attachmentName: "",
    });
  };

  return (
    <div className="main-container">
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <div className="row1">
            <TextInput
              label="Title"
              style={fullWidthInputStyle}
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
            />
            <div className="sub1">
              <TextInput
                label="Tracking Number"
                style={fullWidthInputStyle}
                value={formData.trackingNumber}
                onChange={(e) =>
                  handleInputChange("trackingNumber", e.target.value)
                }
              />
            </div>
          </div>
          <div className="row2">
            <TextInput
              label="From"
              style={halfWidthInputStyle}
              value={formData.from}
              onChange={(e) => handleInputChange("from", e.target.value)}
            />
            <div className="sub2">
              <TextInput
                label="To"
                style={fullWidthInputStyle}
                value={formData.to}
                onChange={(e) => handleInputChange("to", e.target.value)}
              />
            </div>
          </div>
          <div className="row3">
            <TextInput
              label="Subject"
              style={halfWidthInputStyle}
              value={formData.subject}
              onChange={(e) => handleInputChange("subject", e.target.value)}
            />
            <div className="sub3">
              <RadioButton
                label="Incoming"
                value="incoming"
                checked={formData.option === "incoming"}
                onChange={() => handleRadioChange("incoming")}
                style={halfWidthInputStyle}
              />
              <RadioButton
                label="Outgoing"
                value="outgoing"
                checked={formData.option === "outgoing"}
                onChange={() => handleRadioChange("outgoing")}
                style={halfWidthInputStyle}
              />
            </div>
          </div>
          <div className="row4">
            <div className="input-attachment-container" {...getRootProps()}>
              <div className="input-attachment">
                <div className="input-attachment-label">Attachment</div>
                <input {...getInputProps()} />
                <p>
                  {formData.attachmentName
                    ? formData.attachmentName
                    : "Drag 'n' drop or click to select a file"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="button-container">
        <Button label="Clear" style={buttonStyle} onClick={handleClear} />
        <Button label="Submit" style={buttonStyle} onClick={handleSubmit} />
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Example Modal"
        className="modal-container"
      >
        <img src={HudoLogo} alt="hudo-logo" />
        <p>Fill in all required fields</p>
        <button onClick={() => setModalIsOpen(false)}>Close</button>
      </Modal>
    </div>
  );
};

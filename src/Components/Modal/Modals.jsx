import Dropdown from "react-bootstrap/Dropdown";
// import { Dropdown } from 'bootstrap'
import React, { useState } from 'react'
import Button from "react-bootstrap/Button";
import "../Modal/ModalStyle.css";
import { DropdownButton } from 'react-bootstrap'
import Modal from "react-bootstrap/Modal"
import { Plus } from "react-feather";
function Modals({ setshowModel, showModel, refresh }) {
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");
  const [background, setbackground] = useState("#F9F5EB")
  const [forground, setforground] = useState('#fff');
  const [priority, setpriority] = useState("normal");

  const handleAdd = () =>{
  const savedData = JSON.parse(localStorage.getItem("Notes")) || [];
  if(!title) {
     return alert("Title and Content is Required");
  }
  let newData = {
    id : Date.now(),
    title,
    content,
    priority,
    background,
    forground,
    date : new Date().toLocaleDateString(),
  }
  savedData.push(newData);
  localStorage.setItem("Notes", JSON.stringify(savedData));
  settitle("");
  setcontent("");
  setpriority("normal");
  setshowModel(false);
  refresh();
  }
  const handleCancle = () => {
    settitle("");
    setcontent("");
    setpriority("normal");
    setshowModel(false);
    refresh();
  }
  const handleColor = (bg, fg) => {
    setbackground(bg);
    setforground(fg);
  }
  return (
    <>
      <Modal show={showModel} onHide={() => setshowModel(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" name="" id="" className="form-control mb-3"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => settitle(e.target.value)} />
          <label htmlFor="">Priority</label>
          <select name="" id="" className="form-control mb-3"
            value={priority}
            onChange={(e) => setpriority(e.target.value)}>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
          <textarea className="form-control"
            style={{ height: "180px" }}
            placeholder="Enter Notes...."
            value={content}
            onChange={(e) => setcontent(e.target.value)}>
          </textarea>
          <DropdownButton id="dropdown-basic-button" title="Select Theme">
            <Dropdown.Item href="#/action-1">
              <div className="d-flex"
                onClick={() => handleColor("#54BAB9", "#9ED2C6")}>
                <div className="circle" style={{ backgroundColor: "#54BAB9" }}>
                  <div className="circle mx-5"
                    style={{ backgroundColor: "#9ED2C6" }}>

                  </div>
                </div>
              </div>
            </Dropdown.Item>
            <Dropdown.Item href="#/action-2">
              <div className="d-flex"
                onClick={() => handleColor("#FFE898", "#FFF8BC")}>
                <div className="circle" style={{ backgroundColor: "#FFE898" }}>
                  <div className="circle mx-5"
                    style={{ backgroundColor: "#FFF8BC" }}>

                  </div>
                </div>
              </div>
            </Dropdown.Item>
            <Dropdown.Item href="#/action-3">
              <div className="d-flex"
                onClick={() => handleColor("#AFB4FF", "#B1E1FF")}>
                <div className="circle" style={{ backgroundColor: "#AFB4FF" }}>
                  <div className="circle mx-5"
                    style={{ backgroundColor: "#B1E1FF" }}>

                  </div>
                </div>
              </div>
            </Dropdown.Item>
            <Dropdown.Item>
              <div className="d-flex"
                onClick={() => handleColor("#F9F5EB", "#fff")}>
                <div className="circle" style={{ backgroundColor: "#F9F5EB" }}>
                  <div className="circle mx-5 shadow"
                    style={{ backgroundColor: "#fff" }}>

                  </div>
                </div>
                <br />
                <br />
                Default
              </div>
            </Dropdown.Item>
          </DropdownButton>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancle}>Cancle</Button>
          <Button variant="primary" onClick={handleAdd}><Plus />Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Modals

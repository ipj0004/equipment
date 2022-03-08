import React, { useState, useEffect } from 'react'
import logo from './components/logoTemp.PNG'
import axios from 'axios'
import Modal from 'react-modal'

Modal.setAppElement("#root")

function App() {
  /*************************************************************************/
  /****************************** useState *********************************/


  /*************************************************************************/
  /************* state for keeping Documents from Collection ***************/
  /*************************************************************************/
  const [allDocs, setAllDocs] = useState([])


  /*************************************************************************/
  /********** state for Modal which is about Adding New Document ***********/
  /*************************************************************************/
  const [newDocModalOpen, setNewDocModalOpen] = useState(false)


  /*************************************************************************/
  /********* state for creating Body to be Posted as New Document **********/
  /*************************************************************************/
  const [newDoc, setNewDoc] = useState({
    no: "",
    registrated: "",
    description: "",
    unitPrice: 0,
    qty: 0,
    department: "",
    owner: "",
    location: "",
    note: "",
    phoneNo: "",
    picture: { appearance: "", label: "" }
  })


  /*************************************************************************/
  /********** state for Modal which is about Discarding Document ***********/
  /*************************************************************************/
  const [disDocModalOpen, setDisDocModalOpen] = useState(false)


  /*************************************************************************/
  /****** state for Modal which is about Showing Discarded Documents *******/
  /*************************************************************************/
  const [disDocsModalOpen, setDisDocsModalOpen] = useState(false)


  /*************************************************************************/
  /******** state for keeping specific _id field inside map method *********/
  /*************************************************************************/
  const [tempId, setTempId] = useState("")


  /*************************************************************************/
  /******** state for keeping specific no field inside map method **********/
  /*************************************************************************/
  const [tempNo, setTempNo] = useState("")


  /*************************************************************************/
  /***** state for user's input to be compared with specific no field ******/
  /*************************************************************************/
  const [confirmNo, setConfirmNo] = useState("")


  /*************************************************************************/
  /********* state for writing reason when Discarding a Document ***********/
  /*************************************************************************/
  const [reason, setReason] = useState("")



  /*************************************************************************/
  /***************************** functions *********************************/


  /*************************************************************************/
  /********* function for getting all Documents in Collection **************/
  /*************************************************************************/
  async function fetchData() {
    const { data } = await axios.get(`/gvn7dqcu/`)
    console.log("DB connected")
    setAllDocs(data.found)
  }


  /*************************************************************************/
  /******** function for filtering Documents by registrated year ***********/
  /*************************************************************************/
  const filterContent = (docs, searchTerm) => {
    const result = docs.filter(
      (doc) =>
        doc.no.startsWith(searchTerm) === true
    )
    setAllDocs(result)
  }


  /*************************************************************************/
  /**** function for calling filterContent when Search Value is changed ****/
  /*************************************************************************/
  const handleTextSearch = (e) => {
    const searchTerm = e.currentTarget.value
    axios.get(`/gvn7dqcu/`).then((res) => {
      console.log("DB connected")
      if (res.data.success) {
        filterContent(res.data.found, searchTerm)
      }
    })
  }


  /*************************************************************************/
  /****** function for calling filterContent with current Search Value *****/
  /*************************************************************************/
  const reloadTextSearch = () => {
    const searchTerm = document.getElementById("searchTerm").value
    axios.get(`/gvn7dqcu/`).then((res) => {
      console.log("DB connected")
      if (res.data.success) {
        filterContent(res.data.found, searchTerm)
      }
    })
  }


  /*************************************************************************/
  /************* function for validating input one-byte number *************/
  /*************************************************************************/
  const isInputNumber = (e) => {
    const ch = String.fromCharCode(e.which)
    if (!(/[0-9]/.test(ch))) {
      e.preventDefault()
    }
  }


  /*************************************************************************/
  /******************* function for Posting New Document *******************/
  /*************************************************************************/
  const onSubmitNew = (e) => {
    e.preventDefault()
    const data = newDoc
    axios.post("/gvn7dqcu/add", data).then((res) => {
      if (res.data.success === true) {
        alert("Added")
        setNewDoc({
          no: "",
          registrated: "",
          description: "",
          unitPrice: 0,
          qty: 0,
          department: "",
          owner: "",
          location: "",
          note: "",
          phoneNo: "",
          appearance: "",
          label: ""
        })
        document.getElementById("no").value = ""
        document.getElementById("registrated").value = ""
        document.getElementById("description").value = ""
        document.getElementById("unitPrice").value = ""
        document.getElementById("qty").value = ""
        document.getElementById("department").value = ""
        document.getElementById("owner").value = ""
        document.getElementById("location").value = ""
        document.getElementById("note").value = ""
        document.getElementById("phoneNo").value = ""
        document.getElementById("appearance").value = ""
        document.getElementById("label").value = ""
      }
    })
  }


  /*************************************************************************/
  /******************* function for Discarding Document ********************/
  /*************************************************************************/
  const onSubmitDiscard = (id, no) => {
    if (confirmNo === no) {
      const body = { discarded: true, discardedReason: reason }
      axios.put(`/gvn7dqcu/update/${id}`, body).then((res) => {
        alert("SupplyNo: " + res.data.before.no + " has been discarded successfully")
        fetchData()
        setConfirmNo("")
        setTempId("")
        setTempNo("")
        reloadTextSearch()
        setDisDocModalOpen(false)
      })
    } else if (confirmNo) {
      alert("wrong SupplyNo")
    } else {

    }
  }


  /*************************************************************************/
  /******************* function for Resuming Document **********************/
  /*************************************************************************/
  const resumeItem = (id, no) => {
    const chkNo = prompt("Almost done!\n\nPlease type " + no + " to make sure this is the correct one\n\n(Only one-byte characters available)")
    if (chkNo === no) {
      const body = { discarded: false, discardedReason: "" }
      axios.put(`/gvn7dqcu/update/${id}`, body).then((res) => {
        alert("SupplyNo: " + res.data.before.no + " has been resumed successfully\n\nPlease click 'Reload Data'  if you can't see resumed item")
        fetchData()
      })
    } else if (chkNo) {
      alert("wrong SupplyNo")
    } else {

    }
  }


  /*************************************************************************/
  /******************* function for Deleting Document **********************/
  /*************************************************************************/
  const deleteItem = (id, no) => {
    const chkNo = prompt("The selected item will be lost permanently\n\nPlease type " + no + " to make sure the correct one was selected\n\n(Only one-byte characters available)")
    if (chkNo === no) {
      axios.delete(`/gvn7dqcu/delete/${id}`).then((res) => {
        alert("SupplyNo: " + res.data.no + " has been deleted successfully")
        fetchData()
      })
    } else if (chkNo) {
      alert("wrong SupplyNo")
    } else {

    }
  }


  /*************************************************************************/
  /****************************** useEffect ********************************/
  useEffect(() => {
    fetchData()
  }, [])


  /*************************************************************************/
  /***************************** Modal Style *******************************/
  const modalStyle = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      backgroundColor: "rgba(0,0,0,0.85)"
    },
    content: {
      position: "absolute",
      top: "1rem",
      left: "3rem",
      right: "3rem",
      bottom: "1rem",
      backgroundColor: "paleturquoise",
      borderRadius: "1rem",
      padding: "1.5rem"
    }
  }


  /*************************************************************************/
  /****************************** return JSX *******************************/
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <img src={logo} className="d-inline-block align-text-top" alt="logo" />&nbsp;
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <button className="btn btn-outline-success" onClick={() => setNewDocModalOpen(true)}>
                <i className="fas fa-plus"></i>
                &nbsp;New Registration
                </button>
                <Modal isOpen={newDocModalOpen} style={modalStyle}>
                  <div className="col-md-10 mt-3 mx-auto">
                    <h1>Adding New Item</h1>
                    <form className="needs-validation" noValidate>
                      <div className="form-group">
                        <input
                          required
                          id="no"
                          maxLength="10"
                          type="text"
                          className="form-control"
                          placeholder="SupplyNo, must fill out, must be unique, example: 20yy-00n"
                          onChange={(e) => {
                            if (e.target.value.includes() !== true) {
                              setNewDoc({ ...newDoc, no: e.target.value })
                            }
                          }}
                        />
                      </div>

                      <div className="form-group">
                        <input
                          id="registrated"
                          maxLength="10"
                          type="text"
                          className="form-control"
                          placeholder="register date, example: 20yy-mm-dd"
                          onChange={(e) => {
                            setNewDoc({ ...newDoc, registrated: e.target.value })
                          }}
                        />
                      </div>

                      <div className="form-group">
                        <input
                          id="description"
                          maxLength="30"
                          type="text"
                          className="form-control"
                          placeholder="description, maxLength=30"
                          onChange={(e) => {
                            setNewDoc({ ...newDoc, description: e.target.value })
                          }}
                        />
                      </div>

                      <div className="form-group">
                        <input
                          id="unitPrice"
                          maxLength="8"
                          type="tel"
                          className="form-control"
                          placeholder="unitPrice, example: 9980"
                          onKeyPress={isInputNumber}
                          onChange={(e) => {
                            setNewDoc({ ...newDoc, unitPrice: e.target.value })
                          }}
                        />
                      </div>

                      <div className="form-group">
                        <input
                          id="qty"
                          maxLength="5"
                          type="tel"
                          className="form-control"
                          placeholder="Qty, example: 5"
                          onKeyPress={isInputNumber}
                          onChange={(e) => {
                            setNewDoc({ ...newDoc, qty: e.target.value })
                          }}
                        />
                      </div>

                      <div className="form-group">
                        <input
                          id="department"
                          maxLength="20"
                          type="text"
                          className="form-control"
                          placeholder="department, example: Shinjuku, or GW etc."
                          onChange={(e) => {
                            setNewDoc({ ...newDoc, department: e.target.value })
                          }}
                        />
                      </div>

                      <div className="form-group">
                        <input
                          id="owner"
                          maxLength="20"
                          type="text"
                          className="form-control"
                          placeholder="owner"
                          onChange={(e) => {
                            setNewDoc({ ...newDoc, owner: e.target.value })
                          }}
                        />
                      </div>

                      <div className="form-group">
                        <input
                          id="location"
                          maxLength="20"
                          type="text"
                          className="form-control"
                          placeholder="location, example: Ogano 1F"
                          onChange={(e) => {
                            setNewDoc({ ...newDoc, location: e.target.value })
                          }}
                        />
                      </div>

                      <div className="form-group">
                        <input
                          id="note"
                          maxLength="50"
                          type="text"
                          className="form-control"
                          placeholder="any comment, maxLength=50"
                          onChange={(e) => {
                            setNewDoc({ ...newDoc, note: e.target.value })
                          }}
                        />
                      </div>

                      <div className="form-group">
                        <input
                          id="phoneNo"
                          maxLength="20"
                          type="tel"
                          className="form-control"
                          placeholder="phoneNo (Optional, if adding mobilePhones etc.) example: 090-1111-2222"
                          onChange={(e) => {
                            setNewDoc({ ...newDoc, unitPrice: e.target.value })
                          }}
                        />
                      </div>

                      <div className="form-group">
                        <input
                          id="appearance"
                          maxLength="50"
                          type="text"
                          className="form-control"
                          placeholder="URL text of appearance picture, maxLength=50"
                          onChange={(e) => {
                            setNewDoc({ ...newDoc, appearance: e.target.value })
                          }}
                        />
                      </div>

                      <div className="form-group">
                        <input
                          id="appearance"
                          maxLength="50"
                          type="text"
                          className="form-control"
                          placeholder="URL text of label picture, maxLength=50"
                          onChange={(e) => {
                            setNewDoc({ ...newDoc, label: e.target.value })
                          }}
                        />
                      </div>

                      <hr style={{ width: '1000px' }} />

                      <div>
                        <button
                          className="btn btn-success"
                          type="submit"
                          onClick={onSubmitNew}
                        >
                          <i className="far fa-check-square"></i>
                          &nbsp;Submit
                        </button>
                        &nbsp;
                        <button
                          className="btn btn-secondary"
                          onClick={() => setNewDocModalOpen(false)}>
                          Close
                        </button>
                      </div>
                    </form>
                  </div>
                </Modal>
                &nbsp;
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-secondary" onClick={() => setDisDocsModalOpen(true)}>
                <i className="fas fa-list-ol"></i>
                &nbsp;See Discarded Items
                </button>
                <Modal isOpen={disDocsModalOpen} style={modalStyle}>
                  <div className="container">
                    <h1>Showing Discarded Items</h1>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">SupplyNo</th>
                          <th scope="col">Description</th>
                          <th scope="col">Reason</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allDocs.filter(doc => doc.discarded === true).map((doc, index) => {
                          return (
                            <tr key={'tr' + index.toString()}>
                              <th key={'th' + index.toString()} scope="row">{index}</th>
                              <td key={'no' + index.toString()}>{doc.no}</td>
                              <td key={'desc' + index.toString()}>{doc.description}</td>
                              <td key={'reason' + index.toString()}>{doc.discardedReason}</td>
                              <td>
                                <a className="btn btn-primary" onClick={() => resumeItem(doc._id, doc.no)}>
                                  <i className="fas fa-file-alt"></i>&nbsp;Resume
                                </a>
                                &nbsp;
                                <a className="btn btn-success" href="#">
                                  <i className="fas fa-file-alt"></i>&nbsp;Show
                                </a>
                                &nbsp;
                                <a className="btn btn-danger" onClick={() => deleteItem(doc._id, doc.no)}>
                                  <i className="far fa-trash-alt"></i>&nbsp;Delete
                                </a>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                  <button onClick={() => setDisDocsModalOpen(false)}>close</button>
                </Modal>
                &nbsp;
              </li>
            </ul>
            <div className="ms-auto">
              <form className="d-flex">
                <i className="fas fa-search"></i>
                <input
                  className="form-control me-2"
                  id="searchTerm"
                  maxLength='25'
                  type="search"
                  placeholder="Search -> SupplyNo"
                  aria-label="Search"
                  onChange={handleTextSearch}
                >
                </input>
              </form>
            </div>
          </div>
        </div>
      </nav>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">SupplyNo</th>
              <th scope="col">Description</th>
              <th scope="col">Location</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allDocs.filter(doc => doc.discarded === false).sort((a, b) => {
              if (a.no > b.no) {
                return 1;
              } else {
                return -1;
              }
            }).map((doc, index) => {
              return (
                <tr key={'tr' + index.toString()}>
                  <th key={'th' + index.toString()} scope="row">{index}</th>
                  <td key={'no' + index.toString()}>{doc.no}</td>
                  <td key={'regi' + index.toString()}>{doc.description}</td>
                  <td key={'desc' + index.toString()}>{doc.location}</td>
                  <td _id={doc._id} no={doc.no}>
                    <a className="btn btn-success" href="#">
                      <i className="fas fa-file-alt"></i>&nbsp;Show
                    </a>
                    &nbsp;
                    <a className="btn btn-warning" href="#">
                      <i className="fas fa-edit"></i>&nbsp;Edit
                    </a>
                    &nbsp;
                    <button className="btn btn-secondary" onClick={() => {
                      setTempId(doc._id)
                      setTempNo(doc.no)
                      setDisDocModalOpen(true)
                    }}>
                      <i className="far fa-trash-alt"></i>&nbsp;Discard
                    </button>
                    <Modal isOpen={disDocModalOpen} style={modalStyle}>
                      <div className="col-md-10 mt-3 mx-auto">
                        <h1>Discard SupplyNo {tempNo} ?</h1>
                        <div className="form-group">
                          <label>
                            {`Please type ${tempNo} to make sure you are choosing the correct one`}
                            <input
                              required
                              id="no"
                              maxLength="10"
                              type="text"
                              className="form-control"
                              placeholder="example: 20yy-00n"
                              onChange={(e) => setConfirmNo(e.target.value)}
                            />
                          </label>
                        </div>
                        <div className="form-group">
                          <label>
                            You can write reason shortly
                            <input
                              id="discardedReason"
                              maxLength="20"
                              type="text"
                              className="form-control"
                              placeholder="example: created by mistake, test, etc."
                              onChange={(e) => setReason(e.target.value)}
                            />
                          </label>
                        </div>
                        <hr style={{ width: '1000px' }} />
                        <div>
                          <button
                            className="btn btn-success"
                            onClick={() => onSubmitDiscard(tempId, tempNo)}
                          >
                            <i className="far fa-check-square"></i>
                            &nbsp;Submit
                          </button>
                          &nbsp;
                          <button
                            className="btn btn-secondary"
                            onClick={() => setDisDocModalOpen(false)}>
                            Cancel
                          </button>
                        </div>
                      </div>
                    </Modal>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
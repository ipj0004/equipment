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
    appearance: "",
    label: ""
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
  /***** state for Modal which is about Showing All Data of a document *****/
  /*************************************************************************/
  const [detailModalOpen, setDetailModalOpen] = useState(false)


  /*************************************************************************/
  /******* state for Modal which is about Editing Data of a document *******/
  /*************************************************************************/
  const [editModalOpen, setEditModalOpen] = useState(false)


  /*************************************************************************/
  /** state for keeping entire fields of a specific doc inside map method **/
  /*************************************************************************/
  const [tempDoc, setTempDoc] = useState({})


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
  /************* state for Modal which is about Rental History *************/
  /*************************************************************************/
  const [rentalHistoryModalOpen, setRentalHistoryModalOpen] = useState(false)



  /*************************************************************************/
  /***************************** functions *********************************/


  /*************************************************************************/
  /********* function for getting all Documents in Collection **************/
  /*************************************************************************/
  function fetchData() {
    axios.get(`/gvn7dqcu/`).then((res) => {
      if (res.data.success) {
        setAllDocs(res.data.found)
      }
    })
  }


  /*************************************************************************/
  /******** function for filtering Documents by multiple keywords **********/
  /*************************************************************************/
  const filterContent = (docs, searchSupplyNo, searchRegistrated, searchDescription, searchDept, searchOwner, searchNote) => {
    const result = docs.filter(
      (doc) =>
        doc.no.includes(searchSupplyNo)
        &&
        doc.registrated.includes(searchRegistrated)
        &&
        doc.description.toLowerCase().includes(searchDescription.toLowerCase())
        &&
        doc.department.toLowerCase().includes(searchDept.toLowerCase())
        &&
        doc.owner.toLowerCase().includes(searchOwner.toLowerCase())
        &&
        doc.note.toLowerCase().includes(searchNote.toLowerCase())
    )
    setAllDocs(result)
  }


  /*************************************************************************/
  /******* function for preparing arguments of filterContent function ******/
  /*************************************************************************/
  const handleTextSearch = () => {
    const searchSupplyNo = document.getElementById("searchSupplyNo").value
    const searchRegistrated = document.getElementById("searchRegistrated").value
    const searchDescription = document.getElementById("searchDescription").value
    const searchDept = document.getElementById("searchDept").value
    const searchOwner = document.getElementById("searchOwner").value
    const searchNote = document.getElementById("searchNote").value
    axios.get(`/gvn7dqcu/`).then((res) => {
      if (res.data.success) {
        filterContent(res.data.found, searchSupplyNo, searchRegistrated, searchDescription, searchDept, searchOwner, searchNote)
      }
    })
  }


  /*************************************************************************/
  /******************* function for Posting New Document *******************/
  /*************************************************************************/
  const onSubmitNew = () => {
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
        handleTextSearch()
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
    const chkNo = prompt("Almost done!\n\nPlease type " + no + " to make sure you are choosing the correct one")
    if (chkNo === no) {
      const body = { discarded: false, discardedReason: "" }
      axios.put(`/gvn7dqcu/update/${id}`, body).then((res) => {
        alert("SupplyNo: " + res.data.before.no + " has been resumed successfully")
        handleTextSearch()
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
    const chkNo = prompt("The selected item will be lost permanently\n\nPlease type " + no + " to make sure the correct one was selected")
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
  /**************** function for Calculating Total Price *******************/
  /*************************************************************************/
  function totalPriceCalc(unitPrice, qty) {
    if (unitPrice * qty) {
      return (unitPrice * qty)
    } else {
      return ("")
    }
  }


  /*************************************************************************/
  /*************** function for Displaying Rental History ******************/
  /*************************************************************************/
  function rentalHistory(history) {
    let rtn
    if (history) {
      rtn = history.map((hist, index) => {
        return (
          <tr key={'tr' + index.toString()}>
            <td key={'user' + index.toString()}>{hist.user}</td>
            <td key={'since' + index.toString()}>{hist.since}</td>
          </tr>
        )
      })
    } else {
      rtn = <tr></tr>
    }
    return (rtn)
  }


  /*************************************************************************/
  /************** function for Displaying Boolean as String ****************/
  /*************************************************************************/
  function displayDiscarded(document) {
    if (document.discarded) {
      return ("true, reason: " + document.discardedReason)
    }
    if (!document.discarded) {
      return ("false")
    }
    return ("no valid data")
  }


  /*************************************************************************/
  /****************** function for Editing a document **********************/
  /*************************************************************************/
  function onSubmitEdit(id) {
    if (id) {
      const body = newDoc
      axios.put(`/gvn7dqcu/update/${id}`, body).then((res) => {
        alert("SupplyNo: " + res.data.before.no + " has been edited successfully")
        setTempDoc(newDoc)
        fetchData()
      })
    }
  }


  /*************************************************************************/
  /**************** function for getting a specific doc ********************/
  /*************************************************************************/
  async function getDoc(id) {
    if(id) {
      const { data } = await axios.get(`/gvn7dqcu/detail/${id}`)
      setTempDoc(data.found)
    }
  }


  /*************************************************************************/
  /****************************** useEffect ********************************/
  useEffect(() => {
    fetchData()
  }, [])


  /*************************************************************************/
  /****************************** Modal Style ******************************/
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
                <button className="btn btn-outline-success" onClick={() => {
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
                  setNewDocModalOpen(true)
                }}>
                  <i className="fas fa-plus"></i>
                  &nbsp;New Registration
                </button>
                <Modal isOpen={newDocModalOpen} style={modalStyle}>
                  <div className="col-md-10 mx-auto">
                    <h1>Adding New Item</h1>
                    <hr />
                    <div className="form-group">
                      <label>SupplyNo
                        <input
                          required
                          id="no"
                          maxLength="20"
                          type="text"
                          className="form-control"
                          placeholder=""
                          onChange={(e) => {
                            if (e.target.value.includes() !== true) {
                              setNewDoc({ ...newDoc, no: e.target.value })
                            }
                          }}
                          onBlur={() => {
                            if (document.getElementById("no").value) {
                              const check = document.getElementById("no").value
                              if (!(/^[!-~]*$/.test(check))) {
                                alert("Supply No is supposed to consist of one-byte charactors without space\n\nyour input into this field will be canceled")
                                document.getElementById("no").value = ""
                                setNewDoc({ ...newDoc, no: "" })
                              }
                            }
                          }}
                        /></label>
                      <p>Remark: [ required to input, must be unique through the system, recommended format: 20yy-nnn ]</p>
                    </div>
                    <hr />

                    <div className="form-group">
                      <label>Registrated
                        <input
                          id="registrated"
                          maxLength="10"
                          type="text"
                          className="form-control"
                          placeholder=""
                          onChange={(e) => {
                            setNewDoc({ ...newDoc, registrated: e.target.value })
                          }}
                          onBlur={() => {
                            if (document.getElementById("registrated").value) {
                              const check = document.getElementById("registrated").value
                              if (!(/\d{4}-\d{2}-\d{2}/.test(check))) {
                                alert("please input Registrated Date in the right format: 20yy-mm-dd\n\nyour input into this field will be canceled")
                                document.getElementById("registrated").value = ""
                                setNewDoc({ ...newDoc, registrated: "" })
                              }
                            }
                          }}
                        /></label>
                      <p>Remark: [ Registrated Date, strict format: 20yy-mm-dd ]</p>
                    </div>
                    <hr />

                    <div className="form-group">
                      <p>Description</p>
                      <input
                        id="description"
                        maxLength="70"
                        type="text"
                        className="form-control"
                        placeholder=""
                        onChange={(e) => {
                          setNewDoc({ ...newDoc, description: e.target.value })
                        }}
                      />
                      <p>Remark: [ maxLength=70 ]</p>
                    </div>
                    <hr />

                    <div className="form-group">
                      <label>Unit Price (extax)
                        <input
                          id="unitPrice"
                          maxLength="10"
                          type="tel"
                          className="form-control"
                          placeholder="e.g. 9980"
                          onChange={(e) => {
                            setNewDoc({ ...newDoc, unitPrice: e.target.value })
                          }}
                          onBlur={() => {
                            if (document.getElementById("unitPrice").value) {
                              const check = document.getElementById("unitPrice").value
                              if (!(/^[0-9]*$/.test(check))) {
                                alert("Unit Price is supposed to consist of one-byte numbers without even comma「 , 」\n\nyour input into this field will be canceled\n\nif you need to input after the decimal point, please contact system administrator")
                                document.getElementById("unitPrice").value = ""
                                setNewDoc({ ...newDoc, unitPrice: "" })
                              }
                            }
                          }}
                        /></label>
                    </div>
                    <hr />

                    <div className="form-group">
                      <label>Qty
                        <input
                          id="qty"
                          maxLength="5"
                          type="tel"
                          className="form-control"
                          placeholder=""
                          onChange={(e) => {
                            setNewDoc({ ...newDoc, qty: e.target.value })
                          }}
                          onBlur={() => {
                            if (document.getElementById("qty").value) {
                              const check = document.getElementById("qty").value
                              if (!(/^[0-9]*$/.test(check))) {
                                alert("Qty is supposed to consist of one-byte numbers\n\nyour input will be canceled")
                                document.getElementById("qty").value = ""
                                setNewDoc({ ...newDoc, qty: "" })
                              }
                            }
                          }}
                        /></label>
                    </div>
                    <hr />

                    <div className="form-group">
                      <label>Department
                        <input
                          id="department"
                          maxLength="20"
                          type="text"
                          className="form-control"
                          placeholder=""
                          onChange={(e) => {
                            setNewDoc({ ...newDoc, department: e.target.value })
                          }}
                        /></label>
                      <p>Remark: [ maxLength=20 ]</p>
                    </div>
                    <hr />

                    <div className="form-group">
                      <label>Owner
                        <input
                          id="owner"
                          maxLength="20"
                          type="text"
                          className="form-control"
                          placeholder=""
                          onChange={(e) => {
                            setNewDoc({ ...newDoc, owner: e.target.value })
                          }}
                        /></label>
                    </div>
                    <hr />

                    <div className="form-group">
                      <label>Location
                        <input
                          id="location"
                          maxLength="20"
                          type="text"
                          className="form-control"
                          placeholder=""
                          onChange={(e) => {
                            setNewDoc({ ...newDoc, location: e.target.value })
                          }}
                        /></label>
                      <p>Remark: [ maxLengh=20 ]</p>
                    </div>
                    <hr />

                    <div className="form-group">
                      <p>Note</p>
                      <input
                        id="note"
                        maxLength="50"
                        type="text"
                        className="form-control"
                        placeholder=""
                        onChange={(e) => {
                          setNewDoc({ ...newDoc, note: e.target.value })
                        }}
                      />
                      <p>Remark: [ maxLength=50 ]</p>
                    </div>
                    <hr />

                    <div className="form-group">
                      <label>PhoneNo (Optional)
                        <input
                          id="phoneNo"
                          maxLength="20"
                          type="tel"
                          className="form-control"
                          placeholder=""
                          onChange={(e) => {
                            setNewDoc({ ...newDoc, phoneNo: e.target.value })
                          }}
                          onBlur={() => {
                            if (document.getElementById("phoneNo").value) {
                              const check = document.getElementById("phoneNo").value
                              if (!(/^[0-9]*$/.test(check))) {
                                alert("Phone No is supposed to consist of one-byte numbers without「 - 」\n\nyour input will be canceled")
                                document.getElementById("phoneNo").value = ""
                                setNewDoc({ ...newDoc, phoneNo: "" })
                              }
                            }
                          }}
                        /></label>
                      <p>Remark: [ fill out if your item is mobile etc. , write without 「 - 」 ]</p>
                    </div>
                    <hr />

                    <div className="form-group">
                      <p>Shared Folder's URL of Picture (appearance of your item)</p>
                      <input
                        id="appearance"
                        maxLength="50"
                        type="text"
                        className="form-control"
                        placeholder=""
                        onChange={(e) => {
                          setNewDoc({ ...newDoc, appearance: e.target.value })
                        }}
                      />
                      <p>Remark: [ maxLength=50 ]</p>
                    </div>
                    <hr />

                    <div className="form-group">
                      <p>Shared Folder's URL of Picture (zooming the label on your item)</p>
                      <input
                        id="label"
                        maxLength="50"
                        type="text"
                        className="form-control"
                        placeholder=""
                        onChange={(e) => {
                          setNewDoc({ ...newDoc, label: e.target.value })
                        }}
                      />
                      <p>Remark: [ maxLength=50 ]</p>
                    </div>

                    <hr />

                    <div>
                      <button
                        className="btn btn-success"
                        onClick={() => onSubmitNew()}
                      >
                        <i className="far fa-check-square"></i>
                        &nbsp;Submit
                      </button>
                      &nbsp;
                      <button
                        className="btn btn-secondary"
                        onClick={() => {
                          handleTextSearch()
                          setNewDocModalOpen(false)
                        }}>
                        Close
                      </button>
                    </div>
                  </div>
                </Modal>
                &nbsp;
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-secondary" onClick={() => {
                  fetchData()
                  setDisDocsModalOpen(true)
                }}>
                  <i className="fas fa-list-ol"></i>
                  &nbsp;See Discarded Items
                </button>
                <Modal isOpen={disDocsModalOpen} style={modalStyle}>
                  <div className="container">
                    <h1>Showing Discarded Items</h1>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">SupplyNo</th>
                          <th scope="col">Registrated</th>
                          <th scope="col">Description</th>
                          <th scope="col">Dept</th>
                          <th scope="col">Reason</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allDocs.filter(doc => doc.discarded === true).sort((a, b) => {
                          if (a.no > b.no) {
                            return 1;
                          } else {
                            return -1;
                          }
                        }).map((doc, index) => {
                          return (
                            <tr key={'tr' + index.toString()}>
                              <th key={'no' + index.toString()}>{doc.no}</th>
                              <td key={'regist' + index.toString()}>{doc.registrated}</td>
                              <td key={'desc' + index.toString()} width="23%">{doc.description}</td>
                              <td key={'dept' + index.toString()}>{doc.department}</td>
                              <td key={'reason' + index.toString()}>{doc.discardedReason}</td>
                              <td>
                                <button className="btn btn-primary" onClick={() => resumeItem(doc._id, doc.no)}>
                                  <i className="fas fa-file-alt"></i>&nbsp;Resume
                                </button>
                                &nbsp;
                                <button className="btn btn-success" onClick={() => {
                                  setTempDoc(doc)
                                  setDetailModalOpen(true)
                                }}>
                                  <i className="fas fa-file-alt"></i>&nbsp;Show
                                </button>
                                <Modal isOpen={detailModalOpen} style={modalStyle}>
                                  <div>
                                    <h1>All Data . . . SupplyNo {tempDoc.no}</h1>
                                    <div className="container">
                                      <dl className="row">
                                        <dt className="col-sm-2">SupplyNo</dt>
                                        <dd className="col-sm-10">{tempDoc.no}</dd>
                                        <dt className="col-sm-2">Registrated</dt>
                                        <dd className="col-sm-10">{tempDoc.registrated}</dd>
                                        <dt className="col-sm-2">Description</dt>
                                        <dd className="col-sm-10">{tempDoc.description}</dd>
                                        <dt className="col-sm-2">UnitPrice (extax)</dt>
                                        <dd className="col-sm-10">{tempDoc.unitPrice}</dd>
                                        <dt className="col-sm-2">Qty</dt>
                                        <dd className="col-sm-10">{tempDoc.qty}</dd>
                                        <dt className="col-sm-2">TotalPrice (extax)</dt>
                                        <dd className="col-sm-10">{totalPriceCalc(tempDoc.unitPrice, tempDoc.qty)}</dd>
                                        <dt className="col-sm-2">Dept</dt>
                                        <dd className="col-sm-10">{tempDoc.department}</dd>
                                        <dt className="col-sm-2">Owner</dt>
                                        <dd className="col-sm-10">{tempDoc.owner}</dd>
                                        <dt className="col-sm-2">Location</dt>
                                        <dd className="col-sm-10">{tempDoc.location}</dd>
                                        <dt className="col-sm-2">Note</dt>
                                        <dd className="col-sm-10">{tempDoc.note}</dd>
                                        <dt className="col-sm-2">PhoneNo(Optional)</dt>
                                        <dd className="col-sm-10">{tempDoc.phoneNo}</dd>
                                        <dt className="col-sm-2">Discarded</dt>
                                        <dd className="col-sm-10">{displayDiscarded(tempDoc)}</dd>
                                      </dl>
                                    </div>
                                    <div className="container">
                                      <table className="table">
                                        <thead>
                                          <tr>
                                            <th scope="col">Who Borrowed</th>
                                            <th scope="col">Since</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {rentalHistory(tempDoc.rentalHistory)}
                                        </tbody>
                                      </table>
                                    </div>
                                    <div className="container">
                                      <table className="table">
                                        <thead>
                                          <tr>
                                            <th scope="col">Picture(entire)</th>
                                            <th scope="col">Picture(label number)</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            <td>{tempDoc.appearance}</td>
                                            <td>{tempDoc.label}</td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                    <hr style={{ width: '1000px' }} />
                                    <div>
                                      <button
                                        className="btn btn-secondary"
                                        onClick={() => {
                                          setTempDoc({})
                                          setDetailModalOpen(false)
                                        }}>
                                        Close
                                      </button>
                                    </div>
                                  </div>
                                </Modal>
                                &nbsp;
                                <button className="btn btn-danger" onClick={() => deleteItem(doc._id, doc.no)}>
                                  <i className="far fa-trash-alt"></i>&nbsp;Delete
                                </button>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                  <button onClick={() => {
                    handleTextSearch()
                    setDisDocsModalOpen(false)
                  }}>close</button>
                </Modal>
                &nbsp;
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container">
        <div className="ms-auto">
          <form className="d-flex">
            <i className="fas fa-search"></i>
            <input
              className="form-control me-2"
              id="searchSupplyNo"
              maxLength='20'
              type="search"
              placeholder="Supply No"
              aria-label="Search"
              onChange={handleTextSearch}
            >
            </input>
            <i className="fas fa-search"></i>
            <input
              className="form-control me-2"
              id="searchRegistrated"
              maxLength='10'
              type="search"
              placeholder="Registrated"
              aria-label="Search"
              onChange={handleTextSearch}
            >
            </input>
            <i className="fas fa-search"></i>
            <input
              className="form-control me-2"
              id="searchDescription"
              maxLength='70'
              type="search"
              placeholder="Description"
              aria-label="Search"
              onChange={handleTextSearch}
            >
            </input>
            <i className="fas fa-search"></i>
            <input
              className="form-control me-2"
              id="searchDept"
              maxLength='20'
              type="search"
              placeholder="Dept"
              aria-label="Search"
              onChange={handleTextSearch}
            >
            </input>
            <i className="fas fa-search"></i>
            <input
              className="form-control me-2"
              id="searchOwner"
              maxLength='20'
              type="search"
              placeholder="Owner"
              aria-label="Search"
              onChange={handleTextSearch}
            >
            </input>
            <i className="fas fa-search"></i>
            <input
              className="form-control me-2"
              id="searchNote"
              maxLength='20'
              type="search"
              placeholder="Note"
              aria-label="Search"
              onChange={handleTextSearch}
            >
            </input>
          </form>
        </div>
      </div>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">SupplyNo</th>
              <th scope="col">Registrated</th>
              <th scope="col">Description</th>
              <th scope="col">Dept</th>
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
                  <th key={'no' + index.toString()}>{doc.no}</th>
                  <td key={'regist' + index.toString()}>{doc.registrated}</td>
                  <td key={'desc' + index.toString()} width="23%">{doc.description}</td>
                  <td key={'dept' + index.toString()}>{doc.department}</td>
                  <td>
                    <button className="btn btn-success" onClick={() => {
                      setTempDoc(doc)
                      setDetailModalOpen(true)
                    }}>
                      <i className="fas fa-file-alt"></i>&nbsp;Show
                    </button>
                    <Modal isOpen={detailModalOpen} style={modalStyle}>
                      <div>
                        <h1>All Data . . . SupplyNo {tempDoc.no}</h1>
                        <div className="container">
                          <dl className="row">
                            <dt className="col-sm-2">SupplyNo</dt>
                            <dd className="col-sm-10">{tempDoc.no}</dd>
                            <dt className="col-sm-2">Registrated</dt>
                            <dd className="col-sm-10">{tempDoc.registrated}</dd>
                            <dt className="col-sm-2">Description</dt>
                            <dd className="col-sm-10">{tempDoc.description}</dd>
                            <dt className="col-sm-2">UnitPrice (extax)</dt>
                            <dd className="col-sm-10">{tempDoc.unitPrice}</dd>
                            <dt className="col-sm-2">Qty</dt>
                            <dd className="col-sm-10">{tempDoc.qty}</dd>
                            <dt className="col-sm-2">TotalPrice (extax)</dt>
                            <dd className="col-sm-10">{totalPriceCalc(tempDoc.unitPrice, tempDoc.qty)}</dd>
                            <dt className="col-sm-2">Dept</dt>
                            <dd className="col-sm-10">{tempDoc.department}</dd>
                            <dt className="col-sm-2">Owner</dt>
                            <dd className="col-sm-10">{tempDoc.owner}</dd>
                            <dt className="col-sm-2">Location</dt>
                            <dd className="col-sm-10">{tempDoc.location}</dd>
                            <dt className="col-sm-2">Note</dt>
                            <dd className="col-sm-10">{tempDoc.note}</dd>
                            <dt className="col-sm-2">PhoneNo(Optional)</dt>
                            <dd className="col-sm-10">{tempDoc.phoneNo}</dd>
                            <dt className="col-sm-2">Discarded</dt>
                            <dd className="col-sm-10">{displayDiscarded(tempDoc)}</dd>
                          </dl>
                        </div>
                        <div className="container">
                          <table className="table">
                            <thead>
                              <tr>
                                <th scope="col">Who Borrowed</th>
                                <th scope="col">Since</th>
                              </tr>
                            </thead>
                            <tbody>
                              {rentalHistory(tempDoc.rentalHistory)}
                            </tbody>
                          </table>
                        </div>
                        <div className="container">
                          <table className="table">
                            <thead>
                              <tr>
                                <th scope="col">Picture(entire)</th>
                                <th scope="col">Picture(label number)</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>{tempDoc.appearance}</td>
                                <td>{tempDoc.label}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <hr style={{ width: '1000px' }} />
                        <div>
                          <button
                            className="btn btn-secondary"
                            onClick={() => {
                              setTempDoc({})
                              setDetailModalOpen(false)
                            }}>
                            Close
                          </button>
                        </div>
                      </div>
                    </Modal>
                    &nbsp;
                    <button className="btn btn-warning" onClick={() => {
                      setTempDoc(doc)
                      setNewDoc(doc)
                      setEditModalOpen(true)
                    }}>
                      <i className="fas fa-edit"></i>&nbsp;Edit
                    </button>
                    <Modal isOpen={editModalOpen} style={modalStyle}>
                      <div className="col-md-10 mx-auto">
                        <h1>Editing SupplyNo: {tempDoc.no}</h1>
                        <hr />
                        <div className="form-group">
                          <label>SupplyNo
                            <input
                              required
                              id={"noEdit" + index.toString()}
                              maxLength="20"
                              type="text"
                              className="form-control"
                              placeholder={tempDoc.no}
                              onChange={(e) => {
                                if (e.target.value) {
                                  setNewDoc({ ...newDoc, no: e.target.value })
                                } else {
                                  setNewDoc({ ...newDoc, no: tempDoc.no })
                                }
                              }}
                              onBlur={() => {
                                const id = "noEdit" + index.toString()
                                if (document.getElementById(id).value) {
                                  const check = document.getElementById(id).value
                                  if (!(/^[!-~]*$/.test(check))) {
                                    alert("Supply No is supposed to consist of one-byte charactors without space\n\nyour input into this field will be canceled")
                                    document.getElementById(id).value = ""
                                    setNewDoc({ ...newDoc, no: tempDoc.no })
                                  }
                                }
                              }}
                            /></label>
                        </div>
                        <hr />

                        <div className="form-group">
                          <label>Registrated
                            <input
                              id={"registratedEdit" + index.toString()}
                              maxLength="10"
                              type="text"
                              className="form-control"
                              placeholder={tempDoc.registrated}
                              onChange={(e) => {
                                if (e.target.value) {
                                  setNewDoc({ ...newDoc, registrated: e.target.value })
                                } else {
                                  setNewDoc({ ...newDoc, registrated: tempDoc.registrated })
                                }
                              }}
                              onBlur={() => {
                                const id = "registratedEdit" + index.toString()
                                if (document.getElementById(id).value) {
                                  const check = document.getElementById(id).value
                                  if (!(/\d{4}-\d{2}-\d{2}/.test(check))) {
                                    alert("please input Registrated Date in the right format: 20yy-mm-dd\n\nyour input into this field will be canceled")
                                    document.getElementById(id).value = ""
                                    setNewDoc({ ...newDoc, registrated: tempDoc.registrated })
                                  }
                                }
                              }}
                            /></label>
                        </div>
                        <hr />

                        <div className="form-group">
                          <p>Description</p>
                          <input
                            id={"descriptionEdit" + index.toString()}
                            maxLength="70"
                            type="text"
                            className="form-control"
                            placeholder={tempDoc.description}
                            onChange={(e) => {
                              if (e.target.value) {
                                setNewDoc({ ...newDoc, description: e.target.value })
                              } else {
                                setNewDoc({ ...newDoc, description: tempDoc.description })
                              }
                            }}
                          />
                        </div>
                        <hr />

                        <div className="form-group">
                          <label>Unit Price (extax)
                            <input
                              id={"unitPriceEdit" + index.toString()}
                              maxLength="10"
                              type="tel"
                              className="form-control"
                              placeholder={tempDoc.unitPrice}
                              onChange={(e) => {
                                if (e.target.value) {
                                  setNewDoc({ ...newDoc, unitPrice: e.target.value })
                                } else {
                                  setNewDoc({ ...newDoc, unitPrice: tempDoc.unitPrice })
                                }
                              }}
                              onBlur={() => {
                                const id = "unitPriceEdit" + index.toString()
                                if (document.getElementById(id).value) {
                                  const check = document.getElementById(id).value
                                  if (!(/^[0-9]*$/.test(check))) {
                                    alert("Unit Price is supposed to consist of one-byte numbers without even comma「 , 」\n\nyour input into this field will be canceled\n\nif you need to input after the decimal point, please contact system administrator")
                                    document.getElementById(id).value = ""
                                    setNewDoc({ ...newDoc, unitPrice: tempDoc.unitPrice })
                                  }
                                }
                              }}
                            /></label>
                        </div>
                        <hr />

                        <div className="form-group">
                          <label>Qty
                            <input
                              id={"qtyEdit" + index.toString()}
                              maxLength="5"
                              type="tel"
                              className="form-control"
                              placeholder={tempDoc.qty}
                              onChange={(e) => {
                                if (e.target.value) {
                                  setNewDoc({ ...newDoc, qty: e.target.value })
                                } else {
                                  setNewDoc({ ...newDoc, qty: tempDoc.qty })
                                }
                              }}
                              onBlur={() => {
                                const id = "qtyEdit" + index.toString()
                                if (document.getElementById(id).value) {
                                  const check = document.getElementById(id).value
                                  if (!(/^[0-9]*$/.test(check))) {
                                    alert("Qty is supposed to consist of one-byte numbers\n\nyour input will be canceled")
                                    document.getElementById(id).value = ""
                                    setNewDoc({ ...newDoc, qty: tempDoc.qty })
                                  }
                                }
                              }}
                            /></label>
                        </div>
                        <hr />

                        <div className="form-group">
                          <label>Department
                            <input
                              id={"departmentEdit" + index.toString()}
                              maxLength="20"
                              type="text"
                              className="form-control"
                              placeholder={tempDoc.department}
                              onChange={(e) => {
                                if (e.target.value) {
                                  setNewDoc({ ...newDoc, department: e.target.value })
                                } else {
                                  setNewDoc({ ...newDoc, department: tempDoc.department })
                                }
                              }}
                            /></label>
                        </div>
                        <hr />

                        <div className="form-group">
                          <label>Owner
                            <input
                              id={"ownerEdit" + index.toString()}
                              maxLength="20"
                              type="text"
                              className="form-control"
                              placeholder={tempDoc.owner}
                              onChange={(e) => {
                                if (e.target.value) {
                                  setNewDoc({ ...newDoc, owner: e.target.value })
                                } else {
                                  setNewDoc({ ...newDoc, owner: tempDoc.owner })
                                }
                              }}
                            /></label>
                        </div>
                        <hr />

                        <div className="form-group">
                          <label>Location
                            <input
                              id={"locationEdit" + index.toString()}
                              maxLength="20"
                              type="text"
                              className="form-control"
                              placeholder={tempDoc.location}
                              onChange={(e) => {
                                if (e.target.value) {
                                  setNewDoc({ ...newDoc, location: e.target.value })
                                } else {
                                  setNewDoc({ ...newDoc, location: tempDoc.location })
                                }
                              }}
                            /></label>
                        </div>
                        <hr />

                        <div className="form-group">
                          <p>Note</p>
                          <input
                            id={"noteEdit" + index.toString()}
                            maxLength="50"
                            type="text"
                            className="form-control"
                            placeholder={tempDoc.note}
                            onChange={(e) => {
                              if (e.target.value) {
                                setNewDoc({ ...newDoc, note: e.target.value })
                              } else {
                                setNewDoc({ ...newDoc, note: tempDoc.note })
                              }
                            }}
                          />
                        </div>
                        <hr />

                        <div className="form-group">
                          <label>PhoneNo (Optional)
                            <input
                              id={"phoneNoEdit" + index.toString()}
                              maxLength="20"
                              type="tel"
                              className="form-control"
                              placeholder={tempDoc.phoneNo}
                              onChange={(e) => {
                                if (e.target.value) {
                                  setNewDoc({ ...newDoc, phoneNo: e.target.value })
                                } else {
                                  setNewDoc({ ...newDoc, phoneNo: tempDoc.phoneNo })
                                }
                              }}
                              onBlur={() => {
                                const id = "phoneNoEdit" + index.toString()
                                if (document.getElementById(id).value) {
                                  const check = document.getElementById(id).value
                                  if (!(/^[0-9]*$/.test(check))) {
                                    alert("Phone No is supposed to consist of one-byte numbers without「 - 」\n\nyour input will be canceled")
                                    document.getElementById(id).value = ""
                                    setNewDoc({ ...newDoc, phoneNo: tempDoc.phoneNo })
                                  }
                                }
                              }}
                            /></label>
                        </div>
                        <hr />

                        <div className="form-group">
                          <p>Shared Folder's URL of Picture (appearance of your item)</p>
                          <input
                            id={"appearanceEdit" + index.toString()}
                            maxLength="50"
                            type="text"
                            className="form-control"
                            placeholder={tempDoc.appearance}
                            onChange={(e) => {
                              if (e.target.value) {
                                setNewDoc({ ...newDoc, appearance: e.target.value })
                              } else {
                                setNewDoc({ ...newDoc, appearance: tempDoc.appearance })
                              }
                            }}
                          />
                        </div>
                        <hr />

                        <div className="form-group">
                          <p>Shared Folder's URL of Picture (zoom of the label on your item)</p>
                          <input
                            id={"labelEdit" + index.toString()}
                            maxLength="50"
                            type="text"
                            className="form-control"
                            placeholder={tempDoc.label}
                            onChange={(e) => {
                              if (e.target.value) {
                                setNewDoc({ ...newDoc, label: e.target.value })
                              } else {
                                setNewDoc({ ...newDoc, label: tempDoc.label })
                              }
                            }}
                          />
                        </div>

                        <hr />

                        <div>
                          <button
                            className="btn btn-success"
                            onClick={() => onSubmitEdit(tempDoc._id)}
                          >
                            <i className="far fa-check-square"></i>
                            &nbsp;Submit Your Edit
                          </button>
                          &nbsp;
                          <button
                            className="btn btn-secondary"
                            onClick={() => {
                              handleTextSearch()
                              setEditModalOpen(false)
                            }}>
                            Close
                          </button>
                        </div>
                      </div>
                    </Modal>
                    &nbsp;
                    <button className="btn btn-secondary" onClick={() => {
                      setTempId(doc._id)
                      setTempNo(doc.no)
                      setDisDocModalOpen(true)
                    }}>
                      <i className="far fa-trash-alt"></i>&nbsp;Discard
                    </button>
                    <Modal isOpen={disDocModalOpen} style={modalStyle}>
                      <div className="col-md-10 mx-auto">
                        <h1>Discard SupplyNo {tempNo} ?</h1>
                        <div className="form-group">
                          <label>
                            {`Please type ${tempNo} to make sure you are choosing the correct one`}
                            <input
                              required
                              id="no"
                              maxLength="50"
                              type="text"
                              className="form-control"
                              onChange={(e) => setConfirmNo(e.target.value)}
                            />
                          </label>
                        </div>
                        <div className="form-group">
                          <label>
                            You can write reason if that helps (maxLength=30)
                            <input
                              id="discardedReason"
                              maxLength="30"
                              type="text"
                              className="form-control"
                              placeholder="e.g. broken and disposed"
                              onChange={(e) => setReason(e.target.value)}
                            />
                          </label>
                        </div>
                        <hr />
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
                    &nbsp;
                    <button className="btn btn-outline-dark" onClick={() => {
                      setTempDoc(doc)
                      setRentalHistoryModalOpen(true)
                    }}>
                      <i className="fas fa-history"></i>&nbsp;Rental History
                    </button>
                    <Modal isOpen={rentalHistoryModalOpen} style={modalStyle}>
                      <div className="col-md-10 mx-auto">
                        <h1>Rental History Control</h1>
                        <hr />
                        <p>SupplyNo . . . {tempDoc.no}</p>
                        <p>Description . . . {tempDoc.description}</p>
                        <p>Department . . . {tempDoc.department}</p>
                        <p>Owner . . . {tempDoc.owner}</p>
                        <hr />
                        <div className="container">
                          <table className="table">
                            <thead>
                              <tr>
                                <th scope="col">Who Borrowed</th>
                                <th scope="col">Since</th>
                              </tr>
                            </thead>
                            <tbody>
                              {rentalHistory(tempDoc.rentalHistory)}
                            </tbody>
                          </table>
                        </div>
                        <hr />
                        <hr />
                        <h2>Add Rental History ?</h2>
                        <hr />
                        <div className="form-group">
                          <label>Please Enter New User
                            <input
                              required
                              id={"newUser" + index.toString()}
                              maxLength="20"
                              type="text"
                              className="form-control"
                            />
                          </label>
                          <p>Remark: You can input like " returned " if you want to record that " it was returned back "</p>
                        </div>
                        <hr />
                        <div className="form-group">
                          <label>Please Enter When-Borrowed or When-Returned
                            <input
                              id={"newSince" + index.toString()}
                              maxLength="10"
                              type="text"
                              className="form-control"
                              onBlur={() => {
                                const id = "newSince" + index.toString()
                                if (document.getElementById(id).value) {
                                  const check = document.getElementById(id).value
                                  if (!(/\d{4}-\d{2}-\d{2}/.test(check))) {
                                    alert("please follow the right format: 20yy-mm-dd\n\nyour input into this field will be canceled")
                                    document.getElementById(id).value = ""
                                  }
                                }
                              }}
                            /></label>
                          <p>Remark: strict format: 20yy-mm-dd</p>
                        </div>
                        <hr />
                        <hr />
                        <div>
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              const id1 = "newUser" + index.toString()
                              const id2 = "newSince" + index.toString()
                              if (document.getElementById(id1).value && document.getElementById(id2).value) {
                                const newUser = document.getElementById(id1).value
                                const newSince = document.getElementById(id2).value
                                const id = tempDoc._id
                                const body = {user: newUser, since: newSince}
                                axios.put(`/gvn7dqcu/pushRentalHistory/${id}`, body).then((res) => {
                                  alert("SupplyNo: " + res.data.before.no + " 's Rental History has been updated")
                                  getDoc(id)
                                  handleTextSearch()
                                })
                              }
                              if (!document.getElementById(id1).value && document.getElementById(id2).value) {
                                alert("cannot find new user")
                              }
                              if (document.getElementById(id1).value && !document.getElementById(id2).value) {
                                alert("cannot find when-borrowed")
                              }
                              if (!document.getElementById(id1).value && !document.getElementById(id2).value) {
                                alert("cannot find both")
                              }
                            }}
                          >
                            <i className="far fa-check-square"></i>
                            &nbsp;Add New Data onto Rental History
                          </button>
                          &nbsp;
                          <button
                            className="btn btn-secondary"
                            onClick={() => {
                              setRentalHistoryModalOpen(false)
                              }}>
                            Close
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
    </div >
  )
}

export default App
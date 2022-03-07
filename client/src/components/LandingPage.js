import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Modal from 'react-modal'

Modal.setAppElement("#root")

function LandingPage() {
  const [docs, setDocs] = useState([])
  const [dIsOpen, setDIsOpen] = useState(false)
  const [idAndNo, setIdAndNo] = useState({ id: "", no: "" })
  const [no2, setNo2] = useState("")
  const [reason, setReason] = useState("")

  useEffect(() => {
    async function fetchData() {
        const { data } = await axios.get(`/gvn7dqcu/`)
        setDocs(data.found)
        console.log(data.found)
    }
    fetchData()
}, [])

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

  /**************************************************************************/
  /**docsの要素でSupplyNoがサーチ欄の年で始まるものだけ残す*/
  const filterContent = (docs, searchTerm) => {
    const result = docs.filter(
      (doc) =>
        doc.no.startsWith(searchTerm) === true
    )
    setDocs(result)
  }
  /**************************************************************************/
  /**************************************************************************/

  /**************************************************************************/
  /**サーチ欄が変更される度にfilterContentを実効する*/
  const handleTextSearch = (e) => {
    const searchTerm = e.currentTarget.value
    if (searchTerm) {
      axios.get(`/gvn7dqcu/`).then((res) => {
        if (res.data.success) {
          filterContent(res.data.found, searchTerm)
        }
      })
    }
  }
  /**************************************************************************/
  /**************************************************************************/

  /**************************************************************************/
  /**サーチ欄の値そのままでfilterContentを実効する*/
  const reloadTextSearch = () => {
    console.log('function reloadTextSearch was called')
    const searchTerm = document.getElementById("searchTerm").value
    if (searchTerm) {
      axios.get(`/gvn7dqcu/`).then((res) => {
        if (res.data.success) {
          filterContent(res.data.found, searchTerm)
        }
      })
    }
  }
  /**************************************************************************/
  /**************************************************************************/

  const onSubmit = (id, no) => {
    if (no2 === no) {
      const body = { discarded: true, discardedReason: reason }
      axios.put(`/gvn7dqcu/update/${id}`, body).then((res) => {
        alert("SupplyNo: " + res.data.before.no + " has been discarded successfully")
        setNo2("")
        setDIsOpen(false)
      })
    } else if (no2) {
      alert("wrong SupplyNo")
    } else {

    }
  }

  return (
    <div className="container" onFocus={reloadTextSearch}>
      <div className="d-flex justify-content-between">
        <button onClick={reloadTextSearch}>Reload Data</button>
        <input
          pattern="^[0-9A-Za-z]+$"
          id="searchTerm"
          maxLength='25'
          type="search"
          placeholder="example: 2022"
          onChange={handleTextSearch}
          style={{ width: '25%' }}
        ></input>
      </div>
      <p>All Items</p>
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
          {docs.filter(doc => doc.discarded === false).sort((a, b) => {
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
                  <a className="btn btn-success" href={`/detail/${doc._id}`}>
                    <i className="fas fa-file-alt"></i>&nbsp;Show
                  </a>
                  &nbsp;
                  <a className="btn btn-warning" href={`/edit/${doc._id}`}>
                    <i className="fas fa-edit"></i>&nbsp;Edit
                  </a>
                  &nbsp;
                  <button className="btn btn-secondary" onClick={() => {
                    setIdAndNo({ id: doc._id, no: doc.no })
                    setDIsOpen(true)
                  }}>
                    <i className="far fa-trash-alt"></i>&nbsp;Discard
                  </button>
                  <Modal isOpen={dIsOpen} style={modalStyle}>
                    <div className="col-md-10 mt-3 mx-auto">
                      <h1>Discard SupplyNo {idAndNo.no} ?</h1>
                        <div className="form-group">
                          <label>
                          {`Please type ${idAndNo.no} to make sure you are choosing the correct one`}
                            <input
                              required
                              id="no"
                              maxLength="10"
                              type="text"
                              className="form-control"
                              placeholder="example: 20yy-00n"
                              onChange={(e)=>setNo2(e.target.value)}
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
                              onChange={(e)=>setReason(e.target.value)}
                            />
                          </label>
                        </div>
                        <hr style={{ width: '1000px' }} />
                        <div>
                          <button
                            className="btn btn-success"
                            onClick={() => onSubmit(idAndNo.id, idAndNo.no)}
                          >
                            <i className="far fa-check-square"></i>
                            &nbsp;Submit
                          </button>
                          &nbsp;
                          <button
                            className="btn btn-secondary"
                            onClick={() => setDIsOpen(false)}>
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
  )
}

export default LandingPage
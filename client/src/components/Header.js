import React, { useState, useEffect } from 'react'
import logo from './logoTemp.PNG'
import axios from 'axios'
import Modal from 'react-modal'

Modal.setAppElement("#root")

function Header() {
    const [createPageOpen, setCreatePageOpen] = useState(false)
    const [disOpen, setDisOpen] = useState(false)
    const [createDoc, setCreateDoc] = useState({
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
    const [docs, setDocs] = useState([])

    async function fetchData() {
        const { data } = await axios.get(`/gvn7dqcu/`)
        setDocs(data.found)
        console.log(data.found)
    }

    useEffect(() => {
        fetchData()
    }, [disOpen])

    const onSubmit = (e) => {
        e.preventDefault()
        const data = createDoc
        axios.post("/gvn7dqcu/add", data).then((res) => {
            if (res.data.success === true) {
                alert("Added")
                setCreateDoc({
                    no: "",
                    registrated: "",
                    description: "",
                    unitPrice: 0,
                    qty: 0,
                    department: "",
                    owner: "",
                    location: "",
                    note: "",
                    phoneNo: ""
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
            }
        })
    }

    const isInputNumber = (e) => {
        const ch = String.fromCharCode(e.which)
        if (!(/[0-9]/.test(ch))) {
            e.preventDefault()
        }
    }

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

    const deleteItem = (id, no) => {
        const chkNo = prompt("Are you sure?\n\nPlease type " + no + " to make sure you are deleting the correct one\n(The item will be lost permanently...!)\n\n(Only one-byte characters available)")
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

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <img src={logo} className="d-inline-block align-text-top" alt="logo" />&nbsp;
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="btn btn-outline-primary" href="/" role="button">SeeAll</a>&nbsp;
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-outline-success" onClick={() => setCreatePageOpen(true)}>NewRegistration</button>
                            <Modal isOpen={createPageOpen} style={modalStyle}>
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
                                                        setCreateDoc({ ...createDoc, no: e.target.value })
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
                                                    setCreateDoc({ ...createDoc, registrated: e.target.value })
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
                                                    setCreateDoc({ ...createDoc, description: e.target.value })
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
                                                    setCreateDoc({ ...createDoc, unitPrice: e.target.value })
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
                                                    setCreateDoc({ ...createDoc, qty: e.target.value })
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
                                                    setCreateDoc({ ...createDoc, department: e.target.value })
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
                                                    setCreateDoc({ ...createDoc, owner: e.target.value })
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
                                                    setCreateDoc({ ...createDoc, location: e.target.value })
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
                                                    setCreateDoc({ ...createDoc, note: e.target.value })
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
                                                    setCreateDoc({ ...createDoc, unitPrice: e.target.value })
                                                }}
                                            />
                                        </div>

                                        <hr style={{ width: '1000px' }} />

                                        <div>
                                            <button
                                                className="btn btn-success"
                                                type="submit"
                                                onClick={onSubmit}
                                            >
                                                <i className="far fa-check-square"></i>
                                                &nbsp;Submit
                                            </button>
                                            &nbsp;
                                            <button
                                                className="btn btn-secondary"
                                                onClick={() => setCreatePageOpen(false)}>
                                                Close
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </Modal>
                            &nbsp;
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-outline-secondary" onClick={() => setDisOpen(true)}>SeeDiscarded</button>
                            <Modal isOpen={disOpen} style={modalStyle}>
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
                                            {docs.filter(doc => doc.discarded === true).map((doc, index) => {
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
                                                            <a className="btn btn-success" href={`/detail/${doc._id}`}>
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
                                <button onClick={() => setDisOpen(false)}>close</button>
                            </Modal>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header
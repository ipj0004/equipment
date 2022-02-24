import axios from 'axios'
import React, { useState } from 'react'


function CreateDoc() {
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
        phoneNo: ""
    })

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

    return (
        <div className="col-md-10 mt-3 mx-auto">
            <p>Adding New Item</p>
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

                <button
                    className="btn btn-success"
                    type="submit"
                    onClick={onSubmit}
                >
                    <i className="far fa-check-square"></i>
                    &nbsp;Submit
                </button>
            </form>
        </div>
    )
}

export default CreateDoc
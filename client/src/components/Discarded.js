import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Discarded() {
  const [docs, setDocs] = useState([])

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`/gvn7dqcu/`)
      setDocs(data.found)
      console.log(data.found)
    }
    fetchData()
  }, [])

  const resumeItem = (id, no) => {
    const chkNo = prompt("Almost done!\n\nPlease type " + no + " to make sure this is the correct one\n\n(Only one-byte characters available)")
    if (chkNo === no) {
      const body = { discarded: false, discardedReason: "" }
      axios.put(`/gvn7dqcu/update/${id}`, body).then((res) => {
        alert("SupplyNo: " + res.data.before.no + " has been resumed successfully")
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
      })
    } else if (chkNo) {
      alert("wrong SupplyNo")
    } else {

    }
  }

  return (
    <div className="container">
      <p>Showing Discarded Items</p>
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
  )
}

export default Discarded
import React, { useEffect, useState } from 'react'
import axios from 'axios'


function LandingPage() {
  const [docs, setDocs] = useState([])

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`http://localhost:5000/gvn7dqcu`)
      setDocs(data.found)
      console.log(data.found)
    }
    fetchData()
  }, [])

  return (
    <div className="container">
      <p>Top Page</p>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">SupplyNo</th>
            <th scope="col">Registrated</th>
            <th scope="col">Description</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {docs.map((doc, index) => {
            return (
              <tr key={'tr' + index.toString()}>
                <th key={'th' + index.toString()} scope="row">{index}</th>
                <td key={'no' + index.toString()}>{doc.no}</td>
                <td key={'regi' + index.toString()}>{doc.registrated}</td>
                <td key={'desc' + index.toString()}>{doc.description}</td>
                <td>
                  <a className="btn btn-warning" href="/editgvn7dqcu/:id">
                    <i className="fas fa-edit"></i>&nbsp;Edit
                  </a>
                  &nbsp;
                  <a className="btn btn-danger" href="/discardgvn7dqcu/:id">
                    <i className="far fa-trash-alt"></i>&nbsp;Discard
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

export default LandingPage
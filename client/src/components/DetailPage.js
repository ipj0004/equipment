import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function DetailPage() {
    const [doc, setDoc] = useState({})
    const [pic, setPic] = useState({appearance: "", label: ""})

    let { id } = useParams()

    useEffect(() => {
        async function fetchData() {
            const { data } = await axios.get(`http://localhost:5000/gvn7dqcu/detail/${id}`)
            setDoc(data.found)
            if(data.found.picture){
            setPic({appearance: data.found.picture.appearance, label: data.found.picture.label})
            }else{
                setPic({appearance: "2021-0002/sample.jpg", label: "2021-0002.label.jpg"})
            }
        }
        fetchData()
    }, [id])

    function totalPriceCalc(unitPrice, qty) {
        if (unitPrice * qty) {
            return (unitPrice * qty)
        } else {
            return ("")
        }
    }

    function rentalHistory(history) {
        let rtn
        if (history) {
            rtn = history.map((hist, index) => {
                return(
                <tr key={'tr' + index.toString()}>
                    <td key={'user' + index.toString()}>{hist.user}</td>
                    <td key={'since' + index.toString()}>{hist.since}</td>
                </tr>
                )
            })
        }else{
            rtn = <tr></tr>
        }
        return (rtn)
    }

    return (
        <div>
            <div className="container">
                <p>{doc.no}</p>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">SupplyNo</th>
                            <th scope="col">Registrated</th>
                            <th scope="col">Description</th>
                            <th scope="col">UnitPrice</th>
                            <th scope="col">Qty</th>
                            <th scope="col">TotalPrice</th>
                            <th scope="col">Dept</th>
                            <th scope="col">Owner</th>
                            <th scope="col">Location</th>
                            <th scope="col">Note</th>
                            <th scope="col"><div>PhoneNo</div><div>(optional)</div></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{doc.no}</td>
                            <td>{doc.registrated}</td>
                            <td>{doc.description}</td>
                            <td>{doc.unitPrice}</td>
                            <td>{doc.qty}</td>
                            <td>{totalPriceCalc(doc.unitPrice, doc.qty)}</td>
                            <td>{doc.department}</td>
                            <td>{doc.owner}</td>
                            <td>{doc.location}</td>
                            <td>{doc.note}</td>
                            <td>{doc.phoneNo}</td>
                        </tr>
                    </tbody>
                </table>
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
                        {rentalHistory(doc.rentalHistory)}
                    </tbody>
                </table>
            </div>
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Photo(entire)</th>
                            <th scope="col">Photo(label bumber)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <td>{pic.appearance}</td>
                        <td>{pic.label}</td>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DetailPage
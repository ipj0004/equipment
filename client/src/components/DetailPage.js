import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function DetailPage() {
    const [doc, setDoc] = useState({})
    const [appearance, setAppearance] = useState("")
    const [label, setLabel] = useState("")

    let { id } = useParams()

    useEffect(() => {
        async function fetchData() {
            const { data } = await axios(`/gvn7dqcu/detail/${id}`)
            setDoc(data.found)
            setAppearance("no valid URL")
            setLabel("no valid URL")
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

    function displayDiscarded(document) {
        if(document.discarded){
            return("true, reason: " + document.discardedReason)
        }
        if(!document.discarded){
            return("false")
        }
        return("no valid data")
    }

    return (
        <div>
            <p>Detail Page</p>
            <div className="container">
                <dl className="row">
                    <dt className="col-sm-2">SupplyNo</dt>
                    <dd className="col-sm-10">{doc.no}</dd>
                    <dt className="col-sm-2">Registrated</dt>
                    <dd className="col-sm-10">{doc.registrated}</dd>
                    <dt className="col-sm-2">Description</dt>
                    <dd className="col-sm-10">{doc.description}</dd>
                    <dt className="col-sm-2">UnitPrice</dt>
                    <dd className="col-sm-10">{doc.unitPrice}</dd>
                    <dt className="col-sm-2">Qty</dt>
                    <dd className="col-sm-10">{doc.qty}</dd>
                    <dt className="col-sm-2">TotalPrice</dt>
                    <dd className="col-sm-10">{totalPriceCalc(doc.unitPrice, doc.qty)}</dd>
                    <dt className="col-sm-2">Dept</dt>
                    <dd className="col-sm-10">{doc.department}</dd>
                    <dt className="col-sm-2">Owner</dt>
                    <dd className="col-sm-10">{doc.owner}</dd>
                    <dt className="col-sm-2">Location</dt>
                    <dd className="col-sm-10">{doc.location}</dd>
                    <dt className="col-sm-2">Note</dt>
                    <dd className="col-sm-10">{doc.note}</dd>
                    <dt className="col-sm-2">PhoneNo(Optional)</dt>
                    <dd className="col-sm-10">{doc.phoneNo}</dd>
                    <dt className="col-sm-2">Discarded</dt>
                    <dd className="col-sm-10">{displayDiscarded(doc)}</dd>
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
                        {rentalHistory(doc.rentalHistory)}
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
                            <td>{appearance}</td>
                            <td>{label}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DetailPage
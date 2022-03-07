import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'


function EditDoc() {
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

    return(
    <div>Edit Document Page</div>
    )
}

export default EditDoc
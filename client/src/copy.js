<div className="col-md-10 mt-3 mx-auto">
    <h1>Adding New Item</h1>
    <div className="form-group">
        <input
            required
            id="no"
            maxLength="20"
            type="text"
            className="form-control"
            placeholder="Supply No [ input required, must be unique through the system, recommended format: 20yy-nnn ]"
            onChange={(e) => {
                if (e.target.value.includes() !== true) {
                    console.log(e.target.value.includes())
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
        />
    </div >

    <div className="form-group">
        <input
            id="registrated"
            maxLength="10"
            type="text"
            className="form-control"
            placeholder="Registrated Date [ format: 20yy-mm-dd ]"
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
        />
    </div>

    <div className="form-group">
        <input
            id="description"
            maxLength="70"
            type="text"
            className="form-control"
            placeholder="Description [ maxLength=70 ]"
            onChange={(e) => {
                setNewDoc({ ...newDoc, description: e.target.value })
            }}
        />
    </div>

    <div className="form-group">
        <input
            id="unitPrice"
            maxLength="10"
            type="tel"
            className="form-control"
            placeholder="Unit Price (extax)  e.g. 9980"
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
        />
    </div>

    <div className="form-group">
        <input
            id="qty"
            maxLength="5"
            type="tel"
            className="form-control"
            placeholder="Qty"
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
        />
    </div>

    <div className="form-group">
        <input
            id="department"
            maxLength="20"
            type="text"
            className="form-control"
            placeholder="Department"
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
            placeholder="Owner"
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
            placeholder="Location [ maxLength=20 ] "
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
            placeholder="Note [ maxLength=50 ]"
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
            placeholder="Phone No  [ without「 - 」, Optionnal Field: just in case your item is mobile devices ]"
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
        />
    </div>

    <div className="form-group">
        <input
            id="appearance"
            maxLength="50"
            type="text"
            className="form-control"
            placeholder="Share Folder's URL of Picture (appearance of your item)  [ maxLength=50 ]"
            onChange={(e) => {
                setNewDoc({ ...newDoc, appearance: e.target.value })
            }}
        />
    </div>

    <div className="form-group">
        <input
            id="label"
            maxLength="50"
            type="text"
            className="form-control"
            placeholder="Share Folder's URL of Picture (zooming the label on your item)  [ maxLength=50 ]"
            onChange={(e) => {
                setNewDoc({ ...newDoc, label: e.target.value })
            }}
        />
    </div>
</div>
import React, { useState } from "react";
import "./Dashboard.css";

export const NewJobEntry = ({ onClose, onSave }) => {
    const [formData, setFormData] = useState({
        builder: "",
        quoteNumber: "",
        name: "",
        location: "",
        jobValue: "",
        date: "",
        status: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="popup-overlay">
            <div className="popup-container">
                <h2>Add New Job Entry</h2>
                <form onSubmit={handleSubmit}>
                    {[
                        { label: "Builder", name: "builder", type: "text" },
                        { label: "Quote Number", name: "quoteNumber", type: "text" },
                        { label: "Name", name: "name", type: "text" },
                        { label: "Location", name: "location", type: "text" },
                        { label: "Job Value", name: "jobValue", type: "number" },
                        { label: "Date", name: "date", type: "date" },
                    ].map(({ label, name, type }) => (
                        <div key={name}>
                            <label>{label}:</label>
                            <input
                                type={type}
                                name={name}
                                value={formData[name]}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    ))}

                    <label>Status:</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select Status</option>
                        <option value="Won">Won</option>
                        <option value="Lost">Lost</option>
                        <option value="Waiting">Waiting</option>
                    </select>

                    <div className="form-buttons">
                        <button type="submit">Save</button>
                        <button type="button" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

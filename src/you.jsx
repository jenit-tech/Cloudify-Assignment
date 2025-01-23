import React, { useState } from "react";
import Select from "react-select";
import "./App.css"; // Import the CSS file

const App = () => {
  const [rows, setRows] = useState([{ label1: null, label2: [] }]);
  const [options, setOptions] = useState([
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    { value: "option4", label: "Option 4" },
  ]);
  const [inputValue, setInputValue] = useState("");

  // Handle adding new row
  const handleAddRow = () => {
    setRows([...rows, { label1: null, label2: [] }]);
  };

  // Handle change for Label 1
  const handleLabel1Change = (selectedOption, rowIndex) => {
    const updatedRows = rows.map((row, index) =>
      index === rowIndex ? { ...row, label1: selectedOption } : row
    );
    setRows(updatedRows);
  };

  // Handle change for Label 2
  const handleLabel2Change = (selectedOptions, rowIndex) => {
    const updatedRows = rows.map((row, index) =>
      index === rowIndex ? { ...row, label2: selectedOptions } : row
    );
    setRows(updatedRows);
  };

  // Function to add new option to select dropdown
  const addOption = () => {
    if (inputValue.trim() !== "") {
      setOptions([
        ...options,
        { value: inputValue.trim().toLowerCase(), label: inputValue.trim() },
      ]);
      setInputValue(""); // Clear the input field after adding the option
    }
  };

  return (
    <div className="container">
      {/* Input field for adding new option */}
      <div className="add-option-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add new option"
          className="add-option-input"
        />
        <button onClick={addOption} className="add-option-button">
          Add Option
        </button>
      </div>

      {/* Table for displaying rows */}
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th className="table-header">Label 1</th>
              <th className="table-header">Label 2</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td className="table-cell-one">
                  <Select
                    options={options}
                    value={row.label1}
                    onChange={(selectedOption) =>
                      handleLabel1Change(selectedOption, index)
                    }
                    placeholder="Select Option"
                    classNamePrefix="react-select"
                  />
                </td>
                <td className="table-cell">
                  <Select
                    options={options}
                    value={row.label2}
                    onChange={(selectedOptions) =>
                      handleLabel2Change(selectedOptions, index)
                    }
                    isMulti
                    placeholder="Select Option"
                    classNamePrefix="react-select"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Button to add a new row */}
      <div className="button-container">
        <button className="add-row-button" onClick={handleAddRow}>
          + Add New Row
        </button>
      </div>
    </div>
  );
};

export default App;

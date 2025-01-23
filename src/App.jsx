import React, { useState } from "react";
import Select from "react-select";
import "./App.css"; 

const App = () => {
  const [rows, setRows] = useState([{ label1: null, label2: [] }]);
  const [options, setOptions] = useState([
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    { value: "option4", label: "Option 4" },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleAddRow = () => {
    setRows([...rows, { label1: null, label2: [] }]);
  };

  const handleLabel1Change = (selectedOption, rowIndex) => {
    const updatedRows = rows.map((row, index) =>
      index === rowIndex ? { ...row, label1: selectedOption } : row
    );
    setRows(updatedRows);
  };

  const handleLabel2Change = (selectedOptions, rowIndex) => {
    const updatedRows = rows.map((row, index) =>
      index === rowIndex ? { ...row, label2: selectedOptions } : row
    );
    setRows(updatedRows);
  };

  
  const addOption = (newOption) => {
    if (newOption.trim() !== "") {
      setOptions((prevOptions) => [
        ...prevOptions,
        { value: newOption.toLowerCase().replace(/\s+/g, "_"), label: newOption },
      ]);
      setInputValue(""); 
    }
  };

  const CustomMenuList = (props) => {
    const { children } = props;
    const [newOption, setNewOption] = useState("");

    const handleAddOption = () => {
      addOption(newOption);
      setNewOption(""); 
    };

    return (
      <div className="custom-menu-list">
        <div className="options-container">{children}</div>
        <div className="add-option-container">
          <input
            type="text"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            placeholder="Add new option"
            className="add-option-input"
          />
          <button onClick={handleAddOption} className="add-option-button">
            Add
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
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
                    onChange={(selectedOption) => handleLabel1Change(selectedOption, index)}
                    placeholder="Selected Option"
                    classNamePrefix="react-select"
                  />
                </td>
                <td className="table-cell">
                  <Select
                    options={options}
                    value={row.label2}
                    onChange={(selectedOptions) => handleLabel2Change(selectedOptions, index)}
                    isMulti
                    placeholder="Selected Option"
                    classNamePrefix="react-select"
                    components={{
                      MenuList: CustomMenuList, // Custom menu with input for adding new options
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="button-container">
        <button className="add-row-button" onClick={handleAddRow}>
          + Add New Row
        </button>
      </div>
    </div>
  );
};

export default App;

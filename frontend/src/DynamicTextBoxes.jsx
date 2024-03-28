import React, { useState } from 'react';
import './DynamicTextBoxes.css'; // Importing CSS file for styling

function DynamicTextBoxes() {
  const [textBoxes, setTextBoxes] = useState([]);
  const [sum, setSum] = useState(0);
  const [invalidInput, setInvalidInput] = useState(false); // State for invalid input warning

  const addTextBox = () => {
    const newTextBoxes = [...textBoxes, { id: Date.now(), value: '' }];
    setTextBoxes(newTextBoxes);
  };

  const handleTextBoxChange = (id, value) => {
    const updatedTextBoxes = textBoxes.map((textBox) =>
      textBox.id === id ? { ...textBox, value } : textBox
    );
    setTextBoxes(updatedTextBoxes);
    calculateSum(updatedTextBoxes);
    checkInvalidInput(value);
  };

  const removeTextBox = (id) => {
    const updatedTextBoxes = textBoxes.filter((textBox) => textBox.id !== id);
    setTextBoxes(updatedTextBoxes);
    calculateSum(updatedTextBoxes);
  };

  const calculateSum = (textBoxes) => {
    let total = 0;
    textBoxes.forEach((textBox) => {
      const numValue = parseFloat(textBox.value);
      if (!isNaN(numValue) && /^[0-9.]+$/.test(textBox.value)) {
        total += numValue;
      }
    });
    setSum(total);
  };

  const checkInvalidInput = (value) => {
    if (!/^[0-9.]*$/.test(value)) {
      setInvalidInput(true);
    } else {
      setInvalidInput(false);
    }
  };

  return (
    <div className="container">
      <h1>Dynamic Textboxes</h1>
      <button className="add-btn" onClick={addTextBox}>Add Textbox</button>
      {textBoxes.map((textBox) => (
        <div key={textBox.id} className="textbox-container">
          <input
            type="text"
            value={textBox.value}
            onChange={(e) => handleTextBoxChange(textBox.id, e.target.value)}
            className={invalidInput ? 'textbox invalid' : /^[0-9.]+$/.test(textBox.value) ? 'textbox' : 'textbox invalid'}
          />
          <button className="delete-btn" onClick={() => removeTextBox(textBox.id)}>Delete</button>
        </div>
      ))}
      {invalidInput && <div className="invalid-input-warning">Invalid input. Please enter numbers only.</div>}
      <div className="total-sum">Total Sum: {sum}</div>
    </div>
  );
}

export default DynamicTextBoxes;

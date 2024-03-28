import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    phoneNumber: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errorMessage = '';
  
    // Initialize an array to hold error messages
let errorMessages = [];

// Frontend validation
if (formData.username.length <= 5) {
  errorMessages.push('Username must be longer than 5 characters');
}
if (formData.password.length <= 6) {
  errorMessages.push('Password must be longer than 6 characters');
}
if (formData.password !== formData.confirmPassword) {
  errorMessages.push('Passwords do not match');
}

// If there are error messages, display them using toast
if (errorMessages.length > 0) {
  errorMessages.forEach(errorMessage => {
    toast.error(errorMessage);
  });
  return;
}
  
    // Send data to backend
    const response = await fetch('http://localhost:8000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
        confirm_password: formData.confirmPassword,
        email: formData.email,
        phone_number: formData.phoneNumber
      })
    });
    const data = await response.json();
    console.log(data);
    // Display success message or handle errors from backend response
    if (response.ok) {
      toast.success(data.message);
    } else {
      toast.error(data.detail);
    }
  };

  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">User Registration</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input type="text" className="form-control" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <input type="password" className="form-control" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <input type="password" className="form-control" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <input type="email" className="form-control" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <input type="tel" className="form-control" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary w-100">Register</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;

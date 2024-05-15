// NumberAuthPage.jsx
import React, { useState } from "react";
import { PhoneNumberAuth } from "./FireBase";

function NumberAuthPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await PhoneNumberAuth(phoneNumber);
      console.log("Verification code sent:", result);
      // Optionally, you can handle the verification code here
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Phone Number Authentication</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={handleChange}
          required
        />
        <button type="submit">Send Verification Code</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default NumberAuthPage;

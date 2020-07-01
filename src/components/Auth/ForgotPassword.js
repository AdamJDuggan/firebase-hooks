import React, { useState } from "react";
import { FirebaseContext } from "../../firebase";

function ForgotPassword() {
  const { firebase } = React.useContext(FirebaseContext);
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");
  const [isPasswordReset, setIsPasswordreset] = useState(false);
  const [passwordResetError, setPasswordResetError] = useState(null);

  async function handleResetPassword() {
    try {
      await firebase.resetPassword(resetPasswordEmail);
      setIsPasswordreset(true);
      setPasswordResetError(false);
    } catch (err) {
      console.error("Error sending email", err);
      setPasswordResetError(err.message);
      setIsPasswordreset(false);
    }
  }
  return (
    <div>
      <input
        type="email"
        className="input"
        placeholder="Provide your account email"
        onChange={(event) => setResetPasswordEmail(event.target.value)}
      />
      <div>
        <button onClick={handleResetPassword} className="button">
          Reset Password
        </button>
      </div>
      {isPasswordReset && <p>Check email to reset password</p>}
      {passwordResetError && <p className="error-text">{passwordResetError}</p>}
    </div>
  );
}

export default ForgotPassword;

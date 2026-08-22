const BASE_URL = "https://cineversebackend1-xnz2tmdg.b4a.run/api/v1/auth";

export const registerUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  return data;
};

//login api
export const loginUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  return await response.json();
};

export const verifyEmail = async (formData) => {
  const response = await fetch(
    "https://cineversebackend1-xnz2tmdg.b4a.run/api/v1/auth/verify-email",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    },
  );

  return await response.json();
};

//Resend OTP api
export const resendOTP = async (data) => {
  const response = await fetch(
    "https://cineversebackend1-xnz2tmdg.b4a.run/api/v1/auth/resend-otp",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  return await response.json();
};

//resetpassword api
export const resetPassword = async (data) => {
  const response = await fetch(
    "https://cineversebackend1-xnz2tmdg.b4a.run/api/v1/auth/reset-password",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  return await response.json();
};

//forgotpassword api
export const forgotPassword = async (data) => {
  const response = await fetch(
    "https://cineversebackend1-xnz2tmdg.b4a.run/api/v1/auth/forgot-password",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  return await response.json();
};

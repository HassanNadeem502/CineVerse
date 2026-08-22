const API = "https://cineversebackend1-lll317sb.b4a.run/api/v1/user";

export const uploadProfileImage = async (file, token) => {
  const formData = new FormData();

  formData.append("profileImage", file);

  const response = await fetch(`${API}/profile-image`, {
    method: "PUT",

    headers: {
      Authorization: `Bearer ${token}`,
    },

    body: formData,
  });

  return response.json();
};

//-------------Profile Update-----------------
export const updateProfile = async (data, token) => {
  const response = await fetch(`${API}/update-profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
//-------------Change Password-----------------
export const changePassword = async (passwordData, token) => {
  const response = await fetch(
    "https://cineversebackend1-lll317sb.b4a.run/api/v1/user/change-password",
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(passwordData),
    }
  );

  return response.json();
};
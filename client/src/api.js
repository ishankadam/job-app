import { getToken } from "./auth";
const { REACT_APP_API_URL } = process.env;
export const apiUrl = REACT_APP_API_URL;

export const createUser = async (userDetails, navigate) => {
  const authToken = getToken();
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + authToken,
    },
    body: JSON.stringify(userDetails),
  };
  fetch(`${apiUrl}/auth/createUser`, requestOptions)
    .then(async (res) => {
      if (res.ok) {
        navigate("/");
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

export const getAllJobs = async () => {
  const authToken = getToken();
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + authToken,
    },
  };
  return fetch(`${apiUrl}/jobs`, requestOptions)
    .then(async function (response) {
      if (response.ok) {
        return await response.json();
      } else {
        if (response.status === 401) {
          console.log("error");
        }
      }
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getUserInfo = async (userId) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(`${apiUrl}/auth/user/${userId}`, requestOptions)
    .then(async function (response) {
      if (response.ok) {
        return await response.json();
      } else {
        if (response.status === 401) {
          console.log("error");
        }
      }
    })
    .then((data) => {
      return data[0];
    })
    .catch((err) => {
      console.log(err);
    });
};

export const login = async (user, error, setError, navigate) => {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify({
      email: user.email,
      password: user.password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    if (user.email !== "" && user.password !== "") {
      const response = await fetch(`${apiUrl}/auth/login`, requestOptions);
      const result = await response.json();
      if (result.isValid) {
        localStorage.setItem("employeeId", result.employeeDetails.userId);
        localStorage.setItem("email", result.employeeDetails.email);
        localStorage.setItem("token", result.token);
        return result.employeeDetails;
      } else if (result.isPasswordInvalid) {
        setError({
          ...error,
          password: true,
        });
      } else if (result.isEmailInvalid) {
        setError({
          ...error,
          email: true,
        });
      } else {
        console.log("Something went Wrong");
      }
    } else {
      setError({
        ...error,
        email: true,
        password: true,
        errorMsg: { password: "Please enter correct password" },
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const addJob = async (jobDetails) => {
  const authToken = getToken();
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + authToken,
    },
    body: JSON.stringify(jobDetails),
  };

  try {
    const response = await fetch(`${apiUrl}/createJob`, requestOptions);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to add job");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editJob = async (job, userId) => {
  const authToken = getToken();
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + authToken,
    },
    body: JSON.stringify({
      job: job,
      userId: userId,
    }),
  };

  try {
    const response = await fetch(`${apiUrl}/editJob`, requestOptions);
    if (response.ok) {
      const data = await response.json();
      return data; // Ensure this returns the data
    } else {
      // Handle non-ok responses
      const errorData = await response.json(); // Optional: Get error details from response
      throw new Error(errorData.message || "Network response was not ok.");
    }
  } catch (error) {
    console.log(error);
    throw error; // Re-throw the error to be caught in the updateJobs function
  }
};

export const deleteJob = async (jobId) => {
  const authToken = getToken();
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + authToken,
    },
  };

  try {
    const response = await fetch(
      `${apiUrl}/deleteJob/${jobId}`,
      requestOptions
    );

    if (response.ok) {
      const data = await response.json();
      return data; // Update the state or handle the response data
    } else {
      // Handle non-200 responses
      const errorData = await response.json();
      console.error("Error:", errorData);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

export const verifyToken = async (token) => {
  const requestOptions = {
    method: "GET", // Or "POST" depending on your backend implementation
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token, // Assuming you're passing the token in the Authorization header
    },
  };

  try {
    const response = await fetch(
      `${apiUrl}/auth/verifyToken/${token}`, // Adjust the URL to match your backend route
      requestOptions
    );
    if (response.status === 200) {
      return true; // Process the response as needed
    } else if (response.status === 401) {
      console.error("Error:", response.statusText);
      return false; // Handle the error case
    } else {
      console.error("Error:", response.statusText);
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return null; // Handle network or other errors
  }
};

//   export const requestLeave = (
//     setSessionTimeout,
//     leave,
//     setLeaveData,
//     setSnackbarDetails,
//     unpaidLeaves,
//     employeeGlobalArray,
//     setLeaveUpdated
//   ) => {
//     const authToken = getToken();
//     const formdata = new FormData();
//     for (let key in leave) {
//       formdata.append(key, leave[key]);
//     }
//     formdata.append("unpaidLeaves", unpaidLeaves);
//     formdata.append("employee", JSON.stringify(employeeGlobalArray));

//     $.ajax({
//       type: "POST",
//       url: `${apiUrl}/leaves/requestLeave`,
//       data: formdata,
//       dataType: "JSON",
//       processData: false,
//       beforeSend: function (xhr) {
//         xhr.setRequestHeader("Authorization", "Bearer " + authToken);
//       },
//       contentType: false,
//     })
//       .then(async (res) => {
//         setLeaveData(res);
//         let differenceInTime =
//           new Date(leave.startDate).getTime() - new Date().getTime();
//         let differenceInDays = differenceInTime / (1000 * 3600 * 24);
//         setSnackbarDetails &&
//           setSnackbarDetails(
//             differenceInDays < 21
//               ? snackBarSettings.leave.addSuccessLessThan
//               : snackBarSettings.leave.addSuccessGreaterThan
//           );
//         setLeaveUpdated && setLeaveUpdated(true);
//       })
//       .fail(function (data) {
//         setSnackbarDetails && setSnackbarDetails(snackBarSettings.failure);
//       });
//   };

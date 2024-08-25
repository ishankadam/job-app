export const contracts = [
  { label: "Full-Time", value: "fulltime" },
  { label: "Part-Time", value: "parttime" },
  { label: "Contract", value: "contract" },
  { label: "Internship", value: "internship" },
];

export const findLabelByValue = (value) => {
  const contract = contracts.find((contract) => contract.value === value);
  return contract ? contract.label : null;
};

export const hasEmptyField = (obj) => {
  return Object.values(obj).some(
    (value) => typeof value === "string" && value.trim() === ""
  );
};

export const validateEmail = (passedEmail) => {
  let emailRegex = /^[A-Za-z0-9_.-]{3,}@(alphaware\.com|alphawarenext\.com)$/;
  return emailRegex.test(passedEmail);
};

export const isValidPhoneNumber = (phoneNumber) => {
  // Regex to check if the cleaned number is a 10-digit number starting with 7-9
  const phoneRegex = /^[7-9]\d{9}$/;

  return phoneRegex.test(phoneNumber);
};

export const validatePassword = (password) => {
  return {
    minLength: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    digit: /\d/.test(password),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
};

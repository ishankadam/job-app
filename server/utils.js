const getRoleBasedOnEmail = (email) => {
  const domain = email.split("@")[1];

  if (domain === "alphaware.com") {
    return "admin";
  } else if (domain !== "alphawarenext.com") {
    return "user";
  }
  return "user"; // Default to user if the domain doesn't match any condition
};

module.exports = {
  getRoleBasedOnEmail,
};

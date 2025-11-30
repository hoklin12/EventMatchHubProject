function formatDateCertificate(date) {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getExpirationDate(issuedDate, durationInMonths) {
  if (!(issuedDate instanceof Date) || isNaN(durationInMonths)) {
    throw new Error(
      "Invalid input: issuedDate must be a Date and durationInMonths must be a number."
    );
  }

  const date = new Date(issuedDate);
  date.setMonth(date.getMonth() + durationInMonths);
  return date;
}

// Export the functions so they can be used elsewhere
module.exports = {
  formatDateCertificate,
  getExpirationDate,
};

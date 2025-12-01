export const calculateGPA = (grades) => {
  if (!grades || grades.length === 0) return 0;

  let totalPoints = 0;
  let totalCredits = 0;

  grades.forEach((grade) => {
    // Assuming grade.averageScore is already calculated or we calculate it here
    // For simplicity, let's use averageScore directly if available
    const score = grade.averageScore || 0;
    const credits = grade.subject?.credits || 3; // Default to 3 if not found

    // Convert 10-scale to 4-scale (approximate mapping for example)
    // 8.5-10: 4.0, 7.0-8.4: 3.0, 5.5-6.9: 2.0, 4.0-5.4: 1.0, <4.0: 0
    let gpa4 = 0;
    if (score >= 8.5) gpa4 = 4.0;
    else if (score >= 7.0) gpa4 = 3.0;
    else if (score >= 5.5) gpa4 = 2.0;
    else if (score >= 4.0) gpa4 = 1.0;
    
    totalPoints += gpa4 * credits;
    totalCredits += credits;
  });

  return totalCredits === 0 ? 0 : (totalPoints / totalCredits).toFixed(2);
};

export const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const exportToCSV = (data, filename) => {
  if (!data || data.length === 0) {
    console.warn("No data to export");
    return;
  }

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(","),
    ...data.map((row) =>
      headers
        .map((header) => {
          const value = row[header];
          // Handle strings with commas by wrapping in quotes
          return typeof value === "string" && value.includes(",")
            ? `"${value}"`
            : value;
        })
        .join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

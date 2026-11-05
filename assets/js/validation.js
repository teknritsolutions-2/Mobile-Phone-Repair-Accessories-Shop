export function localDate(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function validateRequest(data, accessory = false, today = localDate()) {
  const errors = {};
  const required = [
    "name",
    "email",
    "phone",
    "service",
    "description",
    ...(!accessory ? ["brand", "model"] : []),
  ];
  for (const name of required) {
    if (!String(data[name] || "").trim())
      errors[name] = "Please complete this field.";
  }
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()))
    errors.email = "Enter a valid email, such as name@example.com.";
  if (
    data.phone &&
    (!/^[+\d\s().-]{7,25}$/.test(data.phone) ||
      data.phone.replace(/\D/g, "").length < 7)
  )
    errors.phone = "Enter a valid phone number with at least 7 digits.";
  if (data.description && data.description.trim().length < 10)
    errors.description =
      "Add at least 10 characters to help explain your request.";
  if (data.date && data.date < today)
    errors.date = "Choose today or a future date.";
  if (!data.consent)
    errors.consent = "Please acknowledge how your request is handled.";
  return errors;
}

export function buildRequestSummary(
  data,
  serviceName,
  productName = "",
  sent = false,
) {
  return [
    `PORT & PIXEL — ${sent ? "REPAIR REQUEST" : "LOCAL REQUEST COPY (NOT SENT)"}`,
    `Name: ${data.name.trim()}`,
    `Email: ${data.email.trim()}`,
    `Phone: ${data.phone.trim()}`,
    `Device: ${[data.brand, data.model].filter(Boolean).join(" ") || "To discuss"}`,
    `Request: ${serviceName}`,
    productName ? `Accessory: ${productName}` : "",
    `Details: ${data.description.trim()}`,
    `Preferred visit: ${data.date || "To discuss"}`,
    `Time window: ${data.time || "No preference"}`,
    data.notes?.trim() ? `Notes: ${data.notes.trim()}` : "",
    "Visit timing is subject to shop confirmation.",
  ]
    .filter(Boolean)
    .join("\n");
}

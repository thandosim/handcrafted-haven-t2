export function extractFriendlyErrors(errorObj: any): string[] {
  const messages: string[] = [];

  for (const key in errorObj) {
    const field = errorObj[key];
    if (field && Array.isArray(field._errors)) {
      field._errors.forEach((msg: string) => {
        messages.push(mapToFriendlyMessage(key, msg));
      });
    }
  }

  // Include top-level _errors if present
  if (Array.isArray(errorObj._errors)) {
    errorObj._errors.forEach((msg: string) => {
      messages.push(mapToFriendlyMessage("general", msg));
    });
  }

  return messages;
}

function mapToFriendlyMessage(field: string, msg: string): string {
  if (msg.includes("expected string to have >=8 characters")) {
    return "Password must be at least 8 characters long.";
  }
  if (msg.includes("Invalid email format")) {
    return "Please enter a valid email address.";
  }
  if (msg.includes("required")) {
    return `${capitalize(field)} is required.`;
  }
  return msg; // fallback to original message
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

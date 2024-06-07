export default function Classify(email: string) {
  email = email.toLowerCase();
  if (email.includes("important")) {
    return "Important";
  } else if (email.includes("spam")) {
    return "Spam";
  } else if (email.includes("promotions") || email.includes("promotion")) {
    return "Promotion";
  } else if (email.includes("marketting")) {
    return "Marketting";
  } else if (email.includes("social")) {
    return "Social";
  } else {
    return "General";
  }
}

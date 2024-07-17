import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date, includeMinutes: Boolean = true) {
  // Array for day names and month names
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get day, date, month, and year
  const dayName = daysOfWeek[date.getDay()];
  const monthName = monthsOfYear[date.getMonth()];
  const dayNumber = date.getDate().toString().padStart(2, "0"); // Adding leading zero
  const year = date.getFullYear();

  // Get hours and minutes
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Adding leading zero

  // Determine AM or PM
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  if (includeMinutes) {
    // Construct the formatted date string
    return `${dayName}, ${monthName} ${dayNumber}, ${year} at ${hours}:${minutes} ${ampm}`;
  } else {
    return `${dayName}, ${monthName} ${dayNumber}, ${year}`;
  }
}

export function formatTableReservationTime(datadate: Date) {
  const date = new Date(datadate);

  // Get hours and minutes
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Adding leading zero

  // Determine AM or PM
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  return `${hours}:${minutes} ${ampm}`;
}

// Utility function to format the phone number as xx-xxx-xxxx
export const formatPhoneNumber = (value: string): string => {
  const cleanValue = value.replace(/\D/g, ""); // Remove all non-digit characters
  const part1 = cleanValue.substring(0, 3); // First three digits (area code)
  const part2 = cleanValue.substring(3, 6); // Next three digits
  const part3 = cleanValue.substring(6, 10); // Last four digits

  if (cleanValue.length <= 3) return part1;
  if (cleanValue.length <= 6) return `${part1}-${part2}`;
  return `${part1}-${part2}-${part3}`; // Format as xxx-xxx-xxxx
};

// Utility function to format a credit card number as xxxx-xxxx-xxxx-xxxx
export const formatCreditCardNumber = (value: string): string => {
  // Remove all non-digit characters
  const cleanValue = value.replace(/\D/g, "");

  // Group digits into sets of 4
  const part1 = cleanValue.substring(0, 4);
  const part2 = cleanValue.substring(4, 8);
  const part3 = cleanValue.substring(8, 12);
  const part4 = cleanValue.substring(12, 16);

  // Format based on the length of the input
  if (cleanValue.length <= 4) return part1;
  if (cleanValue.length <= 8) return `${part1}-${part2}`;
  if (cleanValue.length <= 12) return `${part1}-${part2}-${part3}`;
  return `${part1}-${part2}-${part3}-${part4}`; // Format as xxxx-xxxx-xxxx-xxxx
};

// Utility function to format expiration date as mm/yy
export const formatExpirationDate = (value: string): string => {
  // Remove all non-digit characters
  const cleanValue = value.replace(/\D/g, "");

  // Early return if no value or only the first digit (cannot determine month yet)
  if (!cleanValue) return "";
  if (cleanValue.length === 1) return cleanValue;

  // Extract month and year parts from the cleaned value
  let month = cleanValue.substring(0, 2);
  const year = cleanValue.substring(2, 4);

  // Validate and format the month
  if (parseInt(month, 10) > 12) {
    // If the month is invalid (greater than 12), set it to '01'
    month = "01";
  } else if (cleanValue.length === 2 && parseInt(month, 10) < 10) {
    // If only one digit is entered and it's valid, don't automatically add a '0' unless it is < 10
    month = month;
  } else if (parseInt(cleanValue[0], 10) > 1) {
    // If the first digit is more than 1 (invalid for month), prepend '0'
    month = `0${cleanValue[0]}`;
  } else if (cleanValue.length >= 2) {
    // If the input is valid two-digit month
    month = cleanValue.substring(0, 2);
  }

  // Format based on the length of the input
  if (cleanValue.length <= 2) return month;
  return `${month}/${year}`; // Format as mm/yy
};

// All states for easy mapping on reservation form
export const states = [
  { name: "alabama", abbreviation: "al" },
  { name: "alaska", abbreviation: "ak" },
  { name: "arizona", abbreviation: "az" },
  { name: "arkansas", abbreviation: "ar" },
  { name: "california", abbreviation: "ca" },
  { name: "colorado", abbreviation: "co" },
  { name: "connecticut", abbreviation: "ct" },
  { name: "delaware", abbreviation: "de" },
  { name: "florida", abbreviation: "fl" },
  { name: "georgia", abbreviation: "ga" },
  { name: "hawaii", abbreviation: "hi" },
  { name: "idaho", abbreviation: "id" },
  { name: "illinois", abbreviation: "il" },
  { name: "indiana", abbreviation: "in" },
  { name: "iowa", abbreviation: "ia" },
  { name: "kansas", abbreviation: "ks" },
  { name: "kentucky", abbreviation: "ky" },
  { name: "louisiana", abbreviation: "la" },
  { name: "maine", abbreviation: "me" },
  { name: "maryland", abbreviation: "md" },
  { name: "massachusetts", abbreviation: "ma" },
  { name: "michigan", abbreviation: "mi" },
  { name: "minnesota", abbreviation: "mn" },
  { name: "mississippi", abbreviation: "ms" },
  { name: "missouri", abbreviation: "mo" },
  { name: "montana", abbreviation: "mt" },
  { name: "nebraska", abbreviation: "ne" },
  { name: "nevada", abbreviation: "nv" },
  { name: "new hampshire", abbreviation: "nh" },
  { name: "new jersey", abbreviation: "nj" },
  { name: "new mexico", abbreviation: "nm" },
  { name: "new york", abbreviation: "ny" },
  { name: "north carolina", abbreviation: "nc" },
  { name: "north dakota", abbreviation: "nd" },
  { name: "ohio", abbreviation: "oh" },
  { name: "oklahoma", abbreviation: "ok" },
  { name: "oregon", abbreviation: "or" },
  { name: "pennsylvania", abbreviation: "pa" },
  { name: "rhode island", abbreviation: "ri" },
  { name: "south carolina", abbreviation: "sc" },
  { name: "south dakota", abbreviation: "sd" },
  { name: "tennessee", abbreviation: "tn" },
  { name: "texas", abbreviation: "tx" },
  { name: "utah", abbreviation: "ut" },
  { name: "vermont", abbreviation: "vt" },
  { name: "virginia", abbreviation: "va" },
  { name: "washington", abbreviation: "wa" },
  { name: "west virginia", abbreviation: "wv" },
  { name: "wisconsin", abbreviation: "wi" },
  { name: "wyoming", abbreviation: "wy" },
];

export function numberWithCommas(number: number) {
  return number.toLocaleString();
}

export function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt
      .toLowerCase()
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");
  });
}

import moment from "moment";
import { FacebookData } from "../Model/FacebookData.js";

const splitName = (name) => {
    const nameParts = name.trim().split(" ");
    const first_name = nameParts[0];
    const last_name = nameParts.length > 1 ? nameParts.slice(1).join(" ") : null;

    return { first_name, last_name };
}

export const dbModal = {
  facebook : FacebookData,
}

// Function to shift date by one day back
const shiftDateByOneDay = (dateString) => {
    return moment(dateString).subtract(1, 'days').toISOString(); 
  };
  
  // Loop through the data and shift each date back by one day
const shiftData = (data) => {
  const newShiftedData = data.map((entry) => {
    return {
      value: entry.value,
      end_time: shiftDateByOneDay(entry.end_time) 
    };
  });
  return newShiftedData;
}

export { splitName, shiftData }
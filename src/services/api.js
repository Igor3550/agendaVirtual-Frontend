import axios from "axios";
import dayjs from "dayjs";

const baseURL = process.env.REACT_APP_BASE_URL;

export async function getScheduleList() {
  const result = await fetch(`${baseURL}/schedule`, {
    method: "GET"
  });
  return result.json(); //Promise (return => aw)
}

export async function getDayHours(date) {

  const res = await axios.get(`${baseURL}/date/hours/${date}`);
  return res.data; //Promise (return => aw)
}

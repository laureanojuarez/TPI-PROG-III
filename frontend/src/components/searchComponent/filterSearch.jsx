import axios from "axios";
export const filterSearch = async ({ data }) => {
  try {
    const getEvents = await axios.get(`http://localhost:3000/search?q=${data}`);
    console.log(getEvents);
  } catch (error) {
    console.error(error);
  }
};

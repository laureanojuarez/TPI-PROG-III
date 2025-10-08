import axios from "axios";
export const filterSearch = async ({ data }) => {
  try {
    const response = await axios.get(`http://localhost:3000/search?q=${data}`);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

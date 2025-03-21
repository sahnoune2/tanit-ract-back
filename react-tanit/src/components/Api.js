import axios from "axios";

const api = "http://localhost:5001";

export const getJobs = async () => {
  try {
    const response = await axios.get(`${api}/jobs/getJobs`);

    console.log(response);
    console.log(response.data.jobs);
    return response.data.jobs;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getCurrent = async () => {
  try {
    const response = await axios.get("http://localhost:5001/user/getcurrent", {
      withCredentials: true,
    });
    console.log(response);
    if (response.status === 200) {
      return response.data.user;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

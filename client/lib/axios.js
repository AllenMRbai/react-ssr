import axios from "axios";
import { isBrowser } from "./utils";

const IS_DEV = process.env.NODE_ENV === "development";
const IS_BROWSER = isBrowser();

const axiosConfig = {};

if (!IS_BROWSER) {
  if (IS_DEV) {
    axiosConfig.baseURL = "http://localhost:8080";
  } else {
    axiosConfig.baseURL = "http://localhost:8080";
  }
}

const instance = axios.create(axiosConfig);

export default instance;

import axios from "axios";
import { USER_LOCALSTORAGE_KEY } from "shared/constants/localstorage";

// const baseUrl = __IS_DEV__ ? "http://localhost:8000" : "https://production.ru"; // создали __API__ для этого

export const $apiCreateBase = axios.create({
   baseURL: __API__,
   headers: {
      authorization: localStorage.getItem(USER_LOCALSTORAGE_KEY),
   },
});

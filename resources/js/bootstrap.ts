import axios from "axios";

// @ts-expect-error window
window.axios = axios;
// @ts-expect-error window
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

// const API_URL =
// process.env.REACT_APP_BACKEND_URL || "https://shopnest-5e8e.onrender.com";

// export default API_URL;


const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : process.env.REACT_APP_BACKEND_URL || "https://shopnest-5e8e.onrender.com";

export default API_URL;
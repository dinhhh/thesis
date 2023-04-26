const prod = {
  url: {
    KEYCLOAK_BASE_URL: "https://lms.dailyopt.ai/iam",
    API_URL: "/api",
  },
};

const dev = {
  url: {
    KEYCLOAK_BASE_URL: "https://lms.dailyopt.ai/iam",
    API_URL: "http://localhost/api",
  },
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
export const API_URL = process.env.NODE_ENV === "development" ? dev.url.API_URL : prod.url.API_URL;
export const thresholds = {
  http_req_failed: ["rate<0.01"], // Fail if error rate is > 1%
  http_req_duration: ["p(95)<500"], // 95% of requests must be under 500ms
};

export const BASE_URL = "http://localhost:4000/api"; // Change this when you deploy to Vercel/Render

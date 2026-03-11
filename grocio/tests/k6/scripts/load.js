import http from "k6/http";
import { check, sleep } from "k6";
import { thresholds, BASE_URL } from "../config/threshold.js";

export const options = {
  stages: [
    { duration: "1m", target: 50 },
    { duration: "2m", target: 50 },
    { duration: "1m", target: 0 },
  ],
  thresholds: thresholds,
};

export default function () {
  const resProducts = http.get(`${BASE_URL}/product/list`);
  check(resProducts, { "products status is 200": (r) => r.status === 200 });

  if (resProducts.status !== 200) {
    console.log(`Error: ${resProducts.status} on ${resProducts.url}`);
    console.log(`Body: ${resProducts.body}`);
  }

  const resSearch = http.get(`${BASE_URL}/product/list?query=milk`);
  check(resSearch, { "search status is 200": (r) => r.status === 200 });
  if (resSearch.status !== 200) {
    console.log(`Error: ${resSearch.status} on ${resSearch.url}`);
    console.log(`Body: ${resSearch.body}`);
  }

  sleep(Math.random() * 3 + 1);
}

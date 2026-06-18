import http from "k6/http";
import { check, sleep } from "k6";
import { thresholds, BASE_URL } from "../config/threshold.js";

export const options = {
  stages: [
    { duration: "1m", target: 100 }, // Normal load
    { duration: "2m", target: 150 }, // Heavy load
    { duration: "2m", target: 250 }, // Stress point!
    { duration: "1m", target: 0 }, //cool down
  ],
  thresholds: thresholds,
};

export default function () {
  const resProducts = http.get(`${BASE_URL}/product/list`);
  check(resProducts, { "Products status is 200": (r) => r.status === 200 });
  if (resProducts.status !== 200) {
    console.log(`Error: ${resProducts.status} on ${resProducts.url}`);
    console.log(`Body: ${resProducts.body}`);
  }

  sleep(1);
}

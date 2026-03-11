import http from "k6/http";
import { check, sleep } from "k6";
import { thresholds, BASE_URL } from "../config/threshold.js";

export const options = {
  // We ramp up to 500 users to see when the server starts failing
  stages: [
    { duration: "1m", target: 100 }, // Normal load
    { duration: "2m", target: 150 }, // Heavy load
    { duration: "2m", target: 250 }, // Stress point!
    { duration: "1m", target: 0 }, // Stay at peak to see if it crashes
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

  // We reduce sleep time to 1 second to put MORE pressure on the CPU
  sleep(1);
}

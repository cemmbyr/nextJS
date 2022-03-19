import axios from "axios"

const req_url = "https://teknasyon.netlify.app/.netlify/functions/products"

export const getProducts = () => {
  return axios.post(req_url, {}, {
    headers: {
      "X-Access-Token": "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"
    }
  }).then(data => data)
}
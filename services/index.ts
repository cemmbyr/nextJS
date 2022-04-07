import axios from "axios"

export const getProducts = () => {
  return axios.post(process.env.REQ_URL, {}, {
    headers: {
      "X-Access-Token": "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"
    }
  }).then(data => data)
}
import axios from "axios"

const productsUrl:any = process.env.REQ_URL

export const getProducts = () => {
  return axios.post(productsUrl, {}, {
    headers: {
      "X-Access-Token": "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"
    }
  }).then(data => data)
}
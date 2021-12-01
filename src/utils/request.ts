import axios from "axios";

const serializeJSON = (json: Record<string, string | number>) => {
  const result = [];
  for (let x in json) {
    result.push(`${encodeURIComponent(x)}=${encodeURIComponent(json[x])}`);
  }
  return result.join("&")
}

export const request = (data: Record<string, string | number>) => axios({
  url: '/my-registrar/public-course-catalog/json',
  method: 'POST',
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  data: serializeJSON(data),
});

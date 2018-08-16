export const BASE_URL = {
  dev: "http://192.168.0.129:3000/api/v2/m/education/",
  staging: "https://cmost.rotati.tech/api/v2/m/demo/"
}

export const API_KEY = "b6c5320797ce0404c5d4f8350b01e36b"

export const DOWNLOAD_FORM_URL = BASE_URL.dev + "forms"
export const SUBMIT_FORM_URL   = BASE_URL.dev + "responses"
export const CREATE_OPTION_URL = (id) => BASE_URL.dev + "option_sets/" + id
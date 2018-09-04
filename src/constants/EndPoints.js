export const BASE_URL = {
  dev: "http://localhost:3000/api/v2/m/education/",
  staging: "https://cmost.rotati.tech/api/v2/m/demosite/"
}

export const API_KEY = "b6c5320797ce0404c5d4f8350b01e36b"

export const DOWNLOAD_FORM_URL = BASE_URL.staging + "forms"
export const SUBMIT_FORM_URL   = BASE_URL.staging + "responses"
export const CREATE_OPTION_URL = (id) => BASE_URL.staging + "option_sets/" + id 
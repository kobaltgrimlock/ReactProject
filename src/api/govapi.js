//govapi.js
import axios from "axios";
const BASE_URL =
  "https://data.gov.sg/api/action/datastore_search?resource_id=d_8b84c4ee58e3cfc0ece0d773c8ca6abc&limit=3000";
const govapi = axios.create({ baseURL: BASE_URL });

export default govapi;

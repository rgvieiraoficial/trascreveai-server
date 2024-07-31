import axios from 'axios';

import { graphApiConfig } from '../config/graphApiConfig';

export const graphApi = axios.create({
  baseURL: graphApiConfig.url
});
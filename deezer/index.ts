import { parseSearchResult } from "./../utils/deezerUtils";
import { SearchResult } from "../types";
import axios from "axios";

export const search = async (query: string, count: number): Promise<SearchResult> => {
  const response = await searchApiCall(query);
  return parseSearchResult(response).slice(0, count);
};

const searchApiCall = async (query: string): Promise<any> => {
  const encodedQuery = encodeURIComponent(query);

  const response = await axios.get(`https://api.deezer.com/search/track?q=${encodedQuery}`);
  return response.data.data;
};

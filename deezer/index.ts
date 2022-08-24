import { parseSearchResponse, parseTrackInfoResponse } from "./../utils/deezerUtils";
import { SearchResult, TrackInfo } from "../types";
import axios from "axios";

export const search = async (query: string, count: number): Promise<SearchResult> => {
  const response = await searchApiCall(query);
  return parseSearchResponse(response).slice(0, count);
};

export const getTrackInfo = async (id: string): Promise<TrackInfo> => {
  const response = await getTrackInfoApiCall(id);
  return parseTrackInfoResponse(response);
};

const getTrackInfoApiCall = async (id: string) => {
  const response = await axios.get(`https://api.deezer.com/track/${id}`);
  return response.data;
};

const searchApiCall = async (query: string): Promise<any> => {
  const encodedQuery = encodeURIComponent(query);

  const response = await axios.get(`https://api.deezer.com/search/track?q=${encodedQuery}`);
  return response.data.data;
};

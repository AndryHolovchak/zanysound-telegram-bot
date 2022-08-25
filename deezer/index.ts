import axios from "axios";
import { SearchResult, Track } from "../types";
import { parseSearchResponse, parseTrackInfo } from "./../utils/deezerUtils";

export const search = async (query: string, count: number): Promise<SearchResult> => {
  const response = await searchApiCall(query);

  // remove tracks with the same artist + title
  return parseSearchResponse(response)
    .filter((e, index, array) => {
      for (let i = index + 1; i < array.length; i++) {
        if (e.artist === array[i].artist && e.title === array[i].title) {
          return false;
        }
      }
      return true;
    })
    .slice(0, count);
};

export const getTrackInfo = async (id: string): Promise<Track> => {
  const response = await getTrackInfoApiCall(id);
  return parseTrackInfo(response);
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

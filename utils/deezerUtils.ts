import { SearchResult } from "./../types/index.d";

export const parseSearchResult = (data: any): SearchResult => {
  return data.map((e: any) => ({
    id: e.id.toString(),
    title: e.title,
    artist: e.artist.name,
  }));
};

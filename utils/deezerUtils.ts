import { SearchResult, TrackInfo } from "./../types/index.d";

export const parseSearchResponse = (data: any): SearchResult => {
  return data.map((e: any) => ({
    id: e.id.toString(),
    title: e.title,
    artist: e.artist.name,
  }));
};

export const parseTrackInfoResponse = (data: any): TrackInfo => {
  return {
    title: data.title,
    artist: data.artist.name,
    cover: data.album.cover_big,
  };
};

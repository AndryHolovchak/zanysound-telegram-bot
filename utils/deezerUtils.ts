import { SearchResult, Track } from "./../types/index.d";

export const parseSearchResponse = (data: any): SearchResult =>
  data.map((item: any) => ({
    id: item.id,
    title: item.title,
    artist: item.artist.name,
  }));

export const parseTrackInfo = (data: any): Track => ({
  title: data.title,
  artist: data.artist.name,
  cover: data.album.cover_xl,
});

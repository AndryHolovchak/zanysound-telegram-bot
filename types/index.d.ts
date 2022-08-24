import { Readable } from "stream";

export interface SearchResultItem {
  id: string;
  title: string;
  artist: string;
}

export interface TrackInfo {
  cover: string;
  title: string;
  artist: string;
}

export interface TrackMp3 {
  stream: Readable;
  duration: number;
}

export type SearchResult = SearchResultItem[];

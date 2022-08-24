import { Readable } from "stream";

export interface BasicTrackInfo {
  title: string;
  artist: string;
}

export interface SearchResultItem extends BasicTrackInfo {
  id: string;
}

export interface TrackInfo extends BasicTrackInfo {
  cover: string;
}

export interface TrackMp3 {
  stream: Readable;
  duration: number;
}

export type SearchResult = SearchResultItem[];

import { Readable } from "stream";

export interface BasicTrackInfo {
  title: string;
  artist: string;
}

export interface Track extends BasicTrackInfo {
  cover: string;
}

export interface SearchResultTrack extends BasicTrackInfo {
  id: string;
}

export interface TrackMp3 {
  stream: Readable;
  duration: number;
}

export interface YoutubeVideoInfo {
  id: string;
  duration: number;
}

export type SearchResult = SearchResultTrack[];

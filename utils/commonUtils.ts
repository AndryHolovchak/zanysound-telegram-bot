import { BasicTrackInfo } from "../types";

export const generateFullTrackName = (track: BasicTrackInfo): string => {
  return `${track.artist} - ${track.title}`;
};

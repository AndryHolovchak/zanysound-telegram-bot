import { BasicTrackInfo } from "./../types/index.d";

export const generateFullTrackName = (track: BasicTrackInfo): string => {
  return `${track.artist} - ${track.title}`;
};

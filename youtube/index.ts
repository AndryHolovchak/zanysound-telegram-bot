import { generateFullTrackName } from "./../utils/commonUtils";
import axios from "axios";
import { BasicTrackInfo, TrackMp3 } from "./../types/index.d";
import ytdl, { getInfo } from "ytdl-core";
import { getFirstVideoIdFromSearchResult } from "./../utils/youtubeUtils";

export const getMp3 = async (track: BasicTrackInfo): Promise<TrackMp3> => {
  const encodedSearchQuery = encodeURIComponent(`${generateFullTrackName(track)} audio`);

  const searchResult = await axios.get(
    `https://www.youtube.com/results?search_query=${encodedSearchQuery}`
  );

  const firstVideoId = getFirstVideoIdFromSearchResult(searchResult.data);

  if (!firstVideoId) {
    throw new Error("Video not found");
  }

  const info = await getInfo(`http://www.youtube.com/watch?v=${firstVideoId}`);
  const durationMS = info.formats.filter((format) => format.itag === 140)[0].approxDurationMs;

  return {
    stream: ytdl(`http://www.youtube.com/watch?v=${firstVideoId}`),
    duration: durationMS ? +durationMS / 1000 : 0,
  };
};

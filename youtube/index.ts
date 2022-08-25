import axios from "axios";
import ytdl from "ytdl-core";
import { durationToSec } from "../utils/timeUtils";
import { generateFullTrackName } from "./../utils/commonUtils";
import { Track, TrackMp3, YoutubeVideoInfo } from "./../types/index.d";

export const getMp3 = async (track: Track): Promise<TrackMp3> => {
  const searchResult = await getYoutubeSearchResult(`${generateFullTrackName(track)} audio`);
  const firstVideo = getFirstVideoFromSearchResult(searchResult.data);

  if (!firstVideo) {
    throw new Error("Video not found");
  }

  const stream = ytdl(`http://www.youtube.com/watch?v=${firstVideo.id}`, {
    filter: formatsFilter,
  });

  return {
    stream,
    duration: firstVideo.duration,
  };
};

const getYoutubeSearchResult = async (query: string): Promise<any> => {
  const encodedSearchQuery = encodeURIComponent(query);
  return axios.get(`https://www.youtube.com/results?search_query=${encodedSearchQuery}`);
};

const getFirstVideoFromSearchResult = (html: string): YoutubeVideoInfo | null => {
  const matchedResponseContext = html.match(/\{\"responseContext\"\:\{.*\;\<\//gm);

  if (!matchedResponseContext) {
    return null;
  }

  const responseContext = matchedResponseContext[0].slice(
    0,
    matchedResponseContext[0].length - 3
  );

  const data = JSON.parse(responseContext);
  const renderInfo =
    data.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer
      .contents[0].itemSectionRenderer.contents[0].videoRenderer;

  const id = renderInfo.videoId;
  const durationText = renderInfo.lengthText.simpleText;

  return {
    id,
    duration: durationToSec(durationText),
  };
};

const formatsFilter = (format: any) => format.itag === 140;

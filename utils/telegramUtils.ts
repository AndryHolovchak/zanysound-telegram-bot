import { generateFullTrackName } from "./commonUtils";
import { Markup } from "telegraf";
import { InlineKeyboardButton } from "telegraf/typings/core/types/typegram";
import { SearchResult } from "../types";

export const generateSearchResultButtons = (data: SearchResult): InlineKeyboardButton[][] => {
  return data.map((item) => [Markup.button.callback(generateFullTrackName(item), item.id)]);
};

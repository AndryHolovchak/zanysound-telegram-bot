import { Markup } from "telegraf";
import { InlineKeyboardMarkup } from "telegraf/typings/core/types/typegram";
import { SearchResult } from "../types";

export const generateSearchResultButtons = (
  data: SearchResult
): Markup.Markup<InlineKeyboardMarkup> => {
  const keyboardData = data.map((item) => [
    Markup.button.callback(`${item.artist} - ${item.title}`, item.id),
  ]);

  return Markup.inlineKeyboard(keyboardData);
};

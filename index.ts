import { generateFullTrackName } from "./utils/commonUtils";
import { generateSearchResultButtons } from "./utils/telegramUtils";
import { getTrackInfo, search } from "./deezer";
import { Telegraf } from "telegraf";
import { getMp3 } from "./youtube";
import express from "express";

// express is needed for Heroku app
const expressApp = express();

expressApp.get("/", (req: any, res: any) => {
  res.send("Hello World!");
});
expressApp.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${process.env.PORT || 3000}`);
});

const bot = new Telegraf("5444904919:AAEYs6gp47Fz34rftcIW3QMBOGzsygPYzkQ");

bot.command("quit", (ctx) => {
  ctx.telegram.leaveChat(ctx.message.chat.id);
  ctx.leaveChat();
});

bot.on("text", async (ctx) => {
  const text = ctx.message.text;

  if (text === "/start") {
    ctx.reply("Введіть трек для пошуку");
    return;
  }

  const searchResult = await search(text, 10);
  const searchResultButtons = generateSearchResultButtons(searchResult);

  ctx.reply(searchResult.length ? "Результат:" : "Нічого не знайдено", {
    reply_markup: {
      inline_keyboard: searchResultButtons,
    },
  });
});

bot.on("callback_query", async (ctx) => {
  if (!ctx.callbackQuery.data) {
    throw new Error("There is no track data");
  }

  const trackInfo = await getTrackInfo(ctx.callbackQuery.data);
  const trackMp3 = await getMp3(trackInfo);

  ctx.replyWithAudio(
    {
      source: trackMp3.stream,
      filename: generateFullTrackName(trackInfo) + ".mp3",
    },
    {
      title: trackInfo.title,
      performer: trackInfo.artist,
      duration: trackMp3.duration,
      thumb: {
        url: trackInfo.cover,
      },
    }
  );
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

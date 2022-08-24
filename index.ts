import { generateSearchResultButtons } from "./utils/telegramUtils";
import { getTrackInfo, search } from "./deezer";
import { Telegraf } from "telegraf";
import { getMp3 } from "./youtube";

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

  ctx.reply(searchResult.length ? text : "Нічого не знайдено", searchResultButtons);
});

bot.on("callback_query", async (ctx) => {
  const trackId = ctx.callbackQuery.data;

  try {
    if (!trackId) {
      throw new Error("There is no track data");
    }

    const trackInfo = await getTrackInfo(trackId);
    const trackMp3 = await getMp3(trackInfo.title, trackInfo.artist);

    ctx.replyWithAudio(
      {
        source: trackMp3.stream,
        filename: `${trackInfo.artist} - ${trackInfo.title}`,
      },
      {
        duration: trackMp3.duration,
        thumb: {
          url: trackInfo.cover,
        },
      }
    );
  } catch (e) {
    console.log(e);
    ctx.reply("Щось пішло не так :(");
  }
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

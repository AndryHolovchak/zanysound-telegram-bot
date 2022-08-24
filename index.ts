import { generateSearchResultButtons } from "./utils/telegramUtils";
import { search } from "./deezer";
import { Telegraf } from "telegraf";

const bot = new Telegraf("5444904919:AAEYs6gp47Fz34rftcIW3QMBOGzsygPYzkQ");

bot.command("quit", (ctx) => {
  // Explicit usage
  ctx.telegram.leaveChat(ctx.message.chat.id);

  // Using context shortcut
  ctx.leaveChat();
});

bot.on("text", async (ctx) => {
  const text = ctx.message.text;

  const searchResult = await search(text, 10);
  const searchResultButtons = generateSearchResultButtons(searchResult);

  ctx.reply(text, searchResultButtons);
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

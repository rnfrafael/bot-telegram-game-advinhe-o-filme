import { bot } from "./bot";
bot.api.setMyCommands([
  { command: "qualfilme", description: "a" },
  { command: "sum", description: "a" },
]);

bot.start({
  onStart(botInfo) {
    console.log(new Date(), "Bot starts as", botInfo.username);
  },
});

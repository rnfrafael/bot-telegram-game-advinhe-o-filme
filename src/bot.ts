import { Bot, session } from "grammy";
import { conversations, createConversation } from "@grammyjs/conversations";
import { MyContext } from "./types";

//.env + token + inicialização bot
import * as dotEnv from "dotenv";
dotEnv.config();
const token = process.env.BOT_TOKEN || "SEMTOKEN";
export const bot = new Bot<MyContext>(token);

//conversations
import { sum, qualFilme } from "./bot/conversations";
bot.use(session({ initial: () => ({}) }));
bot.use(conversations());
bot.use(createConversation(qualFilme));
bot.use(createConversation(sum));

bot.command("start", async (ctx) => {
  // enter the function "greeting" you declared
  await ctx.conversation.enter("sum");
});

bot.command("qualfilme", async (ctx) => {
  await ctx.conversation.enter("qualFilme");
});

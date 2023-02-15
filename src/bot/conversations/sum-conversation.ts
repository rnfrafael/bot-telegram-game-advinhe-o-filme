import { MyContext, MyConversation } from "../../types";

export async function sum(conv: MyConversation, ctx: MyContext) {
  await ctx.reply("Digite um número");
  const numero = await conv.form.number();
  await ctx.reply("Digite um segundo numero");
  const numero2 = await conv.form.number();
  await ctx.reply(`A soma é: ${numero + numero2}`);
}

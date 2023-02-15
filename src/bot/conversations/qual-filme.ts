import { GameController, MoviesController } from "../../controllers/";
import { Movies } from "../../models/Movies";
import { MyContext, MyConversation } from "../../types";

// export async function qualFilme(conv: MyConversation, ctx: MyContext) {
//   await ctx.reply("Digite um ano que deseja buscar um filme.");
//   const year = await conv.form.number();
//   await ctx.reply("Opa, bora ver se vocês adivinham qual filme que é.");
//   const movie = await fetch(`http://localhost:3010/ano/${year}`, {
//     method: "GET",
//   });
//   await ctx.reply(JSON.stringify(movie));
// }

export async function qualFilme(conv: MyConversation, ctx: MyContext) {
  // await ctx.reply("Digite um ano que deseja buscar um filme.");
  // const year = await conv.form.number();
  await ctx.reply("Opa, bora ver se vocês adivinham qual filme que é.");
  const movie: Movies = await conv.external(async () => {
    return await fetch(`http://localhost:3010/movie`, {
      method: "GET",
    }).then((d) => d.json());
  });
  conv.log(movie);
  const dicas: string[] = [];

  await ctx.reply("Beleza, vou dar uma dica.");
  let dica: string = await conv.external(async () => {
    return GameController.pegaDica(movie);
  });
  dicas.push(dica);
  await ctx.reply(dica);
  await ctx.reply("Qual seu chute?");
  let chute = await conv.form.text();
  chute = chute.replace("/qualfilme@mg_rnf_bot", "");
  let ganhou =
    movie.movieName.trim().toLowerCase() === chute.trim().toLowerCase()
      ? true
      : false;
  conv.log("Chute: ", chute, "  Movie Name: ", movie.movieName);

  if (ganhou) {
    await ctx.reply("Ganhou");
    await ctx.replyWithPhoto(movie.imageUrl);
    return;
  }
  movie.movieName.trim().toLowerCase().includes(chute.trim().toLowerCase())
    ? ctx.reply("Não acertou completamente, mas foi quase")
    : ctx.reply("Não acertou, vamos tentar novamente");
  let i = 0;

  while (true) {
    dica = await conv.external(async () => {
      return GameController.pegaDica(movie);
    });
    i = 0;
    // conv.log(dicas.includes(dica));
    while (dicas.includes(dica)) {
      i++;
      if (dicas.length + 2 === Object.keys(movie).length) {
        console.log(
          "if pra saber se a quantidade de dicas é == quantidade de keys"
        );
        await ctx.reply("Não conseguiu adivinhar e acabaram as dicas");
        await ctx.reply(`O Filme era: ${movie.movieName}`);
        await ctx.replyWithPhoto(movie.imageUrl);
        return false;
      }
      dica = await conv.external(async () => {
        return GameController.pegaDica(movie);
      });
      if (i > 100) {
        ctx.reply("Erro no código");
        return "erro";
      }
    }

    i = 0;
    await ctx.reply("A nova dica é");
    await ctx.reply(dica);
    dicas.push(dica);

    await ctx.reply("Qual seu novo chute?");
    chute = await conv.form.text();
    chute = chute.replace("/qualfilme@mg_rnf_bot", "");
    ganhou =
      movie.movieName.trim().toLowerCase() === chute.trim().toLowerCase()
        ? true
        : false;
    conv.log("Chute:", chute, "  Movie Name:", movie.movieName);
    if (ganhou) {
      await ctx.reply("Ganhou");
      await ctx.replyWithPhoto(movie.imageUrl);
      return;
    }
    conv.log(movie.movieName.trim().toLowerCase());
    conv.log(chute.trim().toLowerCase());
    conv.log(
      movie.movieName.trim().toLowerCase().includes(chute.trim().toLowerCase())
    );
    movie.movieName.trim().toLowerCase().includes(chute.trim().toLowerCase())
      ? ctx.reply("Não acertou completamente, mas foi quase")
      : ctx.reply("Não acertou, vamos tentar novamente");
  }

  // jaFoi.push(dica);
  // await ctx.reply(dica);
  // dicasQuantidade = 0;
}

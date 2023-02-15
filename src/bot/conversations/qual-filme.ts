import {
  GameController,
  IMDBController,
  MoviesController,
} from "../../controllers/";
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
  const movie: Movies = (await conv.external(async () => {
    return IMDBController.getRandomMovieFromTop250();
  })) as Movies;
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
  let ganhou = GameController.acertouOFilme(movie, chute);
  conv.log("Chute: ", chute, "  Movie Name: ", movie.movieName);
  if (ganhou) {
    await ctx.reply("Ganhou");
    await ctx.replyWithPhoto(movie.imageUrl);
    return;
  }
  await ctx.reply(GameController.acertouAlgumaParteDoNome(movie, chute));
  while (true) {
    // Pega uma dica aqui
    dica = await conv.external(async () => {
      return GameController.pegaDica(movie);
    });
    //uma variavel para impedir loop infinito no segundo while
    let impedirLoopInfinito = 0;
    // Testa se a dica que foi pegue acima já existe no Vetor com dicas
    while (dicas.includes(dica)) {
      //Se existir a dica entra no loop e já testa se a quantidade de dicas é a mesma de possíveis dicas >> +2(para não pegar os dados da posição [0] = id [1] = nome [2] = imagem)
      if (dicas.length + 2 === Object.keys(movie).length) {
        //se as dicas acabaram e não adivinhou termina o jogo
        await ctx.reply("Não conseguiu adivinhar e acabaram as dicas");
        await ctx.reply(`O Filme era: ${movie.movieName}`);
        await ctx.replyWithPhoto(movie.imageUrl);
        return false;
      }
      //caso ainda tenham dicas pega uma outra dica e testa novamente se essa nova dica tá dentro de dicas[]

      dica = await conv.external(async () => {
        return GameController.pegaDica(movie);
      });
      impedirLoopInfinito++;
      if (impedirLoopInfinito > 100) {
        //para impedir um possível loop infinito
        ctx.reply("Erro no código");
        return "erro";
      }
    }
    // Se passar pelo loop de teste se a dica já foi passada continua aqui
    await ctx.reply("A nova dica é");
    await ctx.reply(dica);
    //coloca a dica no vetor dicas para futuros testes
    dicas.push(dica);
    //pede um novo chute
    await ctx.reply("Qual seu novo chute?");
    chute = await conv.form.text();
    //Caso seja mensagem do grupo retira a string inicial
    chute = chute.replace("/qualfilme@mg_rnf_bot", "");
    //testa o chute
    ganhou = GameController.acertouOFilme(movie, chute);
    conv.log("Chute:", chute, "  Movie Name:", movie.movieName);
    if (ganhou) {
      await ctx.reply("Ganhou");
      await ctx.replyWithPhoto(movie.imageUrl);
      return;
    }
    //testa se acertou parcialmente
    await ctx.reply(GameController.acertouAlgumaParteDoNome(movie, chute));
  }

  // jaFoi.push(dica);
  // await ctx.reply(dica);
  // dicasQuantidade = 0;
}

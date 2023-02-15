//Fastify init
import cors from "@fastify/cors";
import { routesImdb } from "./routes/IMDB";
import fastify from "fastify";
const app = fastify();
const port = Number(process.env.PORT) || 3010;
app.register(routesImdb);
app.register(cors, { origin: "*" });
app.listen({ port }).then(() => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

import { bot } from "./bot";
bot.api.setMyCommands([
  { command: "qualfilme", description: "a" },
  { command: "sum", description: "a" },
]);
// bot.api.setMyCommands([
//   { command: "start", description: "Inicia o bot" },
//   {
//     command: "future",
//     description: "Abre uma ordem futura - Apenas essa funciona no momento",
//   },
//   { command: "teste", description: "testa bot" },
// ]);
bot.start({
  onStart(botInfo) {
    console.log(new Date(), "Bot starts as", botInfo.username);
  },
});

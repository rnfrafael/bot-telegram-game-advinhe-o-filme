import { FastifyInstance } from "fastify";
import IMDBController from "../controllers/IMDBController";
import { z } from "zod";

export async function routesImdb(app: FastifyInstance) {
  //Pegar filme aleatório
  app.get("/ano/:year", async (req, res) => {
    console.log(req.params);
    const schema = z.object({ year: z.union([z.string(), z.number()]) });
    const { year } = schema.parse(req.params);
    const movie = await IMDBController.getRandomMovieFromYear(year);
    res.status(200);
    return movie;
  });
  app.get("/movie", async (req, res) => {
    const movie = await IMDBController.getRandomMovieFromTop250();
    res.status(200);
    return movie;
  });
}

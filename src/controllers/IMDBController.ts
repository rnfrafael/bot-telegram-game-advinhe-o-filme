import { MoviesListType } from "../types/IMDBController";
import { Movies } from "../models/Movies";
import * as dotEnv from "dotenv";
dotEnv.config();
const apiKey = process.env.API_KEY;

class IMDBController {
  /*private app;
  constructor(app: FastifyInstance) {
    this.app = app;
  }*/

  //Pegar filme aleatório
  static async getRandomMovieFromYear(
    yearRoute: string | number = 1999
  ): Promise<Movies | void> {
    try {
      const data = await fetch(
        `https://imdb-api.com/en/API/SearchMovie/${apiKey}/${yearRoute}`
      );
      const moviesList = await data.json();
      const movieFromImdb: MoviesListType =
        moviesList.results[
          Math.floor(Math.random() * moviesList.results.length)
        ];
      const {
        id,
        title,
        actors,
        year,
        plot,
        image,
        genero,
        runtime,
        directors,
      } = await fetch(
        `https://imdb-api.tprojects.workers.dev/title/${movieFromImdb.id}`
      ).then((d) => d.json());
      const movie = new Movies(
        id,
        title,
        actors,
        year,
        plot,
        image,
        genero,
        runtime,
        directors
      );
      // console.log(movie);
      return movie;
    } catch (e) {
      console.log(e);
    }
  }
  static async getRandomMovieFromTop250(): Promise<Movies | void> {
    try {
      const data = await fetch(
        `https://imdb-api.com/en/API/Top250Movies/${apiKey}`
      );
      const moviesList = await data.json();
      const movieFromImdb: MoviesListType =
        moviesList.items[Math.floor(Math.random() * moviesList.items.length)];
      const {
        id,
        title,
        image,

        actors,
        year,
        plot,
        genero,
        runtime,
        directors,
      } = await fetch(
        `https://imdb-api.tprojects.workers.dev/title/${movieFromImdb.id}`
      ).then((d) => d.json());
      const movie = new Movies(
        id,
        title,
        image,

        actors,
        year,
        plot,
        genero,
        runtime,
        directors
      );
      // console.log(movie);
      return movie;
    } catch (e) {
      console.log(e);
    }
  }
}

export default IMDBController;

import { Movies } from "../models/Movies";

class GameController {
  static acertouOFilme(movie: Movies, chute: string): boolean {
    if (chute === movie.movieName) {
      return true;
    }
    return false;
  }

  static pegaDica(movie: Movies): string {
    //Pega Quantidade de chaves do objeto movi
    const keys = Object.keys(movie);
    const k = Math.floor(Math.random() * (keys.length - 4 + 1)) + 3;
    let chave: string | undefined;
    // console.log("pega dica chaves e numero");
    // console.log(keys);
    // console.log(k);
    // console.log(keys[k]);
    switch (keys[k]) {
      case "actorsFromMovie":
        chave = "Atores do Filme";
        break;
      case "year":
        chave = "Ano de Lançamento";
        break;
      case "plot":
        chave = "Resumo do Filme";
        break;
      case "runtime":
        chave = "Tempo de Duração";
        break;
      case "directors":
        chave = "Diretores";
        break;
    }
    try {
      let dicaInicial = movie[keys[k] as keyof Movies];
      if (Array.isArray(dicaInicial)) {
        return (
          chave +
          ": " +
          dicaInicial[Math.floor(Math.random() * dicaInicial.length)]
        );
      }
      return chave + ": " + dicaInicial;
    } catch (error) {
      console.log(error);
      return "Erro";
    }
  }
}

export default GameController;

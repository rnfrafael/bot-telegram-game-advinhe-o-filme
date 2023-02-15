import { Movies } from "../models/Movies";

class GameController {
  static acertouOFilme(movie: Movies, chute: string): boolean {
    if (movie.movieName.trim().toLowerCase() === chute.trim().toLowerCase()) {
      return true;
    }
    return false;
  }
  static acertouAlgumaParteDoNome(movie: Movies, chute: string): string {
    if (
      movie.movieName.trim().toLowerCase().includes(chute.trim().toLowerCase())
    ) {
      return "Não acertou completamente, mas foi quase";
    }

    return "Não acertou, vamos tentar novamente";
  }

  static pegaDica(movie: Movies): string {
    //Pega Quantidade de chaves do objeto movi
    const keys = Object.keys(movie);
    const k = Math.floor(Math.random() * (keys.length - 4 + 1)) + 3;
    let chave: string | undefined;

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

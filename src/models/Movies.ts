// interface typeMovies {
//    id: string;
//    movieName: string;
//    actorsFromMovie: string[];
//    year: string | number;
//    plot: string;
//    imageUrl: string;
//    genero: string[];
//    runtime: string;
//    directors: string[];
// }

export class Movies {
  constructor(
    public id: string,
    public movieName: string,
    public imageUrl: string,
    private actorsFromMovie: string[],
    private year: string | number,
    private plot: string,
    private genre: string[],
    private runtime: string,
    private directors: string[]
  ) {}
}
/**
  {
  "id": "tt0207943",
  "review_api_path": "/reviews/tt0207943",
  "imdb": "https://www.imdb.com/title/tt0207943",
  "contentType": "Movie",
  "title": "1999 Madeleine",
  "image": "https://m.media-amazon.com/images/M/MV5BMDU0N2Q2NjEtZDRjMC00MmQ5LTgwYTQtMWQ4ZjQxNzYzOTQwXkEyXkFqcGdeQXVyMjUyMjUzMw@@._V1_.jpg",
  "plot": "35 years old Madeleine lives in confused solitude, haunted by her habits. She seeks a man to share her life.",
  "rating": {
    "count": 172,
    "star": 5.8
  },
  "genre": [
    "Comedy",
    "Romance"
  ],
  "year": "1999",
  "runtime": "1h 26m",
  "actors": [
    "Véra Briole",
    "Manuel Blanc",
    "Anouk Aimée"
  ],
  "directors": [
    "Laurent Bouhnik"
  ],
  "top_credits": [
    {
      "name": "Director",
      "value": [
        "Laurent Bouhnik"
      ]
    },
    {
      "name": "Writer",
      "value": [
        "Laurent Bouhnik"
      ]
    },
    {
      "name": "Stars",
      "value": [
        "Véra Briole",
        "Manuel Blanc",
        "Anouk Aimée"
      ]
    }
  ]
}
 */

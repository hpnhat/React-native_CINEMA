export type Film = {
  id: string;
  title: string;
  year: number;
  genre: string[];
  uri: string;
};
const filmDataNowShowing: Film[] = [
  {
    id: "1",
    title: "The Shawshank Redemption",
    year: 1994,
    genre: ["Crime", "Drama"],
    uri: "https://i.pinimg.com/736x/72/0f/fe/720ffe97f64c48e9e4e8244e087273fd.jpg",
  },
  {
    id: "2",
    title: "The Godfather Redemption",
    year: 1972,
    genre: ["Crime", "Drama"],
    uri: "https://i.pinimg.com/736x/72/0f/fe/720ffe97f64c48e9e4e8244e087273fd.jpg",
  },
  {
    id: "3",
    title: "The Dark Knight",
    year: 2008,
    genre: ["Crime", "Drama"],
    uri: "https://i.pinimg.com/736x/72/0f/fe/720ffe97f64c48e9e4e8244e087273fd.jpg",
  },
  {
    id: "4",
    title: "The Dark Knight 1",
    year: 2008,
    genre: ["Crime", "Drama"],
    uri: "https://i.pinimg.com/736x/72/0f/fe/720ffe97f64c48e9e4e8244e087273fd.jpg",
  },
];

const filmDataComingSoon: Film[] = [
  {
    id: "4",
    title: "Avengers: Endgame",
    year: 2019,
    genre: ["Action", "Sci-Fi"],
    uri: "https://m.media-amazon.com/images/M/MV5BMDg2YzI0ODctYjliMy00NTU0LTkxODYtYTNkNjQwMzVmOTcxXkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_FMjpg_UX1000_.jpg",
  },
  {
    id: "5",
    title: "Inception",
    year: 2010,
    genre: ["Action", "Adventure"],
    uri: "https://m.media-amazon.com/images/M/MV5BMDg2YzI0ODctYjliMy00NTU0LTkxODYtYTNkNjQwMzVmOTcxXkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_FMjpg_UX1000_.jpg",
  },
];

const filmData: Film[] = [
  {
    id: "1",
    title: "The Shawshank Redemption Version 2017",
    year: 1994,
    genre: ["Crime", "Drama"],

    uri: "https://m.media-amazon.com/images/M/MV5BMDg2YzI0ODctYjliMy00NTU0LTkxODYtYTNkNjQwMzVmOTcxXkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_FMjpg_UX1000_.jpg",
  },
  {
    id: "2",
    title: "The Godfather Redemption",
    year: 1972,
    genre: ["Crime", "Drama"],
    uri: "https://m.media-amazon.com/images/M/MV5BMDg2YzI0ODctYjliMy00NTU0LTkxODYtYTNkNjQwMzVmOTcxXkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_FMjpg_UX1000_.jpg",
  },
  {
    id: "3",
    title: "The Dark Knight",
    year: 2008,
    genre: ["Crime", "Drama"],
    uri: "https://m.media-amazon.com/images/M/MV5BMDg2YzI0ODctYjliMy00NTU0LTkxODYtYTNkNjQwMzVmOTcxXkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_FMjpg_UX1000_.jpg",
  },
];
export { filmDataComingSoon, filmData, filmDataNowShowing };

export class FullFilm {
    private actors: string;
    private awards: string;
    private boxOffice: string;
    private country: string;
    private dvd: string;
    private director: string;
    private genre: string;
    private language: string;
    private metascore: string;
    private plot: string;
    private poster: string;
    private production: string;
    private rated: string;
    private ratings: string[];
    private released: string;
    private response: string;
    private runtime: string;
    private title: string;
    private type: string;
    private website: string;
    private writer: string;
    private year: string;
    private imdbID: string;
    private imdbRating: string;
    private imdbVotes: string;
    
    constructor(Actors: string,
                Awards: string,
                BoxOffice: string,
                Country: string,
                DVD: string,
                Director: string,
                Genre: string,
                Language: string,
                Metascore: string,
                Plot: string,
                Poster: string,
                Production: string,
                Rated: string,
                Ratings: string[],
                Released: string,
                Response: string,
                Runtime: string,
                Title: string,
                Type: string,
                Website: string,
                Writer: string,
                Year: string,
                imdbID: string,
                imdbRating: string,
                imdbVotes: string,
    ) {
        this.actors = Actors;
        this.awards = Awards;
        this.boxOffice = BoxOffice;
        this.country = Country;
        this.dvd = DVD;
        this.director = Director;
        this.genre = Genre;
        this.language = Language;
        this.metascore = Metascore;
        this.plot = Plot;
        this.poster = Poster;
        this.production = Production;
        this.rated = Rated;
        this.ratings = Ratings;
        this.response = Response;
        this.released = Released;
        this.runtime = Runtime;
        this.title = Title;
        this.type = Type;
        this.website = Website;
        this.writer = Writer;
        this.year = Year;
        this.imdbID = imdbID;
        this.imdbRating = imdbRating;
        this.imdbVotes = imdbVotes;
    }
};








export class SearchFilm {
    private title: string;
    private year: string;
    private imdbID: string;
    private type: string;
    private poster: string;
    constructor(Title:string, Year:string, imdbID:string, Type:string, Poster:string) {
        this.title = Title;
        this.year = Year;
        this.imdbID = imdbID;
        this.type = Type;
        this.poster = Title;
    }
};








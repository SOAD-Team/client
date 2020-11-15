import React, { Component } from "react";
import { DotLoader } from "react-spinners";
import { Button, Jumbotron, Table } from "reactstrap";
import { Genre } from "../../../models/genre";
import { Language } from "../../../models/language";
import { MovieData } from "../../../models/movie-data";
import { Style } from "../../../models/style";
import { User } from "../../../models/user";
import { MovieService } from "../../../services/movieService";
import { IData } from "../../shared/IData";

interface IValue {
    value: IData[], loading: boolean
}
export default class MovieUpdaterList extends Component {

    state: IValue;

    constructor(props) {
        super(props);

        this.state = {
            value: [],
            loading: true,
        };

        this.editMovieInfo = this.editMovieInfo.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    async loadData() {
        const data: IData[] = [];
        const movies: MovieData[] = (await MovieService.getMoviesFromUser(User.local.idUser)).data;

        for (const movie of movies) {
            const score: number = (await MovieService.getMovieScore(movie.idMovie)).data;
            const popularity: number = (await MovieService.getMoviePopularity(movie.idMovie)).data;
            //get image
            const temp: IData = {
                value: movie,
                score: score,
                popularity: popularity
            }
            data.push(temp);
        }

        this.setState({ ...this.state, value: data, loading: false });
    }

    editMovieInfo(e, movie): any {
        console.log(movie);
        
    }

    render() {
        let contents: any = this.state.loading
            ? <div style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)'
            }}>
                <DotLoader size={100} loading={this.state.loading} />
            </div>
            : this.renderTable();
        return (
            <div>
                {contents}
            </div>
        )
    }

    renderTable() {
        return (
            <div>
                <h1>
                    My Movies
                </h1>
                <Jumbotron>
                    <Table responsive size='sm'>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Year</th>
                                <th>Director</th>
                                <th>Genres</th>
                                <th>Languages</th>
                                <th>Style</th>
                                <th>Is Platform Favorite?</th>
                                <th>Score</th>
                                <th>Popularity</th>
                                <th>Meta Score</th>
                                <th>IMDB</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.value.map((movie: IData) =>

                                <tr key={movie.value.idMovie} >
                                    <td>{movie.value.name}</td>
                                    <td>{movie.value.year}</td>
                                    <td>{movie.value.director}</td>
                                    <td>
                                        {movie.value.genres.map((genre: Genre) => <>{
                                            genre == null ?
                                                <> </> :
                                                <li key={genre.idGenre}>
                                                    {genre.name}
                                                </li>
                                        }</>
                                        )}
                                    </td>
                                    <td>
                                        {movie.value.languages.map((lang: Language) => <>{
                                            lang == null ?
                                                <> </> :
                                                <li key={lang.idLanguage}>
                                                    {lang.name}
                                                </li>
                                        }</>
                                        )}
                                    </td>
                                    <td>
                                        {movie.value.styles.map((sty: Style) => <>{
                                            sty == null ?
                                                <> </> :
                                                <li key={sty.idStyle}>
                                                    {sty.name}
                                                </li>
                                        }</>)}
                                    </td>
                                    <td>{
                                        movie.value.platFav ?
                                            <div>
                                                {"Yes"}
                                            </div> :
                                            <div>
                                                {"No"}
                                            </div>
                                    }</td>
                                    <td>{movie.score}</td>
                                    <td>{movie.popularity}</td>
                                    <td>{movie.value.metaScore}</td>
                                    <td>{movie.value.imdb}</td>
                                    <td>
                                        <Button href={`movieupdate/${movie.value.idMovie}`} onClick={e => this.editMovieInfo(e, movie.value)}>Edit</Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Jumbotron>
            </div>
        );
    }
}
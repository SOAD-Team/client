import React, { Component } from "react";
import { DotLoader } from "react-spinners";
import { Button, Jumbotron, Table } from "reactstrap";
import { Genre } from "../../../models/genre";
import { Language } from "../../../models/language";
import { Movie } from "../../../models/movie";
import { Style } from "../../../models/style";
import { User } from "../../../models/user";
import { MovieService } from "../../../services/movieService";
import { NavMenu } from "../../core/navMenu/NavMenu";

interface IValue {
    value: Movie[], loading: boolean
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
        const movies: Movie[] = (await MovieService.Singleton().getFromUser(User.local.idUser)).data;
        this.setState({ ...this.state, value: movies, loading: false });
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
                <NavMenu/>
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
                            {this.state.value.map((movie: Movie) =>

                                <tr key={movie.idMovie} >
                                    <td>{movie.name}</td>
                                    <td>{movie.year}</td>
                                    <td>{movie.director}</td>
                                    <td>
                                        {movie.genres.map((genre: Genre) => <>{
                                            genre == null ?
                                                <> </> :
                                                <li key={genre.id}>
                                                    {genre.name}
                                                </li>
                                        }</>
                                        )}
                                    </td>
                                    <td>
                                        {movie.languages.map((lang: Language) => <>{
                                            lang == null ?
                                                <> </> :
                                                <li key={lang.id}>
                                                    {lang.name}
                                                </li>
                                        }</>
                                        )}
                                    </td>
                                    <td>
                                        {movie.styles.map((sty: Style) => <>{
                                            sty == null ?
                                                <> </> :
                                                <li key={sty.id}>
                                                    {sty.name}
                                                </li>
                                        }</>)}
                                    </td>
                                    <td>{
                                        movie.platFav ?
                                            <div>
                                                {"Yes"}
                                            </div> :
                                            <div>
                                                {"No"}
                                            </div>
                                    }</td>
                                    <td>{movie.communityScore}</td>
                                    <td>{movie.popularity}</td>
                                    <td>{movie.metaScore}</td>
                                    <td>{movie.imdb}</td>
                                    <td>
                                        <Button href={`movieupdate/${movie.idMovie}`} onClick={e => this.editMovieInfo(e, movie)}>Edit</Button>
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
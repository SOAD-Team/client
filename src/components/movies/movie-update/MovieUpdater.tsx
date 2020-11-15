import React, { Component } from "react";
import { DotLoader } from "react-spinners";
import { Jumbotron, Table } from "reactstrap";
import { Genre } from "../../../models/genre";
import { Language } from "../../../models/language";
import { MovieData } from "../../../models/movie-data";
import { Style } from "../../../models/style";
import { User } from "../../../models/user";
import { MovieService } from "../../../services/movieService";
import { IData } from "../../shared/IData";
import { NavMenu } from '../../core/navMenu/NavMenu';

interface IValue {
    value: IData[], loading: boolean
}
export default class MovieUpdater extends Component {

    state: IValue;

    constructor(props) {
        super(props);

        this.state = {
            value: [],
            loading: true,
        };
    }

    componentDidMount() {
        this.loadData();
    }

    async loadData() {
        const data: IData[] = [];
        const movies: MovieData[] = (await MovieService.getMoviesFromUser(User.local.idUser)).data;
        
        for(const movie of movies){
            const score: number = (await MovieService.getMovieScore(movie.idMovie)).data; 
            const popularity : number = (await MovieService.getMoviePopularity(movie.idMovie)).data;
            //get image
            const temp: IData = {
                value: movie,
                score: score,
                popularity: popularity
            }
            data.push(temp);
        }

        console.log(data);
        
        this.setState({ ...this.state, value: movies, loading: false });
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
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.value.map((data: IData) =>
                                <tr key={data.value.idMovie}>
                                    <td>{data.value.name}</td>
                                    <td>{data.value.year}</td>
                                    <td>{data.value.director}</td>
                                    <td>
                                    {data.value.genres.map((genre: Genre) =>
                                        genre.name
                                    )}
                                    </td>
                                    <td>
                                    {data.value.languages.map((lang: Language) =>
                                        lang.name
                                    )}
                                    </td>
                                    <td>
                                    {data.value.styles.map((sty: Style) =>
                                        sty.name
                                    )}
                                    </td>
                                    <td>{data.value.platFav}</td>
                                    <td>{data.score}</td>
                                    <td>{data.popularity}</td>
                                    <td>{data.value.metaScore}</td>
                                    <td>{data.value.imdb}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Jumbotron>
            </div>
        );
    }
}
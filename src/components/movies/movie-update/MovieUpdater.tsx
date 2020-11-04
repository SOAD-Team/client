import React, { Component } from "react";
import { DotLoader } from "react-spinners";
import { MovieData } from "../../../models/movie-data";

interface IValue {
    value: MovieData[], loading: boolean
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

    }

    render() {
        let contents: any = this.state.loading
            ? <div style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)'
              }}>
                <DotLoader size={100} loading={this.state.loading}/>
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
            <h1>
                Hello
            </h1>
        );
    }
}
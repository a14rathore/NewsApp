import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './spinner';
import PropTypes from 'prop-types'


export default class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general',
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    constructor() {
        super();
        // console.log("heloo I am a constructor from News Component");
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
    }
    //  life cycle method
    // work after render done
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=48a751e7e6674cbfa34c69b0ac268218&page=${this.state.page - 1}&pageSize=20`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            articles: parseData.articles,
            totalResults: parseData.totalResults,
            loading: false
        })
    }

    handleprevious = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=48a751e7e6674cbfa34c69b0ac268218&page=${this.state.page - 1}&pageSize=20`;
        this.setState({ loading: true });
        let data = await fetch(url);
        
        let parseData = await data.json();
         console.log(parseData);
        // console.log(data);
        this.setState({
            articles: parseData.articles,
            page: this.state.page - 1,
            loading: false
        })

    }

    handleNext = async () => {
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {

        } else {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=48a751e7e6674cbfa34c69b0ac268218&page=${this.state.page + 1}&pageSize=20`;
            this.setState({ loading: true });
            let data = await fetch(url);
            let parseData = await data.json();
            this.setState({
                articles: parseData.articles,
                page: this.state.page + 1,
                loading: false
            })

        }

    }
    render() {
        return (
            <div className="container my-3">
                <h2 className="text-center">News-GA top Headlines</h2>
                {this.state.loading && < Spinner />}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4 my-2" key={element.url}>
                            <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description.slice(0, 88) : ""}
                                imageUrl={element.urlToImage}
                                author={element.author}
                                date={element.publishedAt}
                                newsUrl={element.url} />
                        </div>
                    })}

                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark btn-lg" onClick={this.handleprevious}> &larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 20)} type="button" className="btn btn-dark btn-lg" onClick={this.handleNext}>Next &rarr;</button>
                </div>

            </div>
        );
    }
}

import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Loading from './Loading';
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {

    constructor() {
        super();
        // console.log('Constructor Called');
        this.state = {
            newsArticles: [],
            loading: true,
            page: 1,
        }
    }

    getNewsFrmApi = async () => {
        this.props.progress(10)
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=96a3d0a7dc5b46ba9959f3f161623adc&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.props.progress(40)
        let data = await fetch(url);
        let topNews = await data.json();
        this.props.progress(70)
        this.setState({
            totalResults: topNews.totalResults,
            newsArticles: topNews.articles,
            loading: false,
        })
        this.props.progress(100)
        // console.log(this.state.totalResults);
    }

    async componentDidMount() {
        this.getNewsFrmApi();
    }

    // goToNextPage = () => {
    //     let pageIncreMent = this.state.page + 1;
    //     this.setState({ page: pageIncreMent });
    //     this.getNewsFrmApi(pageIncreMent);
    // }

    // goToPreviousPage = async () => {
    //     let pageDecreMent = this.state.page - 1;
    //     this.setState({ page: pageDecreMent });
    //     await this.getNewsFrmApi(pageDecreMent);
    // }

    fetchData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=96a3d0a7dc5b46ba9959f3f161623adc&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let topNews = await data.json();
        this.setState({
            newsArticles: this.state.newsArticles.concat(topNews.articles),
            // totalResults: topNews.totalResults,
            page: this.state.page + 1,
        })
    }

    captalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }


    render() {
        // let { pageSize } = this.props;
        // console.log("render called")
        return (
            <div className="container">
                <div className="h2 my-4 text-center">{`News - Top ${this.captalize(this.props.category)} Headlines`}</div>
                {this.state.loading && <Loading />}


                <div className="row">
                    {this.state.newsArticles.map((Element) => {
                        return <div className="col-md-4" key={Element.url}>
                            <Newsitem title={Element.title} date={Element.publishedAt} author={Element.author}
                                source={Element.source.name} newsUrl={Element.url} imageUrl={Element.urlToImage} description={Element.description} />
                        </div>
                    })}
                </div>


                <InfiniteScroll
                    dataLength={this.state.newsArticles.length}
                    next={this.fetchData}
                    hasMore={this.state.newsArticles.length !== this.state.totalResults}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>}>
                </InfiniteScroll>
                {/* <button disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.goToPreviousPage}>&laquo; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.goToNextPage}>Next &raquo;</button> */}
            </div>

        )
    }
}



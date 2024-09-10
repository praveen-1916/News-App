import React, { useState, useEffect } from 'react'
import Newsitem from './Newsitem'
import Loading from './Loading';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function News(props) {


    const [newsArticles, setNewsArticles] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        getNewsFrmApi();
    }, [])



    const getNewsFrmApi = async () => {
        props.progress(10)
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=abb3b438d0234f468175eaff3a116280&page=${page}&pageSize=${props.pageSize}`;
        props.progress(40)
        let data = await fetch(url);
        let topNews = await data.json();
        props.progress(70)
        setNewsArticles(topNews.articles);
        setTotalResults(topNews.totalResults);
        setLoading(false)
        props.progress(100)
    }


    // goToNextPage = () => {
    //     let pageIncreMent = page + 1;
    //             setPage(page+1);
    //     getNewsFrmApi(pageIncreMent);
    // }

    // goToPreviousPage = async () => {
    //     let pageDecreMent = page - 1;
    //             setPage(page-1);
    //     getNewsFrmApi(pageDecreMent);
    // }

    const fetchData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=${props.category}&apiKey=abb3b438d0234f468175eaff3a116280&page=${page + 1}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let topNews = await data.json();
        setNewsArticles(newsArticles.concat(topNews.articles));
        setPage(page + 1);

    }

    const captalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }


    return (
        <div className="container">
            <div className="h2 my-4 text-center">{`News - Top ${captalize(props.category)} Headlines`}</div>
            {loading && <Loading />}
            <div className="row">
                {newsArticles.map((Element) => {
                    return <div className="col-md-4" key={Element.url}>
                        <Newsitem title={Element.title} date={Element.publishedAt} author={Element.author}
                            source={Element.source.name} newsUrl={Element.url} imageUrl={Element.urlToImage} description={Element.description} />
                    </div>
                })}
            </div>


            <InfiniteScroll
                dataLength={newsArticles.length}
                next={fetchData}
                hasMore={newsArticles.length !== totalResults}
                loader={<Loading />}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>}>
            </InfiniteScroll>
            {/* <button disabled={page <= 1} className="btn btn-dark" onClick={goToPreviousPage}>&laquo; Previous</button>
                    <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} className="btn btn-dark" onClick={goToNextPage}>Next &raquo;</button> */}
        </div>

    )

}



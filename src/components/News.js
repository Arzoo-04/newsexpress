import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinnner from './Spinnner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=> {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  const updateNews = async () =>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(40);
    let parsedData = await data.json();
    props.setProgress(70);
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    
    props.setProgress(100);
  };

  useEffect(()=>{
    document.title = `NewsExpress - ${capitalize(props.category)}`;
    updateNews();
  }, []);

  const fetchMoreData = async () => {  
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=e7afcb1f64594e2996ee2d3aa601d9f4&page=${page+1}&pagesize=${props.pageSize}`;
    setPage(page + 1);
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json()

    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoading(false);
  };
  
    return (
      <div className='container my-5'>
        <h1 className='text-center' style={{ marginTop: '85px' }}>NewsExpress- Top Headlines on {capitalize(props.category)}</h1>
        {loading && <Spinnner/>}
        
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={loading && <Spinnner/>}
        >
          <div className='container'>
          <div className="row my-3">
            {articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
              </div>
            })}
          </div>
          </div>
        </InfiniteScroll>
      </div>
    )
  }

News.defaultProps = {
  country: 'in',
  pageSize: 6,
  category: 'general'
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}
export default News

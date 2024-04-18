import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinnner from './Spinnner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults:0
    }
    document.title = `NewsExpress - ${this.capitalize(this.props.category)}`;
  }
  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(40);
    let parseData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parseData.articles, 
      totalResults: parseData.totalResults,
      loading: false 
    })
    this.props.setProgress(100);
  };
  async componentDidMount() {
    this.updateNews();
  };

  // handleNextClick = async () => {
  //   this.setState({ page: this.state.page + 1 });
  //   this.updateNews();

  // };
  // handlePrevClick = async () => {
  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
  // };

  fetchMoreData = async () => {  
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=e7afcb1f64594e2996ee2d3aa601d9f4&page=${this.state.page+1}&pagesize=${this.props.pageSize}`;
    this.setState({page: this.state.page + 1})
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults
    })
  };
  render() {
    return (
      <div className='container my-5'>
        <h1 className='text-center' style={{ marginTop: '85px' }}>NewsExpress- Top Headlines on {this.capitalize(this.props.category)}</h1>

        {/* in case of prev and next button */}

        {this.state.loading && <Spinnner/>}
        {/* <div className="row my-3">
        {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-md-4" key = {element.url}>
                <NewsItem title = {element.title?element.title:""} description = {element.description?element.description:""} imgUrl = {element.urlToImage} newsUrl ={element.url} author={element.author} date = {element.publishedAt}/>
            </div>
        })} 
        </div> */}
        {/* in case of infinite scroll bar */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinnner/>}
        >
          <div className='container'>
          <div className="row my-3">
            {this.state.articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imgUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
              </div>
            })}
          </div>
          </div>
        </InfiniteScroll>
        {/* <div className = "container d-flex justify-content-between">
          <button disabled = {this.state.page<=1} type="button" className="btn btn-dark" onClick= {this.handlePrevClick}> &larr; Previous</button>
          <button disabled = {this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick= {this.handleNextClick}>Next &rarr; </button>
        </div> */}
      </div>
    )
  }
}

export default News

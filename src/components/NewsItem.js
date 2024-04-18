import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description, imgUrl, newsUrl, author, date} = this.props;
    return (
      <div className= 'my-3'>
        <div className="card">
        <img src={imgUrl?imgUrl:"https://www.financialexpress.com/wp-content/uploads/2024/02/mathew-macquarrie-lzcKZlVPYaU-unsplash-1.jpg"} className="card-img-top" alt="..."/>
        <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a rel = "noreferrer" href= {newsUrl} target = "_blank" className="btn btn-sm btn-dark"> Read More...</a>
            <p className="card-text"><small className='text-muted'>by- {author? author:"Unknown"} on {date? new Date(date).toGMTString():""}</small></p>
        </div>
        </div>
      </div>
    )
  }
}

export default NewsItem

// we can make use of badge see vdo no 32 9:31

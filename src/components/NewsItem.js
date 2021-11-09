import React, { Component } from 'react'

export default class NewsItem extends Component {


    render() {
        let { title, description, imageUrl, newsUrl, author, date } = this.props;
        return (
            <div className="card" style={{ margin: '35px', }}>
                <img src={!imageUrl ? 'https://im.indiatimes.in/content/2021/Oct/Social-image-9_616a87bd7e93a.jpg': imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-muted">By {!author ? "unknown" : author} on {new Date(date).toDateString()}</small></p>
                    <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">Read More</a>
                </div>

            </div>
        );
    }

}

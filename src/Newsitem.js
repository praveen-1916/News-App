import React from 'react'

export default function Newsitem(props) {

    let { title, imageUrl, description, newsUrl, date, author, source } = props;
    return (
        <div className="card my-2">
            <div className='d-flex justify-content-end position-absolute end-0'>
                <span className="badge rounded-pill bg-danger">{source}</span>
            </div>
            <img src={imageUrl} style={{ width: '100%', height: '250px', objectFit: 'cover' }} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{title !== null ? title.slice(0, 80) + '...' : "Unkonwn Title"}</h5>
                <p className="card-text">{description !== null ? description.slice(0, 110) + '...' : "Unknown Description"}</p>
                <p className="card-text"><small className="text-body-secondary">By {author === null ? 'Unknown' : author} on {new Date(date).toLocaleString()}</small></p>
                <a href={newsUrl} rel="noreferrer" target='_blank' className="btn btn-dark">Read More</a>
            </div>
        </div>
    )

}

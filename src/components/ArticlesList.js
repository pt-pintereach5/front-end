import React from 'react';

export default function ArticlesList(props) {
    return (
        <div className='acticleListContainer'>
            {//map over articles to render once logged in
                props.articles.map(article => {
                    return (
                        <ArticleDetails key={article.id} article={article} />
                    )
                })
            }
        </div>
    );
}

function ArticleDetails(props) {
    const { title, source, author, contents } = props.article;
    return (
        <div className='articleCard' >
            <h2>{title}</h2>
            <div className='articleAuthor'>
                Author: <em>{author}</em>
            </div>
            <div className='articleSource'>
                Source: <strong>{source}</strong>
            </div>
            <div className='articleContents'>
                Article: <p>{contents}</p>
            </div>
            <button>Search Articles</button>
            <button>Delete Articles</button>
            <button>Save This Article</button>
        </div>
    );
}
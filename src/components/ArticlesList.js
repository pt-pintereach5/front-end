import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { useHistory, Route, Link } from 'react-router-dom'
import { getArticleList, deleteArticle } from '../actions/articleActions'
import AssignCategory from '../Forms/AssignCategory'
const ArticleList = (props) => {

    useEffect(() => {
        props.getArticleList()
    }, [])

    const handleDelete = (id) => {
        axiosWithAuth().delete(`https://pintereach-5.herokuapp.com/api/articles/${id}`)
        .then(res => {
            props.deleteArticle(id)
            props.getArticleList()
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div className='acticleListContainer'>
            {//map over articles to render once logged in
                props.articles.articles.map(article => {
                    return (
                        <div>
                             <ArticleDetails key={article.article_id} article={article} handleDelete={handleDelete}/>
                            <AssignCategory article_id={article.article_id} />
                        </div>
                       
                    )
                })
            }
        </div>
    );
}

function ArticleDetails(props) {
    const { title, source, author, contents, article_id, category } = props.article;
    const { handleDelete} = props
    
    return (
        
        <div className='articleCard' >
            <h2>{title}</h2>
            <h3>{article_id}</h3>
            <div className='articleAuthor'>
                Author: <em>{author}</em>
            </div>
            <div className='articleSource'>
                Source: <strong>{source}</strong>
            </div>
            <div className='articleSource'>
                Category: <strong>{category}</strong>
            </div>
            <div className='articleContents'>
                Article: <p>{contents}</p>
            </div>
            <button onClick={() => handleDelete(article_id)}>Delete This Article</button>
           {console.log(props.article)}
            
        </div>
    );
}

const mapStateToProps = state => {
    return {
        articles: state.articles
    }
}

export default connect(mapStateToProps, { getArticleList, deleteArticle })(ArticleList)


// import React from 'react';
// import { axiosWithAuth } from '../utils/axiosWithAuth'
// import { useHistory } from 'react-router-dom';

// export default function ArticlesList(props) {
//     return (
//         <div className='acticleListContainer'>
//             {//map over articles to render once logged in
//                 props.articles.map(article => {
//                     return (
//                         <ArticleDetails key={article.id} article={article} />
//                     )
//                 })
//             }
//         </div>
//     );
// }


// function ArticleDetails(props) {
//     const { title, source, author, contents, article_id } = props.article;
//     const { push } = useHistory();
//     const handleDelete = (e) => {
//         e.preventDefault();
//         axiosWithAuth().delete(`https://pintereach-5.herokuapp.com/api/articles/${article_id}`)
//         .then(res => {
//             push('/articles/')
//         })
//         .catch(err => {
//             console.log(err)
//         })
//     }
//     return (
//         <div className='articleCard' >
//             <h2>{title}</h2>
//             <div className='articleAuthor'>
//                 Author: <em>{author}</em>
//             </div>
//             <div className='articleSource'>
//                 Source: <strong>{source}</strong>
//             </div>
//             <div className='articleContents'>
//                 Article: <p>{contents}</p>
//             </div>
//             <button>Search Articles</button>
//             <button onClick={handleDelete}>Delete Articles</button>
//             <button>Save This Article</button>
//         </div>
//     );
// }
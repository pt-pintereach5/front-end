import axios from 'axios';
import React, { useState } from 'react';
import { addArticle } from '../actions/articleActions';
import { connect } from 'react-redux'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { useHistory } from 'react-router-dom';

const AddArticle = (props) => {
    const { push } = useHistory();

    const [article, setArticle] = useState({
        article_id: props.articles.length,
        title: "",
        author: "",
        source: "",
        contents: "",
    });

    const handleChange = (e) => {
        setArticle({
            ...article,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        axiosWithAuth().post('https://pintereach-5.herokuapp.com/api/articles', article)
        .then(res => {
            props.addArticle(res.data)
            push('/articles/')
        })
        .catch(err => {
            console.log(err)
        })
    }

    const { title, author, source, contents } = article;
    return(<div>
                <form onSubmit={handleSubmit}>					
                        <h4>Add Article</h4>				
                            <label>Title</label>
                            <input value={title} onChange={handleChange} name="title" type="text"/>                       
                            <label>Author</label>
                            <input value={author} onChange={handleChange} name="author" type="text"/>                      
                            <label>Source</label>
                            <input value={source} onChange={handleChange} name="source" type="text"/>                                        
                            <label>Contents</label>
                            <textarea value={contents} onChange={handleChange} name="contents"></textarea>
                            
                        <button type='submit'>Submit</button>
                </form>
    </div>);
}

const mapStateToProps = state => {
    return {
        articles: state.articles,
        categories: state.categories
    }
}

export default connect(mapStateToProps, {addArticle})(AddArticle);
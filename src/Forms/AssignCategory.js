import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { getCategoryList } from '../actions/categoryActions'
import { connect } from 'react-redux'

const AssignCategory = props => {
    
    const { push } = useHistory();
    const { article_id } = props
    const [category, setCategory] = useState({
        category: ''
    })

    useEffect(() => {
        console.log('assign category:',article_id)
        props.getCategoryList()
      }, [])

    const handleChange = (e) => {
        setCategory({
            ...category,
            [e.target.name]: e.target.value
        });
        console.log(category, 'in handle change')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(category, 'in handle submit')
        axiosWithAuth().post(`https://pintereach-5.herokuapp.com/api/articles/${article_id}`, category)
        .then(res => {
            console.log(res.data)
            push('/articles/')
        })
        .catch(err => {
            console.log(err)
        })
    }

    return(
        <div>
            
            <form onSubmit={handleSubmit}>
            <label htmlFor="category">Choose a category:</label>
                <select id="category" name="category" onChange={handleChange}>
                    {props.categories.category.map(articleCategory => {
                        return(
                            console.log(articleCategory.category, 'in articleCategory'),
                        <option  value={articleCategory.category}>{articleCategory.category}</option>
                        )
                    })}
                </select>
                <button type='submit'>Submit</button>
        </form>
        </div>
        
    )
    
}

const mapStateToProps = state => {
    return {
        categories: state.categories
    }
}

export default connect(mapStateToProps, { getCategoryList })(AssignCategory)


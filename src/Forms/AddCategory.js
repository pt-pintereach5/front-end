import axios from 'axios'
import React, { useState } from 'react';
import { connect } from 'react-redux'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { addCategory } from '../actions/categoryActions'
import { useHistory } from 'react-router-dom';

const AddCategory = props => {
    const { push } = useHistory();

    const [categoryName, setCategoryName] = useState({
        category: ''
    })


    const handleChange = e => {
        setCategoryName({
            ...categoryName,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axiosWithAuth().post('https://pintereach-5.herokuapp.com/api/categories', categoryName)
        .then(res => {
            props.addCategory(res.data)
            push('/articles/')
        })
        .catch(err => {
            console.log(err)
        })
    }

        const { category } = categoryName

        return(
            <div>
                <form onSubmit={handleSubmit}>					
                    <h4>Add Category</h4>				
                        <label>Category name</label>
                        <input value={category} onChange={handleChange} name="category" type="text"/>                       
                    <button type='submit'>Submit</button>
                </form>
            </div>);
    
}
const mapStateToProps = state => {
    return {
        categories: state.category
    }
}

export default connect(mapStateToProps, {addCategory})(AddCategory)
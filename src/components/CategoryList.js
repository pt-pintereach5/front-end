import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { useHistory } from 'react-router-dom';
import { getCategoryList } from '../actions/categoryActions'

const CategoryList = (props) => {

    useEffect(() => {
        props.getCategoryList()
      }, [])

    return (
        <div className='acticleListContainer'>
            {//map over articles to render once logged in
                props.categories.category.map(category => {
                    return (
                        <CategoryDetails key={Date.now() + Math.random()} category={category}/>
                    )
                })
            }
        </div>
    );
}

function CategoryDetails(props) {
    const { category } = props.category;
    return (
        <div className='articleCard' >
            <h2>{category}</h2>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        categories: state.categories
    }
}

export default connect(mapStateToProps, { getCategoryList })(CategoryList)
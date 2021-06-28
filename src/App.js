import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useHistory, Route, Link } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Complete from './components/Complete'
import RegisterForm from './Forms/RegisterForm'
import LoginForm from './Forms/LoginForm'
import * as yup from 'yup'
import schema from './Validation/FormSchema'
import ArticlesList from './components/ArticlesList'
import { axiosWithAuth } from './utils/axiosWithAuth';
import styling from './Styling/App.css'
import AddArticle from './Forms/AddArticle'
import AddCategory from './Forms/AddCategory'
import CategoryList from './components/CategoryList'
import { connect } from 'react-redux'
import AssignCategory from './Forms/AssignCategory'



const initialFormValues = {
  firstname: '',
  lastname: '',
  email: '',
  username: '',
  password: '',
  terms: false,
}

const initialFormErrors = {
  firstname: '',
  lastname: '',
  email: '',
  username: '',
  password: '',
}

const initialLoginValues = {
  username: '',
  password: '',
}

const App = (props) => {

  const [articleList, setArticleList] = useState([])
  const [savedArticles, setSavedArticles] = useState([])
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [loginValues, setLoginValues] = useState(initialLoginValues)
  const [disabled, setDisabled] = useState(true)
  const { history, push } = useHistory()

  //get articles array from api and set to state if user is logged in
  // useEffect(() => {
  //   const getArticles = () => {
  //     axiosWithAuth()
  //       .get('api/articles')
  //       .then(response => {
  //         console.log('Articles data App', response.data)
  //         setArticleList(response.data)
  //       })
  //       .catch(err => {
  //         console.log('err fetching articles: ', err)
  //       })
  //   }
  //   getArticles()
  // }, [])

  // On change handler for the form values in Register.js
  const onChange = (name, value) => {
    yup
      .reach(schema, name)
      .validate(value)
      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]: ' ',
        });
      })
      .catch((error) => {
        setFormErrors({
          ...formErrors,
          [name]: error.errors[0],
        });
      });
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Submit Action for TestArticleList.js to get data using redux

  // const getArticleListHandler = e => {
  //   e.preventDefault()
  //   console.log('clicked')
  //   props.getArticleList()
  //   push('/articles')
  // }

  // Submit function for Register.js
  const onSubmit = () => {
    const newUser = {
      firstname: formValues.firstname.trim(),
      lastname: formValues.lastname.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      username: formValues.username.trim(),
      terms: formValues.terms
    };
    push('/registration-complete');
    postNewUser(newUser);
  };

  // On change handler for the login values in Login.js
  const loginChange = (name, value) => {
    setLoginValues({
      ...loginValues,
      [name]: value,
    });
  };

  // Login function
  const onLogin = () => {
    const user = {
      username: loginValues.username,
      password: loginValues.password,
    };
    push('/articles');
    loginUser(user);
  };

  // POST request for Login.js
  const loginUser = (user) => {
    axios
      .post('https://pintereach-5.herokuapp.com/api/auth/login', user)
      .then(response => {
        localStorage.setItem('token', response.data.token)
      })
      .catch(error => {
        console.log('Axios login error', error)
      })
  }

  // Used to enable the submit button in Register.js
  useEffect(() => {
    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  // POST request for Register.js
  const postNewUser = (newUser) => {
    axios
      .post(
        'https://pintereach-5.herokuapp.com/api/auth/register',
        newUser
      )
      .catch((error) => {
        console.log('Axios post error', error);

      })
      .finally(() => {
        setFormValues(initialFormValues)
      })
  }

  return (
    < div className='navContainer'>
      <nav>

        <h1>Pintereach App</h1>
        <Link to='/'>
          <button className='homeButton'>Home</button>
        </Link>
        <Link to='/login'>
          <button className='loginButton'>Login</button>
        </Link>
        <Link to='/register'>
          <button className='registerButton'>Register</button>
        </Link>
        <Link to='/about'>
          <button className='aboutButton'>About</button>
        </Link>
        <Link to='/contact'>
          <button className='contactButton'>Contact</button>
        </Link>
        <Link to='/add-article'>
          <button className='addArticleButton'>Add Article</button>
        </Link>
        <Link to='/articles'>
          <button className='articleButton'>Article List</button>
        </Link>
        <Link to='/add-category'>
          <button className='addCategoryButton'>Add New Category</button>
        </Link>
        <Link to='/all-categories'>
          <button className='allCategoryButton'>See All Categories</button>
        </Link>

      </nav>

      <div className='appContainer'>
        <Route exact path='/' component={Home} />
        <Route exact path='/about' component={About} />
        <Route exact path='/contact' component={Contact} />
        <Route exact path='/registration-complete' component={Complete} />
        <Route exact path='/articles' component={ArticlesList} />
        <Route exact path='/add-article' component={AddArticle}/>
        <Route exact path='/add-category' component={AddCategory}/>
        <Route exact path='/all-categories' component={CategoryList}/>
        <Route exact path='/register'>        

          <RegisterForm
            values={formValues}
            errors={formErrors}
            change={onChange}
            submit={onSubmit}
            disabled={disabled}
          />
        </Route>
        <Route exact path='/login'>
          <LoginForm
            values={loginValues}
            change={loginChange}
            login={onLogin}
          />


        </Route>
      </div>
    </ div >
  );

}

const mapStateToProps = state => {
  return {
    articles: state.articles,
    categories: state.category
  }
}

export default connect(mapStateToProps, {})(App)

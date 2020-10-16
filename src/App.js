import React from 'react';
// import logo from './logo.svg';
import './App.css';



class App extends React.Component {

  state = {
    articles: [],
    searchTerm: ""
  }

  // arrow functions below bind this to class App
  componentDidMount = () => {
    fetch("https://api.nytimes.com/svc/topstories/v2/science.json?api-key=Gwxln5M3geWlhR6UE0TY1FUWKSG3wCil")
    .then(res => res.json())
    // .then(data => console.log(data.results))
    .then(data => {
      // console.log("2nd", data)
      this.setState({
        articles: data.results
      })
    })
  }

  articleFilterOnChange = (e) => {
    this.setState({
      searchTerm: e.target.value
    })
    this.filteredArticles()
  }

  filteredArticles = () => {
    // console.log("filteredArticles", this.state.articles, this.state.searchTerm)
    
    return (
        this.state.articles.filter(article => article.title.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
    )
    // if (this.state.articles.filter(article => article.title.toLowerCase().includes(this.state.searchTerm.toLowerCase()))) {
    //   return (this.state.articles.filter(article => article.title.toLowerCase().includes(this.state.searchTerm.toLowerCase())))
    // } else 
  
    // if (this.state.articles.filter(article => article.byline.toLowerCase().includes(this.state.searchTerm.toLowerCase()))) {
    //   return (this.state.articles.filter(article => article.byline.toLowerCase().includes(this.state.searchTerm.toLowerCase())))
    // }

    // return (
    //   this.state.articles.filter(article => article.title.toLowerCase().includes(this.state.searchTerm.toLowerCase())) || 
    //   // this.state.articles.filter(article => article.byline.toLowerCase().includes(this.state.searchTerm.toLowerCase())) 
    // )
   
  }

  render () {
    // map over each article and render each to the dom in an <li>
    // constorginalArticles = this.state.filter(article => article.title.toLowerCase().includes(this.state.searchTerm.toLowerCase())) 
    let newFilteredArticles = this.filteredArticles()
    
    const articles = newFilteredArticles.map(article => 
      <li>Title: {article.title}
      <br />
      <p>Section: {article.section}</p>
      <p>Byline: {article.byline}</p>
      </li>
    )
    return (
      <div className="App">
        <div className="search-articles">
          Search:<input type="text" value={this.state.searchTerm} onChange={this.articleFilterOnChange} placeholder="Search Thru Articles"/>
        </div> 
        <br/>
       <div className="container">
         <ul>
           <li>{articles}</li>
           <br />
         </ul>
       </div>
      </div>
    );
  }
  
}

export default App;

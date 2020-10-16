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
    // set the state of searchTerm to use in filteredArticles()
    this.setState({
      searchTerm: e.target.value
    })
    this.filteredArticles()
  }

  filteredArticles = () => {
    // console.log("filteredArticles", this.state.articles, this.state.searchTerm)
    console.log("here again", this.state.articles)
  
 // I am having trouble returning filter across multiple keys:
//  a single key works:
  //   return (
  //     this.state.articles.filter(article => article.title.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
  // )

  // I believe I should be able to use || (((or syntax))) here:
  return (
    this.state.articles.filter(article => article.title.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
    article.byline.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
    article.section.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    )
)

//   **** articles must be filtered no matter the position of words
// I believe that I would need actually take the searchTerm and .split the term to ensure that that both of the those words were included in the filter (probably using && in the second half of the filter statement)
    
      }

  render () {
    
    let newFilteredArticles = this.filteredArticles()
// map over each article and render each to the dom in an <li>
    const articles = newFilteredArticles.map(article => 
      <li><b>Title:</b><a href={article.url} > {article.title} </a>
      <br />
      <p><b>Section:</b> {article.section}</p>
      <p><b>Byline:</b> {article.byline}</p>
      <h5>__________</h5>
      </li>
    )
    return (
      <div className="App">
        <div className="search-articles">
          Search:<input type="text" value={this.state.searchTerm} onChange={this.articleFilterOnChange} placeholder="Search Thru Articles"/>
        </div> 
        <br/><br/>
       <div className="container">
         <ul>
           <li>{articles}</li>
           <br />
           <br />
         </ul>
       </div>
      </div>
    );
  }
  
}

export default App;

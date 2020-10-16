import React from 'react';
// import logo from './logo.svg';
import './App.css';



class App extends React.Component {

  state = {
    articles: [],
    searchTerm: ""
  }

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

  render () {
    const articles = this.state.articles.map(article => 
      <li>Title: {article.title}
      <br />
      <p>Section: {article.section}</p>
      <p>Byline: {article.byline}</p>
      </li>
    )
    return (
      <div className="App">
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

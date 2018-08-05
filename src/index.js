import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function link(url, text) {
  return <a href={url}>{text}</a>
}

const rows = [
  [link("files/robert_easton_cv.pdf", "my CV")],
  [
    link("admin", "Django admin"),
    " for ",
    link("https://github.com/rwgeaston/mario-stats-django", "this project"),
    " but since you probably don't have a login, ",
    link("api/v1/games/", "here"),
    " is a taster of the API (WIP)."
  ],
  [
    "The rest of my github can be found ",
    link("https://github.com/rwgeaston/", "here")
  ],
  ["Since I like algorithms, here are some projects which required a little more maths:"],
  [
    "- ",
    link("https://github.com/rwgeaston/django-simhash", "Simhash django project"),
    " which you can POST texts to and it tells you which texts that you've already posted are most similar via simhash."
  ],
  [
    "- ",
    link("https://github.com/rwgeaston/nonogram_solver", "Nonogram solver"),
    " (",
    link("https://en.wikipedia.org/wiki/Nonogram", "aka these"),
    ") is not perfect and will get stuck for larger nonograms, but it does its best.",
  ],
  [
    "- ",
    link("https://github.com/rwgeaston/Scrabble_solver", "Scrabble solver"),
    " shows you the highest valid scrabble moves for a given game position + ",
    "letters so allows perfect play in a greedy sense ",
    "(which is actually a poor way to play scrabble)."
  ],
  [
    "and my photos can be found ",
    link("https://www.flickr.com/photos/roberteaston", "here"),
    ", but these did not require any algorithms, merely lugging around a heavy SLR."
  ],
  [<hr />],
  [
    "This page was made in react, despite looking exactly the same as the previous html version did. ",
    "The css is taken from ",
    link("http://bettermotherfuckingwebsite.com/", "here"),
    " in recognition of the fact I have followed no advice from there at all. ",
    "The site is hosted on aws ec2/nginx and the django parts are running on gunicorn and postgres."
  ]
]

class Homepage extends React.Component {
  line(content) {
    return <p>{content}</p>
  }

  render() {
    return (
      <div>
        <h3>Hello!</h3>
        {this.props.rows.map((i) => this.line(i))}
      </div>
    );
  }
}

ReactDOM.render(
  <Homepage rows={rows}/>,
  document.getElementById('root')
);

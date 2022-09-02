import React, { Component } from "react";
import { marked } from "marked";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textToParse: "",
      parsedText: "",
    };
    this.parser = this.parser.bind(this);
    this.parseText = this.parseText.bind(this);
  }

  parser(text) {
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: function (code, lang) {
        const hljs = require("highlight.js");
        const language = hljs.getLanguage(lang) ? lang : "plaintext";
        return hljs.highlight(code, { language }).value;
      },
      langPrefix: "hljs language-javascript", // highlight.js css expects a top-level 'hljs' class.
      pedantic: false,
      gfm: true,
      breaks: true,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false,
    });

    this.setState({
      parsedText: marked.parse(text),
      textToParse: text,
    });
  }

  parseText(event) {
    this.setState({
      textToParse: event.target.value,
    });
    this.parser(event.target.value);
  }

  componentDidMount() {
    // const el = document.getElementById('editor')
    // el.innerText =
    this.parser(
      `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
      - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:
    
![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)`
    );
  }

  render() {
    return (
      <div className="App">
        <h1 className="title">Markdown Previewer</h1>
        <div className="fields">
          <div id="editorFrame" >
            <textarea
              id="editor"
              onChange={this.parseText}
              value={this.state.textToParse}
            ></textarea>
          </div>
          <div id="previewFrame">
            <div
              id="preview"
              dangerouslySetInnerHTML={{ __html: this.state.parsedText }}
            ></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

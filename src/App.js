import React, { Component } from 'react';
import jsonData from './data.json';

// components
import Tree from './components/Tree';

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <h2>React Tree Folder</h2>
        </div>
        <div className="modal">
          <div className="modal-header">
            Tree Folder
          </div>
          <div className="modal-body">
            <div className="modal-body-title">
              <span>Label</span>
            </div>
            <div className="modal-body-description">
              <Tree data={jsonData} />
            </div>
          </div>
          <div className="modal-footer">
            <a href="#">Link</a>
            <button href="#" className="primary-btn pull-right">Done</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

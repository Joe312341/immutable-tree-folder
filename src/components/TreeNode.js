import React from 'react';
import PropTypes from 'prop-types';
import { List, Map } from 'immutable';

class TreeNode extends React.Component {
  constructor(props) {
    super(props);
    this.determineNodeImage = this.determineNodeImage.bind(this);
    this.toggleNode = this.toggleNode.bind(this);
  }
  shouldComponentUpdate(nextProps) {
    // this is a deep equality check using ImmutableJS
    // if the node and its children have not changed we do not re-render
    // tradeoff between equality check and POSSIBLY avoiding re-render
    if (nextProps.node === this.props.node) {
      return false;
    }
    return true;
  }
  determineNodeImage() {
    const map = this.props.node;
    const type = map.get('type');
    const isPrivate = map.get('private');
    if (isPrivate) {
      return 'private-folder';
    }
    return type;
  }
  toggleNode(node) {
    this.props.toggleNode(node);
  }
  render() {
    const nodeStyle = {
      paddingLeft: (20 * this.props.ancestors) + 10
    };

    const map = this.props.node;
    const name = map.get('name');
    const toggled = map.get('toggled');
    const children = map.get('children');
    const selectedNode = map.get('selected');
    const leafNode = !(children.size > 0);

    return (
      <div>
        <div
          className={"hide-long-text " + (selectedNode ? 'selected-node' : 'tree-node')}
          style={nodeStyle}
          onClick={() => this.toggleNode(this.props.node)}
        >
          { !leafNode ?
          <span className={"sprite-class " + (toggled ? 'collapsed' : 'closed')} />
          :
          <span className="adjustment" />
          }
          <span className={"sprite-class " + (this.determineNodeImage())} />
          <span>{name}</span>
        </div>
        {toggled && !leafNode && children.map(node =>
          (
            <TreeNode
              key={node.get('id')}
              node={node}
              ancestors={this.props.ancestors + 1}
              toggleNode={this.toggleNode}
              selectedNode={selectedNode}
            />
          )
        )}
      </div>
    );
  }
}

TreeNode.propTypes = {
  node: PropTypes.oneOfType([
    PropTypes.instanceOf(List),
    PropTypes.instanceOf(Map)
  ]).isRequired,
  ancestors: PropTypes.number.isRequired,
  toggleNode: PropTypes.func.isRequired,
};

export default TreeNode;

import React from 'react';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import { findPath, constructTree } from '../utils/tree-helpers';

// components
import TreeNode from './TreeNode';

class Tree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      treeModel: [],
      latestNodePath: []
    };
    this.toggleNode = this.toggleNode.bind(this);
  }
  componentWillMount() {
    const newTree = constructTree(this.props.data);
    const immutableArray = fromJS(newTree);
    this.setState({ treeModel: immutableArray });
  }
  toggleNode(node) {
    const tree = this.state.treeModel;
    const lastPath = this.state.latestNodePath;

    const nodeId = node.get('id');
    const path = findPath(tree, nodeId);

    // use withMutation to avoid creating unnecessary Maps
    const newTree =
      tree.updateIn(path,
        newNode => newNode.withMutations(
          nodeY => nodeY.set('toggled', !newNode.get('toggled')).set('selected', !newNode.get('selected'))
        )
      )
      .updateIn(lastPath, oldNode => oldNode.set('selected', !oldNode.get('selected')));

    this.setState({
      treeModel: newTree,
      latestNodePath: path
    });
  }
  render() {
    return (
      <div>
        {this.state.treeModel.size > 0 ?
          this.state.treeModel.map(node =>
            (
              <TreeNode
                key={node.get('id')}
                node={node}
                ancestors={0}
                toggleNode={this.toggleNode}
              />
            )
          )
        : 'Loading...' }
      </div>
    );
  }
}

Tree.propTypes = {
  data: PropTypes.object.isRequired
};

export default Tree;

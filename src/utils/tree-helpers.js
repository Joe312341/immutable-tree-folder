import { List, Map } from 'immutable';
import shortid from 'shortid';

/**
 * takes the json data object and adds necessary attributes
 * @param {Object} dataObject
 * @return {Object}
 */
export const createNode = dataObject => ({
  id: shortid.generate(),
  name: dataObject.name,
  type: dataObject.type,
  toggled: false,
  private: dataObject.private || false,
  selected: false,
  children: []
});

/**
 * return path to matching a given nodeId
 * @param {Immutable.List} tree
 * @param {string} nodeId
 * @return {Array}
 */
export const findPath = (tree, nodeId) => {
  let pathToNode = [];

  function utilFindPath(tree, nodeId, path) {
    if (pathToNode.length > 0) return path;
    if (List.isList(tree)) {
      for (let i = 0; i < tree.size; i++) {
        path.push(i);
        const found = utilFindPath(tree.get(i), nodeId, path);
        if (found === true) {
          pathToNode = pathToNode.concat(path);
          return path;
        }
        path.pop();
        path.pop();
      }
    } else if (Map.isMap(tree)) {
      if (tree.get('id') === nodeId) {
        return true;
      } else {
        path.push('children');
        return utilFindPath(tree.get('children'), nodeId, path);
      }
    }
    return path;
  }

  utilFindPath(tree, nodeId, []);
  return pathToNode;
};

/**
 * turns a nested json object into an immutable list
 * @param {Object} data
 * @return {Immutable.List}
 */
export const constructTree = (data) => {
  const newTree = [];
  for (let i = 0; i < data.children.length; i++) {
    newTree.push(createNode(data.children[i]));
    if (data.children[i].children) {
      newTree[i].children = constructTree(data.children[i]);
    }
  }
  return newTree;
};

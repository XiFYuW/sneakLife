const operaClick = require('common').operaClick
const dataTable = require('dataTable').dataTable
const treeView = require('treeView').treeView
const treeGrid = require('treeGrid').treeGrid
const deepCopy = require('common').deepCopy
export const imports = {
  operaClickCopy: deepCopy.deepCopy(operaClick),
  dataTableCopy: deepCopy.deepCopy(dataTable),
  treeViewCopy: deepCopy.deepCopy(treeView),
  treeGridCopy: deepCopy.deepCopy(treeGrid),
  AsyncView: require('common').AsyncView
}

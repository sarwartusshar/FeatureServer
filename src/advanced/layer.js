const { get } = require('lodash')

const defaults = {
  currentVersion: 10.51,
  id: 0,
  name: 'Not Set',
  type: 'Table',
  description: 'This is a feature service powered by https://github.com/koopjs/featureserver',
  geometryType: null,
  copyrightText: ' ',
  parentLayer: null,
  subLayers: null,
  minScale: 0,
  maxScale: 0,
  drawingInfo: {
    renderer: {},
    labelingInfo: null
  },
  defaultVisibility: true,
  extent: {
    xmin: -180,
    ymin: -90,
    xmax: 180,
    ymax: 90,
    spatialReference: {
      wkid: 4326,
      latestWkid: 4326
    }
  },
  hasAttachments: false,
  htmlPopupType: 'esriServerHTMLPopupTypeNone',
  displayField: 'OBJECTID',
  typeIdField: null,
  fields: [],
  relationships: [],
  canModifyLayer: false,
  canScaleSymbols: false,
  hasLabels: false,
  capabilities: 'Query',
  maxRecordCount: 2000,
  supportsStatistics: true,
  supportsAdvancedQueries: true,
  supportedQueryFormats: 'JSON',
  ownershipBasedAccessControlForFeatures: {
    allowOthersToQuery: true
  },
  supportsCoordinatesQuantization: false,
  useStandardizedQueries: true,
  advancedQueryCapabilities: {
    useStandardizedQueries: true,
    supportsStatistics: true,
    supportsOrderBy: true,
    supportsDistinct: true,
    supportsPagination: true,
    supportsTrueCurve: false,
    supportsReturningQueryExtent: true,
    supportsQueryWithDistance: true
  },
  dateFieldsTimeReference: null,
  isDataVersioned: false,
  supportsRollbackOnFailureParameter: true,
  hasM: false,
  hasZ: false,
  allowGeometryUpdates: true,
  objectIdField: 'OBJECTID',
  globalIdField: '',
  types: [],
  templates: [],
  hasStaticData: true,
  timeInfo: {}
}

const renderers = {
  esriGeometryPolygon: require('../../templates/renderers/symbology/polygon.json'),
  esriGeometryPolyline: require('../../templates/renderers/symbology/line.json'),
  esriGeometryPoint: require('../../templates/renderers/symbology/point.json'),
  classBreaks: require('../../templates/renderers/classification/classBreaks.json'),
  uniqueValue: require('../../templates/renderers/classification/uniqueValue.json')
}

module.exports = function (options = {}) {
  const firstPass = Object.assign({}, defaults, options)
  const secondPass = Object.assign({}, firstPass, {
    type: options.type || options.geometryType ? 'Feature Layer' : 'Table',
    renderer: {
      drawingInfo: get(options, 'renderer.drawingInfo') || renderers[options.geometryType] || {}
    },
    displayField: options.displayField || options.fields[0].name
  })
  return secondPass
}

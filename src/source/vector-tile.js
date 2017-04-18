import React from 'react'
import ol from 'openlayers'
import OLComponent from '../ol-component'
import * as interaction from '../interaction'

export default class VectorTile extends OLComponent {
  constructor(props) {
    super(props)
    this.source = new ol.source.VectorTile(Object.assign({}, this.props))
  }

  getChildContext() {
    return {
      source: this.source
    }
  }

  componentDidMount() {
    this.context.layer.setSource(this.source)
  }

  componentWillUnmount() {}

  componentWillReceiveProps(newProps) {
    if(this.props.url !== newProps.url) {
      this.source.setUrl(newProps.url)
      this.source.refresh()
    }
  }
}

VectorTile.propTypes = {
  url: React.PropTypes.string,
  tileGrid: React.PropTypes.instanceOf(ol.tilegrid.TileGrid),
  format: React.PropTypes.instanceOf(ol.format.Feature),
}

VectorTile.defaultProps = {
  
}

VectorTile.contextTypes = {
  layer: React.PropTypes.instanceOf(ol.layer.Base),
  map: React.PropTypes.instanceOf(ol.Map)
}

VectorTile.childContextTypes = {
  source: React.PropTypes.instanceOf(ol.source.Source)
}
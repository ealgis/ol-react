import React from 'react'
import ol from 'openlayers'
import OLContainer from '../ol-container'

export default class VectorTile extends OLContainer {
  constructor (props) {
    super(props)
    this.layer = new ol.layer.VectorTile(Object.assign({}, this.props))
    this.layer.setZIndex(props.zIndex)
    if(props.properties !== undefined) {
      this.layer.setProperties(props.properties, /* opt_silent */true)
    }
  }

  getChildContext () {
    return {
      layer: this.layer
    }
  }

  componentDidMount () {
    this.context.map.addLayer(this.layer)
  }

  componentWillReceiveProps (newProps) {
    this.layer.setVisible(newProps.visible)
    this.layer.setZIndex(newProps.zIndex)
    this.layer.setStyle(newProps.style)
    if(newProps.properties !== undefined) {
      this.layer.setProperties(newProps.properties, /* opt_silent */true)
    }
  }

  componentWillUnmount () {
    this.context.map.removeLayer(this.layer)
  }
}

VectorTile.propTypes = {
  visible: React.PropTypes.bool,
  zIndex: React.PropTypes.number
}

VectorTile.defaultProps = {
  visible: true
}

VectorTile.contextTypes = {
  map: React.PropTypes.instanceOf(ol.Map)
}

VectorTile.childContextTypes = {
  layer: React.PropTypes.instanceOf(ol.layer.VectorTile)
}

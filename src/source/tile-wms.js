import React from 'react'
import ol from 'openlayers'
import OLComponent from '../ol-component'
import * as interaction from '../interaction'

export default class TileWMS extends OLComponent {
  constructor(props) {
    super(props)
    this.source = new ol.source.TileWMS(Object.assign({}, this.props))
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
}

TileWMS.propTypes = {
  url: React.PropTypes.string.isRequired,
  params: React.PropTypes.object.isRequired
}

TileWMS.defaultProps = {
  
}

TileWMS.contextTypes = {
  layer: React.PropTypes.instanceOf(ol.layer.Base),
  map: React.PropTypes.instanceOf(ol.Map)
}

TileWMS.childContextTypes = {
  source: React.PropTypes.instanceOf(ol.source.Source)
}
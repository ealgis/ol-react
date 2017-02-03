import React from 'react'
import ol from 'openlayers'
import OLComponent from '../ol-component'
import * as interaction from '../interaction'

export default class ImageWMS extends OLComponent {
  constructor(props) {
    super(props)
    this.source = new ol.source.ImageWMS(Object.assign({}, this.props))
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

ImageWMS.propTypes = {
  url: React.PropTypes.string.isRequired,
  params: React.PropTypes.object.isRequired
}

ImageWMS.defaultProps = {
  
}

ImageWMS.contextTypes = {
  layer: React.PropTypes.instanceOf(ol.layer.Base),
  map: React.PropTypes.instanceOf(ol.Map)
}

ImageWMS.childContextTypes = {
  source: React.PropTypes.instanceOf(ol.source.Source)
}
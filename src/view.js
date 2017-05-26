import React from 'react';
import ol from 'openlayers';
import OLComponent from './ol-component';

export default class View extends OLComponent {
  constructor(props) {
    super(props);
    this.view = new ol.View();
    if (this.props.onNavigation) {
      this.view.on("change:center", this.onCenterChanged, this);
      this.view.on("change:resolution", this.onResolutionChanged, this);
    }
  }

  onCenterChanged (event) {
    this.props.onNavigation({
      center: this.view.getCenter()
    })
  }

  onResolutionChanged (event) {
    this.props.onNavigation({
      resolution: this.view.getResolution(),
      zoom: this.view.getZoom(),
    })
    return true
  }

  updateCenterAndResolutionFromProps_ (props) {
    if (typeof props.position !== "undefined" && props.position.allowUpdate) {
      // The position object has declared that we need to update the map position (allowUpdate).
      // A position object is:
      // {
      //   zoom: Number = Required
      //   extent: ol.Extent = Optional
      //   center: ol.Coordinate = Optional
      // }
      if(typeof props.position.extent !== "undefined") {
        this.view.fit(props.position.extent, this.context.map.getSize(), {maxZoom: props.position.zoom})
      } else if(typeof props.position.center !== "undefined" && typeof props.position.zoom !== "undefined") {
        this.view.setCenter(props.position.center);
        this.view.setZoom(props.position.zoom);
      }

    } else {
    // Only used at mount time
      this.view.setCenter(props.center);
      if (typeof props.resolution !== 'undefined') {
        this.view.setResolution(props.resolution);
      } else if (typeof props.zoom !== 'undefined') {
        this.view.setZoom(props.zoom);
      }
    }
  }

  updateFromProps_ (props, isMounting) {
    if (isMounting || props.position.allowUpdate) {
      // Update the center and the resolution of the view only when it is
      // mounted the first time but not when the properties are updated.
      // *Unless* we're passed a position object that explicitly declares
      // that we need to update.
      this.updateCenterAndResolutionFromProps_(props)
    }
  }

  componentDidMount () {
    this.context.map.setView(this.view)
    this.updateFromProps_(this.props, /* isMounting = */ true)
  }

  componentWillReceiveProps (newProps) {
    this.updateFromProps_(newProps);
  }
}

View.propTypes = {
	center: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
	resolution: React.PropTypes.number,
	zoom: React.PropTypes.number,
  position: React.PropTypes.object,
	onNavigation: React.PropTypes.func
}

View.contextTypes = {
  map: React.PropTypes.instanceOf(ol.Map)
}

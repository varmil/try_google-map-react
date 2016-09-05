import React, { Component } from 'react'

import './App.css'
import env  from './.env'
import GoogleMap from 'google-map-react'
import MyGreatPlace from './components/my_great_place'

const URL_KEYS = {
  key: env.GMAP_API_KEY
}

export default class SimpleMapPage extends Component {
  static defaultProps = {
    center: {lat: 59.938043, lng: 30.337157},
    zoom: 9,
    greatPlaceCoords: {lat: 59.724465, lng: 30.080121}
  }

  // onClick({x, y, lat, lng, event}) {
  // }

  onChange({center, zoom, bounds, ...other}) {
    console.log(center, bounds)
  }

  // distanceToMouse(data) {
  // }

  // Make sure the container element has width and height.
  // The map will try to fill the parent container,
  // but if the container has no size, the map will collapse to 0 width / height.
  render() {
    return (
      <div className={`container`}>
        <GoogleMap
          bootstrapURLKeys={URL_KEYS}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          onChange={this.onChange.bind(this)}
          // distanceToMouse={this.distanceToMouse.bind(this)}
        >

          <MyGreatPlace lat={59.955413} lng={30.337844} text={'A'} /* Kreyser Avrora */ />
          <MyGreatPlace {...this.props.greatPlaceCoords} text={'B'} /* road circle */ />
        </GoogleMap>
      </div>
    )
  }
}

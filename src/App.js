import React, { Component } from 'react'
import { AppBar, Paper } from 'material-ui';

import './App.css'
import markers from './stub/markers'
import env  from './.env'
import GoogleMap from 'google-map-react'
import MyGreatPlace from './components/my_great_place'


const URL_KEYS = {
  key: env.GMAP_API_KEY
}

const MAP_OPTIONS = {
  panControl: false,
  mapTypeControl: false,
  scrollwheel: true,
  zoomControl: false,
}

const style = {
  position: 'fixed',
  left: '15%',
  bottom: 15,
  height: 55,
  width: '70%',
};

const centerLat = markers.minLat + ((markers.maxLat - markers.minLat) / 2)
const centerLng = markers.minLng + ((markers.maxLng - markers.minLng) / 2)

export default class SimpleMapPage extends Component {
  static defaultProps = {
    center: { lat: centerLat, lng: centerLng },
    zoom: 16,
    greatPlaceCoords: {lat: null, lng: null }
  }

  constructor(props) {
    super(props);
    this.state = { popInfo: undefined }
  }

  // onClick({x, y, lat, lng, event}) {
  // }

  onChange({center, zoom, bounds, ...other}) {
    console.log(center, bounds)
  }

  onTapMarker(id) {
    console.log('TAPTAP: ', id)
    this.setState({ popInfo: markers.Markers[id].content })
  }

  // Make sure the container element has width and height.
  // The map will try to fill the parent container,
  // but if the container has no size, the map will collapse to 0 width / height.
  render() {
    return (
      <div>
        <AppBar
          title="Title"
        />

        <div className={`container`}>
          <GoogleMap
            options={MAP_OPTIONS}
            bootstrapURLKeys={URL_KEYS}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
            onChange={this.onChange.bind(this)}
          >

          {markers.Markers.map((marker, index) =>
            <MyGreatPlace key={index} onTouchTap={() => this.onTapMarker(index)} lat={marker.lat} lng={marker.lng} text={index.toString()} />
          )}
          </GoogleMap>
        </div>

        <Paper style={style} zDepth={0}>
          <div dangerouslySetInnerHTML={{__html: this.state.popInfo}} />
        </Paper>
      </div>
    )
  }
}

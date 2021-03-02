/* eslint-disable react/no-unused-state */
/* eslint-disable no-undef */
import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { cl } from '../../utils/devUtils';

class LocationSearchInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { address: '', addressTooFar: false, selected: false };
  }

  componentDidUpdate() {
    cl(this.state.addressTooFar, 'is address too far:');
  }

  handleChange = address => {
    this.setState({ address, selected: false });
    // Pass value back to formik
    this.props.changeFormik('address', address);
    this.props.changeFormik('addressTooFar', this.state.addressTooFar);
    this.props.changeFormik('addressSelected', false);
  };

  handleAddressTooFar = yesNo => this.setState({ addressTooFar: yesNo });

  handleSelectPass = address => {
    this.setState({ address, selected: true });
    // Pass value back to formik
    this.props.changeFormik('address', address);
    this.props.changeFormik('addressTooFar', this.state.addressTooFar);
    this.props.changeFormik('addressSelected', true);
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        const distance = google.maps.geometry.spherical.computeDistanceBetween(
          new google.maps.LatLng(-32.0142233, 115.7572694),
          new google.maps.LatLng(latLng.lat, latLng.lng)
        );
        // If the entered address is beyond delivery radius, show warning
        cl(this.state.address, 'current address:');
        this.setState({ address });
        if (distance > 3000) {
          this.handleAddressTooFar(true);
        } else {
          this.handleAddressTooFar(false);
        }
        return this.handleSelectPass(address);
      })
      .catch();
  };

  render() {
    const searchOptions = {
      //  Location set at the center of the Mosman Park
      location: new google.maps.LatLng(-32.0142233, 115.7572694),
      radius: 3000,
      types: ['address'],
      componentRestrictions: { country: 'au' },
    };

    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input input',
                name: 'address',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default LocationSearchInput;

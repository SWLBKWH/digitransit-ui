import PropTypes from 'prop-types';
import React from 'react';
import { routerShape } from 'react-router';
import { getRoutingSettings, resetRoutingSettings } from '../store/localStorage';
import RoutingSettingsButtons from './RoutingSettingsButtons';
import Loading from './Loading';

class AdminForm extends React.Component {
  static contextTypes = {
    config: PropTypes.object.isRequired,
    router: routerShape.isRequired,
  };

  renderLoading() {
    return (
      <div className="page-frame fullscreen momentum-scroll">
        <Loading />
      </div>
    );
  }
  
  renderForm() {
    const { dataConDefaults } = this.props;
    const location = this.context.router.location;
    const OTPDefaults = {
      ignoreRealtimeUpdates: false,
      maxPreTransitTime: 1800,
      walkOnStreetReluctance: 1.0,
      waitReluctance: 1.0,
      bikeSpeed: 5.0,
      bikeSwitchTime: 0,
      bikeSwitchCost: 0,
      bikeBoardCost: 600,
      carParkCarLegWeight: 1,
      maxTransfers: 2,
      waitAtBeginningFactor: 0.4,
      heuristicStepsPerMainStep: 8,
      compactLegsByReversedSearch: true,
      disableRemainingWeightHeuristic: false,
    };

    const UIDefaults = {
      maxWalkDistance: this.context.config.maxWalkDistance,
      maxBikingDistance: this.context.config.maxBikingDistance,
      itineraryFiltering: this.context.config.itineraryFiltering,
    }

    const defaultRoutingSettings = {
      ...OTPDefaults,
      ...dataConDefaults,
      ...UIDefaults,
    };

    const merged = {
      ...defaultRoutingSettings,
      ...getRoutingSettings(),
      ...location.query,
    };

    const mergedCurrent = {
      ...defaultRoutingSettings,
      ...getRoutingSettings(),
    };

    const updateSelectParam = (param, target) => {
      const newValue = target.value;
      this.context.router.replace({
        pathname: location.pathname,
        query: {
          ...location.query,
          [param]: newValue,
        },
      });
    };

    const updateInputParam = (param, target, min) => {
      const newValue = target.value;
      if (newValue < min) {
        alert(`Insert a number that is greater than or equal to ${min}`);
        target.value = mergedCurrent[param];
      }
      this.context.router.replace({
        pathname: location.pathname,
        query: {
          ...location.query,
          [param]: newValue,
        },
      });
    };

    const resetParameters = () => {
      console.log(location.query);
      resetRoutingSettings();
      this.context.router.replace({
        pathname: location.pathname,
        query: {},
      });
    };

    return (
      <div className="page-frame fullscreen momentum-scroll">
        <label>
          Soft limit for maximum walking distance in meters (default {defaultRoutingSettings.maxWalkDistance})
          <input type="number" step="any" min="0" onInput={(e) => updateInputParam('maxWalkDistance', e.target, 0)} onChange={(e) => updateInputParam('maxWalkDistance', e.target, 0)} value={merged.maxWalkDistance}/>
        </label>
        <label>
          Soft limit for maximum cycling distance in meters (default {defaultRoutingSettings.maxBikingDistance})
          <input type="number" step="any" min="0" onInput={(e) => updateInputParam('maxBikingDistance', e.target, 0)} onChange={(e) => updateInputParam('maxBikingDistance', e.target, 0)} value={merged.maxBikingDistance}/>
        </label>
        <label>
          Ignore realtime updates (default {defaultRoutingSettings.ignoreRealtimeUpdates.toString()}):
          <select
            value={merged.ignoreRealtimeUpdates}
            onChange={(e) => updateSelectParam('ignoreRealtimeUpdates', e.target)}
          >
            <option value="false">
              false
            </option>
            <option value="true">
              true
            </option>
          </select>
        </label>
        <label>
          Soft limit for maximum time in seconds before car parking (default {defaultRoutingSettings.maxPreTransitTime})
          <input type="number" step="1" min="0" onInput={(e) => updateInputParam('maxPreTransitTime', e.target, 0)} onChange={(e) => updateInputParam('maxPreTransitTime', e.target, 0)} value={merged.maxPreTransitTime}/>
        </label>
        <label>
          Multiplier for reluctancy to walk on streets where car traffic is allowed. If value is over 1, streets with no cars will be preferred. If under 1, vice versa. (default {defaultRoutingSettings.walkOnStreetReluctance})
          <input type="number" step="any" min="0" onInput={(e) => updateInputParam('walkOnStreetReluctance', e.target, 0)} onChange={(e) => updateInputParam('walkOnStreetReluctance', e.target, 0)} value={merged.walkOnStreetReluctance}/>
        </label>
        <label>
          Multiplier for reluctancy to wait at a transit stop compared to being on a transit vehicle. If value is over 1, extra time is rather spent on a transit vehicle than at a transit stop. If under 1, vice versa. Note, changing this value to be over 1.0 has a side effect where you are guided to walk along the bus line instead of waiting. (default {defaultRoutingSettings.waitReluctance})
          <input type="number" step="any" min="0" onInput={(e) => updateInputParam('waitReluctance', e.target, 0)} onChange={(e) => updateInputParam('waitReluctance', e.target, 0)} value={merged.waitReluctance}/>
        </label>
        <label>
          Bike speed m/s (default {defaultRoutingSettings.bikeSpeed})
          <input type="number" step="any" min="0"onInput={(e) => updateInputParam('bikeSpeed', e.target, 0)} onChange={(e) => updateInputParam('bikeSpeed', e.target, 0)} value={merged.bikeSpeed}/>
        </label>
        <label>
          How long it takes to unpark a bike and get on it or to get off a bike and park it in seconds. (default {defaultRoutingSettings.bikeSwitchTime}).
          <input type="number" step="1" min="0" onInput={(e) => updateInputParam('bikeSwitchTime', e.target, 0)} onChange={(e) => updateInputParam('bikeSwitchTime', e.target, 0)} value={merged.bikeSwitchTime}/>
        </label>
        <label>
          What is the cost to unpark a bike and get on it or to get off a bike and park it. (default {defaultRoutingSettings.bikeSwitchCost}).
          <input type="number" step="1" min="0" onInput={(e) => updateInputParam('bikeSwitchCost', e.target, 0)} onChange={(e) => updateInputParam('bikeSwitchCost', e.target, 0)} value={merged.bikeSwitchCost}/>
        </label>
        <label>
          Cost for boarding a vehicle with a bicycle. (default {defaultRoutingSettings.bikeBoardCost}).
          <input type="number" step="1" min="0" onInput={(e) => updateInputParam('bikeBoardCost', e.target, 0)} onChange={(e) => updateInputParam('bikeBoardCost', e.target, 0)} value={merged.bikeBoardCost}/>
        </label>
        <label>
          Cost for car travels. Increase this value to make car trips shorter. (default {defaultRoutingSettings.carParkCarLegWeight}).
          <input type="number" step="any" min="0" onInput={(e) => updateInputParam('carParkCarLegWeight', e.target, 0)} onChange={(e) => updateInputParam('carParkCarLegWeight', e.target, 0)} value={merged.carParkCarLegWeight}/>
        </label>
        <label>
          Maximum number of transfers. (default {defaultRoutingSettings.maxTransfers}).
          <input type="number" step="1" min="0" onInput={(e) => updateInputParam('maxTransfers', e.target, 0)} onChange={(e) => updateInputParam('maxTransfers', e.target, 0)} value={merged.maxTransfers}/>
        </label>
        <label>
          Multiplier for reluctancy to wait at the start of the trip compared to other legs. If value is under 1, waiting before the first transit trip is less bad than for the rest of the legs. If over 1, vice versa. (default {defaultRoutingSettings.waitAtBeginningFactor}).
          <input type="number" step="any" min="0" onInput={(e) => updateInputParam('waitAtBeginningFactor', e.target, 0)} onChange={(e) => updateInputParam('waitAtBeginningFactor', e.target, 0)} value={merged.waitAtBeginningFactor}/>
        </label>
        <label>
          The number of heuristic steps per main step when using interleaved bidirectional heuristics. (default {defaultRoutingSettings.heuristicStepsPerMainStep}).
          <input type="number" step="1" min="0" onInput={(e) => updateInputParam('heuristicStepsPerMainStep', e.target, 0)} onChange={(e) => updateInputParam('heuristicStepsPerMainStep', e.target, 0)} value={merged.heuristicStepsPerMainStep}/>
        </label>
        <label>
          When true, do a full reversed search to compact the legs of the GraphPath. It can remove pointless wait at transit stops at performance cost (default {defaultRoutingSettings.compactLegsByReversedSearch.toString()}):
          <select
            value={merged.compactLegsByReversedSearch}
            onChange={(e) => updateSelectParam('compactLegsByReversedSearch', e.target)}
          >
            <option value="false">
              false
            </option>
            <option value="true">
              true
            </option>
          </select>
        </label>
        <label>
          When true, routing uses Dijkstra's algorithm instead of default A* algorithm. When citybike is selected as one of the available travel modes, this parameter is true regardless of what is selected here (default {defaultRoutingSettings.disableRemainingWeightHeuristic.toString()}):
          <select
            value={merged.disableRemainingWeightHeuristic}
            onChange={(e) => updateSelectParam('disableRemainingWeightHeuristic', e.target)}
          >
            <option value="false">
              false
            </option>
            <option value="true">
              true
            </option>
          </select>
        </label>
        <label>
          How easily bad itineraries are filtered. Value 0 disables filtering. The higher the value, the easier less good routes get filtered from response. Recommended value range is 0.2 - 5. Value 1 means that if an itinerary is twice as worse than another one in some respect (say 100% more walking), it will be filtered. Value 0.5 filters 200% worse itineraries and value 2 defines 50% filtering level. Value 5 filters 20% worse routes. (default {defaultRoutingSettings.itineraryFiltering}).
          <input type="number" step="any" min="0" onInput={(e) => updateInputParam('itineraryFiltering', e.target, 0)} onChange={(e) => updateInputParam('itineraryFiltering', e.target, 0)} value={merged.itineraryFiltering}/>
        </label>
        <RoutingSettingsButtons onReset={resetParameters} />
      </div>
    );
  }

  render() {
    if (this.props.loading) {
      return this.renderLoading();
    } else {
      return this.renderForm();
    }
  }
};

export default AdminForm;

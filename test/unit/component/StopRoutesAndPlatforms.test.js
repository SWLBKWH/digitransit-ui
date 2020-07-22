import React from 'react';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { shallowWithIntl } from '../helpers/mock-intl-enzyme';

import dt2715a from '../test-data/dt2715a';
import dt2715b from '../test-data/dt2715b';
import StopRoutesAndPlatforms, {
  mapRoutes,
} from '../../../app/component/StopRoutesAndPlatforms';

describe('<StopRoutesAndPlatforms />', () => {
  it('should render a container successfully', () => {
    const props = {
      stop: dt2715a,
      params: { terminalId: 'HSL:1000202' },
    };
    const context = {
      match: {
        params: {},
      },
    };
    const wrapper = shallowWithIntl(<StopRoutesAndPlatforms {...props} />, {
      context,
    });

    expect(wrapper.find('.departure-list')).to.have.lengthOf(1);
  });

  it('should calculate the correct amount of unique departures', () => {
    const props = {
      stop: dt2715a,
    };
    const sortedProps = mapRoutes(props.stop, 'terminal');

    expect(sortedProps.length).to.equal(28);
  });

  it('should render as many departures as it receives for a terminal', () => {
    const props = {
      stop: dt2715a,
    };
    const context = {
      match: {
        params: { terminalId: 'HSL:1000202' },
      },
    };
    const wrapper = shallowWithIntl(<StopRoutesAndPlatforms {...props} />, {
      context,
    });

    expect(wrapper.find('.departure')).to.have.lengthOf(
      mapRoutes(props.stop, 'terminal').length,
    );
  });

  it('should render as many departures as it receives for a stop', () => {
    const props = {
      stop: dt2715b,
    };
    const context = {
      match: {
        params: { stopId: 'HSL:1173105' },
      },
    };
    const wrapper = shallowWithIntl(<StopRoutesAndPlatforms {...props} />, {
      context,
    });

    expect(wrapper.find('.departure')).to.have.lengthOf(
      mapRoutes(props.stop, 'stop').length,
    );
  });

  it("should show a 'no departures' indicator", () => {
    const props = {
      stop: {
        stops: [],
        stoptimesForPatterns: [],
      },
    };
    const context = {
      match: {
        params: { stopId: 'HSL:1173105' },
      },
    };
    const wrapper = shallowWithIntl(<StopRoutesAndPlatforms {...props} />, {
      context,
    });
    expect(wrapper.find('.stop-no-departures-container')).to.have.lengthOf(1);
  });
});
import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import { intlShape } from 'react-intl';
import Card from '../../Card';
import CardHeader from '../../CardHeader';
import ComponentUsageExample from '../../ComponentUsageExample';
import BackButton from '../../BackButton';

class RoadworksContent extends React.Component {
  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  };

  static propTypes = {
    match: PropTypes.object,
  };

  static description = (
    <div>
      <p>Renders a roadworks popup.</p>
      <ComponentUsageExample description="">
        <RoadworksContent context="context object here">
          Im content of a roadworks card
        </RoadworksContent>
      </ComponentUsageExample>
    </div>
  );

  static displayName = 'RoadworksContent';

  static formatDate(date) {
    return date.format('ll');
  }

  static formatTime(dateTime) {
    return dateTime.format('LT');
  }

  static formatDateTime(start, end) {
    const startM = moment(start);
    const endM = moment(end);
    return `${RoadworksContent.formatDate(
      startM,
    )} - ${RoadworksContent.formatDate(endM)}`;
  }

  render() {
    const {
      props: {
        match: {
          location: { query: properties },
        },
      },
      context: { intl },
    } = this;

    const duration = (
      <span className="inline-block padding-vertical-small">
        {RoadworksContent.formatDateTime(
          properties.startTime,
          properties.endTime,
        )}
      </span>
    );

    const url = properties.details_url;
    return (
      <Card>
        <div style={{ padding: '30px' }}>
          <BackButton
            icon="icon-icon_arrow-collapse--left"
            iconClassName="arrow-icon"
          />
          <div className="padding-horizontal-large">
            <CardHeader
              name={properties.locationStreet}
              description={duration}
              unlinked
              className="padding-medium"
              headingStyle="h2"
            />
            <div>
              {properties.locationDescription && (
                <p>{properties.locationDescription}</p>
              )}
              <p>{properties.description}</p>
              {url && (
                <p>
                  {/* eslint-disable-next-line react/jsx-no-target-blank */}
                  <a href={url} target="_blank">
                    {intl.formatMessage({
                      id: 'extra-info',
                      defaultMessage: 'More information',
                    })}
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

export default RoadworksContent;

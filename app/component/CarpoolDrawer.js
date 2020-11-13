import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';
import { matchShape, routerShape } from 'found';
import CarpoolOffer from './CarpoolOffer';

export const CarpoolDrawer = ({ open, onToggleClick, mobile, from, to }) => {
  if (open) {
    return (
      <div className={`offcanvas${mobile ? '-mobile' : ''}`}>
        <CarpoolOffer onToggleClick={onToggleClick} from={from} to={to} />
      </div>
    );
  }
  return null;
};

CarpoolDrawer.propTypes = {
  open: PropTypes.bool.isRequired,
  onToggleClick: PropTypes.func.isRequired,
  mobile: PropTypes.bool,
  from: PropTypes.object.isRequired,
  to: PropTypes.object.isRequired,
};

CarpoolDrawer.defaultProps = {
  mobile: false,
};

CarpoolDrawer.contextTypes = {
  config: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  router: routerShape.isRequired,
  match: matchShape.isRequired,
};

export default CarpoolDrawer;
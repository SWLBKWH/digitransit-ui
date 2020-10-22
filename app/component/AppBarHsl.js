/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import React from 'react';
import { isEmpty } from 'lodash';
import { matchShape, routerShape } from 'found';
import moment from 'moment';
import LazilyLoad, { importLazy } from './LazilyLoad';
import { replaceQueryParams } from '../util/queryUtils';
import { addAnalyticsEvent } from '../util/analyticsUtils';
import { setLanguage } from '../action/userPreferencesActions';

const modules = {
  SiteHeader: () => importLazy(import('@hsl-fi/site-header')),
  SharedLocalStorageObserver: () =>
    importLazy(import('@hsl-fi/shared-local-storage')),
};

const selectLanguage = (executeAction, lang, router, match) => () => {
  addAnalyticsEvent({
    category: 'Navigation',
    action: 'ChangeLanguage',
    name: lang,
  });
  executeAction(setLanguage, lang);
  if (lang !== 'en') {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    require(`moment/locale/${lang}`);
  }
  moment.locale(lang);
  replaceQueryParams(router, match, { locale: lang });
};

const AppBarHsl = (
  { lang, user },
  { executeAction, config, router, match },
) => {
  const { location } = match;

  const languages = [
    {
      name: 'fi',
      // onClick: selectLanguage(executeAction, 'fi', router, match),
      url: `/fi${location.pathname}${location.search}`,
    },
    {
      name: 'sv',
      // onClick: selectLanguage(executeAction, 'sv', router, match),
      url: `/sv${location.pathname}${location.search}`,
    },
    {
      name: 'en',
      // onClick: selectLanguage(executeAction, 'en', router, match),
      url: `/en${location.pathname}${location.search}`,
    },
  ];

  const { given_name, family_name } = user;

  const initials =
    given_name && family_name
      ? given_name.charAt(0) + family_name.charAt(0)
      : '  '; // Authenticated user's initials, will be shown next to Person-icon.

  const userMenu = config.allowLogin
    ? {
        userMenu: {
          isLoading: false, // When fetching for login-information, `isLoading`-property can be set to true. Spinner will be shown.
          isAuthenticated: !isEmpty(user), // If user is authenticated, set `isAuthenticated`-property to true.
          loginUrl: '/login', // Url that user will be redirect to when Person-icon is pressed and user is not logged in.
          initials,
          menuItems: [
            {
              name: 'Omat tiedot',
              url: `${config.linkSite}/omat-tiedot`,
              selected: false,
            },
            {
              name: 'Kirjaudu ulos',
              url: '/logout',
              selected: false,
            },
          ], // Menu items that will be shown when Person-icon is pressed and user is authenticated,
        },
      }
    : {};
  return (
    <LazilyLoad modules={modules}>
      {({ SiteHeader, SharedLocalStorageObserver }) => (
        <>
          <SharedLocalStorageObserver
            keys={['saved-searches', 'favouriteStore', 'futureRoutes']}
            url={config.localStorageEmitter}
          />
          <SiteHeader
            hslFiUrl={config.URL.ROOTLINK}
            {...userMenu}
            lang={lang}
            languageMenu={languages}
          />
        </>
      )}
    </LazilyLoad>
  );
};

AppBarHsl.contextTypes = {
  router: routerShape.isRequired,
  match: matchShape.isRequired,
  config: PropTypes.object.isRequired,
  executeAction: PropTypes.func.isRequired,
};

AppBarHsl.propTypes = {
  lang: PropTypes.string,
  user: PropTypes.shape({
    given_name: PropTypes.string,
    family_name: PropTypes.string,
  }),
};

AppBarHsl.defaultProps = {
  lang: 'fi',
  user: {},
};

export { AppBarHsl as default, AppBarHsl as Component };

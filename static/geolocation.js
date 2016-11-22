window.position = {
  pos: null,
  error: null,
  timing: null
}

window.retrieveGeolocation = function retrieveGeolocation(pos) {
  window.position.pos = pos;
}

window.retrieveGeolocationError = function retrieveGeolocationError(error) {
  window.position.error = error;
}

window.retrieveGeolocationTiming = function retrieveGeolocationTiming(timing) {
  window.position.timing = timing;
}

//set watcher for geolocation
function watchPosition() {
  var startTime = new Date().getTime();
  var quietTimeoutSeconds = 20;

  var timeout = setTimeout(function setTimeout(){
    window.retrieveGeolocationError(
      {code: 100001, message: "No location retrieved for " + quietTimeoutSeconds + " seconds."});
    },
    quietTimeoutSeconds * 1000);
  try {
    window.geoWatchId = navigator.geolocation.watchPosition(function geoPosition(position) {
      if (timeout !== null) {
        clearTimeout(timeout);
        timeout = null;
        window.retrieveGeolocationTiming(new Date().getTime() - startTime);
      }
      window.retrieveGeolocation(position);
    }, function handleError(error) {
      if (timeout !== null) {
        clearTimeout(timeout);
        timeout = null;
      }
      window.retrieveGeolocationError(error);
    }
    , {enableHighAccuracy: true, timeout: 60000, maximumAge: 60000});
  } catch (Error) {
    console.log("Error starting geolocation", Error);
  }
}

function startPositioning() {
  if(navigator.permissions !== undefined) {
    //check if permission prompt is active
    navigator.permissions.query({name:'geolocation'}).then(
      function(permissionStatus){
        if ('prompt' === permissionStatus.state) {
          //it was, let's listen for changes
          permissionStatus.onchange = function () {
            permissionStatus.onchange = null; //remove listener
            if ('granted' === permissionStatus.state) {
              window.retrieveGeolocationError({code: 100000, message: 'Granted'});
            }
          }
          window.retrieveGeolocationError({code: 100002, message: 'Prompt'});
        } else if ('granted' === permissionStatus.state) {
          window.retrieveGeolocationError({code: 100000, message: 'Granted'});
        }
        watchPosition();
      });
  } else {
    window.retrieveGeolocationError({code: 100000, message: 'Granted'});
    watchPosition();
  }
}

function getItem(key, defaultValue) {
  return (typeof window !== 'undefined' && window.localStorage &&
    window.localStorage.getItem(key)) || defaultValue;
}

function getItemAsJson(key, defaultValue) {
  let item = getItem(key);
  return JSON.parse(item);
}

function getPositioningHasSucceeded() {
  //XXX hack for windows phone
  return navigator && navigator.userAgent.indexOf('Windows Phone') > -1
    && getItemAsJson('positioningSuccesful', '{ "state": false }').state;
}

// Check if we have previous permissions to get geolocation.
// If yes, start immediately, if not, we will not prompt for permission at this point.
(function() {
  setTimeout(function () {
    if (window.location.search.indexOf('mock') === -1 && navigator.geolocation !== undefined && navigator.permissions !== undefined) {
      navigator.permissions.query({name:'geolocation'}).then(
        function(result) {
          if (result.state === 'granted') {
            window.startPositioning();
          }
        }
      );
    } else {
      //check is
      if (getPositioningHasSucceeded()) {
        window.startPositioning();
      }
    }
  }, 1);
})();

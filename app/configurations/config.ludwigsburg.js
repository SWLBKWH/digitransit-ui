@@ -2,7 +2,7 @@
import configMerger from '../util/configMerger';

const CONFIG = 'ludwigsburg';
const APP_TITLE = 'stadtnavi Herrenberg';
const APP_TITLE = 'stadtnavi Ludwigsburg';
const APP_DESCRIPTION = 'Gemeinsam Mobilität neu denken - die intermodale Verbindungssuche mit offenen, lokalen Daten';
const API_URL = process.env.API_URL || 'https://api.dev.stadtnavi.eu';
const MAP_URL = process.env.MAP_URL || 'https://tiles.stadtnavi.eu/streets/{z}/{x}/{y}{r}.png';
@ -11,20 +11,17 @@ const GEOCODING_BASE_URL = process.env.GEOCODING_BASE_URL || "https://photon.sta
const YEAR = 1900 + new Date().getYear();
const STATIC_MESSAGE_URL =
    process.env.STATIC_MESSAGE_URL ||
    '/assets/messages/message.hb.json';
    '/assets/messages/message.ludwigsburg.json';

const walttiConfig = require('./config.waltti.js').default;
const parentConfig = require('./config.hbnext.js').default;

const realtimeHbg = require('./realtimeUtils').default.hbg;
const hostname = new URL(API_URL);
realtimeHbg.mqtt = `wss://${hostname.host}/mqtt/`;

const minLat = 47.6020;
const maxLat = 49.0050;
const minLon = 8.4087;
const maxLon = 9.9014;

export default configMerger(walttiConfig, {
export default configMerger(parentConfig, {
    CONFIG,
    URL: {
        OTP: process.env.OTP_URL || `${API_URL}/routing/v1/router/`,
@ -37,10 +34,8 @@ export default configMerger(walttiConfig, {
        STOP_MAP: `${API_URL}/routing/v1/router/vectorTiles/stops/`,
        DYNAMICPARKINGLOTS_MAP: `${API_URL}/routing/v1/router/vectorTiles/parking/`,
        ROADWORKS_MAP: `${API_URL}/map/v1/cifs/`,
        COVID19_MAP: `https://tiles.caresteouvert.fr/public.poi_osm_light/{z}/{x}/{y}.pbf`,
        CITYBIKE_MAP: `${API_URL}/routing/v1/router/vectorTiles/citybikes/`,
        BIKE_PARKS_MAP: `${API_URL}/routing/v1/router/vectorTiles/parking/`,
        WEATHER_STATIONS_MAP: `${API_URL}/map/v1/weather-stations/`,
        CHARGING_STATIONS_MAP: `${API_URL}/tiles/charging-stations/`,
        PELIAS: `${process.env.GEOCODING_BASE_URL || GEOCODING_BASE_URL}/search`,
        PELIAS_REVERSE_GEOCODER: `${
@ -63,25 +58,6 @@ export default configMerger(walttiConfig, {
    MATOMO_URL: process.env.MATOMO_URL,

    /* disable the "next" column of the Route panel as it can be confusing sometimes: https://github.com/stadtnavi/digitransit-ui/issues/167 */
    displayNextDeparture: false,
    maxWalkDistance: 15000,

    optimize: "TRIANGLE",

    defaultSettings: {
        optimize: "TRIANGLE",
        safetyFactor: 0.4,
        slopeFactor: 0.3,
        timeFactor: 0.3,
    },

    defaultOptions: {
        walkSpeed: [0.83, 1.38, 1.94],
    },

    itinerary: {
        delayThreshold: 60,
    },

    appBarLink: {
        name: 'Feedback',
@ -90,12 +66,12 @@ export default configMerger(walttiConfig, {
    },

    contactName: {
        de: 'transportkollektiv',
        default: 'transportkollektiv',
        de: 'SWLB',
        default: 'Stadtwerke Ludwigsburg',
    },

    colors: {
        primary: '#9fc727',
        primary: '#fecc00',
        iconColors: {
            'mode-bus': '#ff0000',
            'mode-car': '#007AC9',
@ -123,144 +99,19 @@ export default configMerger(walttiConfig, {
        },
    },

    dynamicParkingLots: {
        showDynamicParkingLots: true,
        dynamicParkingLotsSmallIconZoom: 14,
        dynamicParkingLotsMinZoom: 14
    },

    bikeParks: {
        show: true,
        smallIconZoom: 14,
        minZoom: 14
    },

    roadworks: {
        showRoadworks: true,
        roadworksSmallIconZoom: 16,
        roadworksMinZoom: 10
    },

    covid19: {
        show: false,
        smallIconZoom: 17,
        minZoom: 15
    },


    weatherStations: {
        show: true,
        smallIconZoom: 17,
        minZoom: 15
    },

    chargingStations: {
        show: true,
        smallIconZoom: 14,
        minZoom: 14
    },

    cityBike: {
        minZoomStopsNearYou: 10,
        showStationId: false,
        useSpacesAvailable: false,
        showCityBikes: true,
        networks: {
            regiorad: {
                icon: 'regiorad',
                name: {
                    de: 'RegioRad',
                    en: 'RegioRad',
                },
                type: 'citybike',
                url: {
                    de: 'https://www.regioradstuttgart.de/de',
                    en: 'https://www.regioradstuttgart.de/',
                },
                visibleInSettingsUi: true,
            },
            taxi: {
                icon: 'taxi',
                name: {
                    de: 'Taxi',
                    en: 'Taxi',
                },
                type: 'taxi',
                visibleInSettingsUi: false,
            },
            "car-sharing": {
                icon: 'car-sharing',
                name: {
                    de: 'Carsharing',
                    en: 'Car sharing',
                },
                type: 'car-sharing',
                url: {
                    de: 'https://stuttgart.stadtmobil.de/privatkunden/',
                    en: 'https://stuttgart.stadtmobil.de/privatkunden/',
                },
                visibleInSettingsUi: false,
            },
            "cargo-bike": {
                icon: 'cargobike',
                name: {
                    de: 'Lastenrad Herrenberg',
                    en: 'Cargo bike Herrenberg',
                },
                type: 'cargo-bike',
                visibleInSettingsUi: false,
            },
        }
    },

    
    mergeStopsByCode: true,

    title: APP_TITLE,

    favicon: './app/configurations/images/hbnext/favicon.png',

    meta: {
        description: APP_DESCRIPTION,
    },

    modeToOTP: {
        carpool: 'CARPOOL',
    },

    logo: 'hbnext/stadtnavi-herrenberg-logo.svg',
    favicon: './app/configurations/images/ludwigsburg/favicon.svg',
    logo: 'ludwigsburg/stadtnavi-ludwigsburg-logo.svg',

    GTMid: '',

    // get newest version from: https://github.com/moment/moment-timezone/blame/develop/data/packed/latest.json
    timezoneData: 'Europe/Berlin|CET CEST CEMT|-10 -20 -30|01010101010101210101210101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010|-2aFe0 11d0 1iO0 11A0 1o00 11A0 Qrc0 6i00 WM0 1fA0 1cM0 1cM0 1cM0 kL0 Nc0 m10 WM0 1ao0 1cp0 dX0 jz0 Dd0 1io0 17c0 1fA0 1a00 1ehA0 1a00 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|41e5',

    map: {
        useRetinaTiles: true,
        tileSize: 256,
        zoomOffset: 0,

        showZoomControl: true, // DT-3470, DT-3397
        showStreetModeSelector: false, // DT-3470
        showLayerSelector: true, // DT-3470
        showStopMarkerPopupOnMobile: false, // DT-3470
        showScaleBar: true, // DT-3470, DT-3397
        genericMarker: {
            popup: {
                offset: [0,0],
                maxWidth: 250,
                minWidth: 250,
            }
        },
        attribution: {
            'default': '© <a tabindex=-1 href=http://osm.org/copyright>OpenStreetMap Mitwirkende</a>, <a tabindex=-1 href=https://www.nvbw.de/aufgaben/digitale-mobilitaet/open-data/>Datensätze der NVBW GmbH</a> und <a tabindex=-1 href=https://www.openvvs.de/dataset/gtfs-daten>VVS GmbH</a>',
            'satellite': '© <a tabindex=-1 href=http://osm.org/copyright>OpenStreetMap Mitwirkende</a>, © <a tabindex=-1 href="https://www.lgl-bw.de/">LGL BW</a>, <a tabindex=-1 href=https://www.nvbw.de/aufgaben/digitale-mobilitaet/open-data/>Datensätze der NVBW GmbH</a> und <a tabindex=-1 href=https://www.openvvs.de/dataset/gtfs-daten>VVS GmbH</a>',
            'bicycle': '© <a tabindex=-1 href=http://osm.org/copyright>OpenStreetMap Mitwirkende</a>, © <a tabindex=-1 href=https://www.cyclosm.org/#map=12/52.3728/4.8936/cyclosmx>CyclOSM</a>, © <a tabindex=-1 href="https://www.openstreetmap.fr/">OSM-FR</a>, <a tabindex=-1 href=https://www.nvbw.de/aufgaben/digitale-mobilitaet/open-data/>Datensätze der NVBW GmbH</a> und <a tabindex=-1 href=https://www.openvvs.de/dataset/gtfs-daten>VVS GmbH</a>',
        },
    },

    feedIds: ['hbg'],

    realtime: { hbg: realtimeHbg },
    realtime: { hbg: null },

    searchSources: ['oa', 'osm'],

@ -269,8 +120,8 @@ export default configMerger(walttiConfig, {
        'boundary.rect.max_lat': 48.97661,
        'boundary.rect.min_lon': 9.95635,
        'boundary.rect.max_lon': 8.530883,
        'focus.point.lat': 48.5957,
        'focus.point.lon': 8.8675
        'focus.point.lat': 48.895195,
        'focus.point.lon': 9.188647
    },

    areaPolygon: [
@ -283,35 +134,15 @@ export default configMerger(walttiConfig, {
    nationalServiceLink: { name: 'Fahrplanauskunft efa-bw', href: 'https://www.efa-bw.de' },

    defaultEndpoint: {
        lat: 48.5942066,
        lon: 8.8644041,
        zoomLevel: 14,
        address: 'Bahnhof Ludwigsburg',
        lat: 48.8922609,
        lon: 9.1852056
    },


    defaultOrigins: [
        {
            icon: 'icon-icon_bus',
            label: 'ZOB Herrenberg',
            lat: 48.5942066,
            lon: 8.8644041,
        },
        {
            icon: 'icon-icon_star',
            label: 'Krankenhaus',
            lat: 48.59174,
            lon: 8.87536,
        },
        {
            icon: 'icon-icon_star',
            label: 'Waldfriedhof / Schönbuchturm',
            lat: 48.6020352,
            lon: 8.9036348,
        },
    ],

    menu: {
        copyright: {
            label: `© Stadt Herrenberg ${YEAR}`
            label: `© Stadtwerke Ludwigsburg ${YEAR}`
        },
        content: [
            {
@ -323,12 +154,12 @@ export default configMerger(walttiConfig, {
            {
                name: 'imprint',
                nameEn: 'Imprint',
                href: 'https://www.herrenberg.de/impressum',
                href: 'https://www.swlb.de/de/Home/Impressum/',
            },
            {
                name: 'privacy',
                nameEn: 'Privacy',
                href: 'https://www.herrenberg.de/datenschutz',
                href: 'https://www.swlb.de/datenschutz',
            },
        ],
    },
@ -338,16 +169,14 @@ export default configMerger(walttiConfig, {
            {
                header: 'Über diesen Dienst',
                paragraphs: [
                    'stadtnavi ist eine Reiseplanungs-Anwendung für die Stadt Herrenberg und Umgebung. Dieser Dienst umfasst ÖPNV, Fußwege, Radverkehr, Straßen- und Parkplatzinformationen, Ladeinfrastruktur und Sharing-Angebote. Mobilitätsangebote werden durch intermodales Routing miteinander vernetzt.',
                    'Gefördert durch <br>',
                    '<a href="https://www.herrenberg.de/stadtluft"><img src="https://www.herrenberg.de/ceasy/resource/?id=4355&predefinedImageSize=rightEditorContent"/></a>',
                    'stadtnavi Ludwigsburg ist eine Reiseplanungs-Anwendung für die Stadt Ludwigsburg und Umgebung. Dieser Dienst umfasst ÖPNV, Fußwege, Radverkehr, Straßen- und Parkplatzinformationen, Ladeinfrastruktur und Sharing-Angebote. Mobilitätsangebote werden durch intermodales Routing miteinander vernetzt.'

                ],
            },
            {
                header: 'Mitmachen',
                paragraphs: [
                    'Die Stadt Herrenberg hat diese App im Rahmen der Modellstadt, gefördert durch das Bundesministerium für Verkehr und digitale Infrastruktur (BMVI) entwickelt. stadtnavi Anwendung ist eine Open Source Lösung und kann von anderen Kommunen und Akteuren unter ihrem Namen und Erscheinungsbild verwendet und an individuelle Bedürfnisse angepasst und weiterentwickelt werden (White Label Lösung). Mitmachen ist gewünscht!',
                    'stadtnavi Ludwigsburg basiert auf dem BMVI-geförderten Projekt stadtnavi Herrenberg. stadtnavi Anwendung ist eine Open Source Lösung, <a href="https://gihtub.com/stadtnavi/digitransit-ui">auf GitHub verfügbar</a>, und kann von anderen Kommunen und Akteuren unter ihrem Namen und Erscheinungsbild verwendet und an individuelle Bedürfnisse angepasst und weiterentwickelt werden (White Label Lösung). Mitmachen ist gewünscht!',
                ]
            },
            {
@ -370,14 +199,13 @@ export default configMerger(walttiConfig, {
            {
                header: 'About this service',
                paragraphs: [
                    'stadtnavi is a travel planning application for the city of Herrenberg and its surroundings. This service includes public transport, footpaths, cycling, street and parking information, charging infrastructure and sharing offerings. The mobility offerings are connected through intermodal routing.',
                    '<a href="https://www.herrenberg.de/stadtluft"><img src="https://www.herrenberg.de/ceasy/resource/?id=4355&predefinedImageSize=rightEditorContent"/></a>',
                    'stadtnavi Ludwigsburg is a travel planning application for the city of Ludwigsburg and its surroundings. This service includes public transport, footpaths, cycling, street and parking information, charging infrastructure and sharing offerings. The mobility offerings are connected through intermodal routing.'
                ],
            },
            {
                header: 'Contribute',
                paragraphs: [
                    'The city of Herrenberg has developed this app, funded by the Federal Ministry of Transport and Digital Infrastructure (BMVI), as model city. The stadtnavi app is an open source solution and can be used, customized and further developed by other municipalities to meet individual needs (white lable solution). Participation is welcome!',
                    'The Stadtwerke Ludwigsburg have developed this app, based on stadtnavi Herrenberg, which was funded by the Federal Ministry of Transport and Digital Infrastructure (BMVI). The stadtnavi app is an open source solution, <a href="https://gihtub.com/stadtnavi/digitransit-ui">available via GitHub</a>, and can be used, customized and further developed by other municipalities to meet individual needs (white lable solution). Participation is welcome!',
                ]
            },
            {
@ -390,7 +218,7 @@ export default configMerger(walttiConfig, {
                header: 'Data sources',
                paragraphs: [
                    'Map data: © <a target=new href=https://www.openstreetmap.org/>OpenStreetMap contributors</a>',
                    'Public transit data: Datasets by <a target=new href=https://www.nvbw.de/aufgaben/digitale-mobilitaet/open-data/>NVBW GmbH</a> and <a target=new href=https://www.openvvs.de/dataset/gtfs-daten>VVS GmbH</a>, Shapes (d.h. Geometrien der Streckenverläufe) enhanced with OpenStreetMap data © OpenStreetMap contributors',
                    'Public transit data: Datasets by <a target=new href=https://www.nvbw.de/aufgaben/digitale-mobilitaet/open-data/>NVBW GmbH</a> and <a target=new href=https://www.openvvs.de/dataset/gtfs-daten>VVS GmbH</a>, Shapes (d.h. Geometries of transit routes) enhanced with OpenStreetMap data © OpenStreetMap contributors',
                    'No responsibility is accepted for the accuracy of this information.'
                ],
            },
@ -399,184 +227,13 @@ export default configMerger(walttiConfig, {

    redirectReittiopasParams: true,

    themeMap: {
        hbnext: 'hbnext',
        ludwigsburg: 'hbnext'
    },

    transportModes: {

        nearYouTitle: {
            de: 'Fahrpläne und Routen',
        },

        bus: {
            availableForSelection: true,
            defaultValue: true,
            smallIconZoom: 16,
            nearYouLabel: {
                de: 'Bushaltestellen in der Nähe',
            }
        },

        rail: {
            availableForSelection: true,
            defaultValue: true,
            nearYouLabel: {
                de: 'Bahnhaltestellen in der Nähe',
            }
        },

        tram: {
            availableForSelection: false,
            defaultValue: false,
            nearYouLabel: {
                de: 'Tramhaltestellen in der Nähe',
            }
        },

        subway: {
            availableForSelection: true,
            defaultValue: true,
            nearYouLabel: {
                de: 'U-Bahnhaltestellen in der Nähe',
            }
        },
        airplane: {
            availableForSelection: false,
            defaultValue: false,
            nearYouLabel: {
                de: 'Flughäfen in der Nähe',
            }
        },

        ferry: {
            availableForSelection: false,
            defaultValue: false,
            nearYouLabel: {
                de: 'Fähranleger in der Nähe',
            }
        },

        carpool: {
            availableForSelection: true,
            defaultValue: false,
            nearYouLabel: {
                de: 'Mitfahrpunkte in der Nähe',
                en: 'Nearby carpool stops on the map',
            }
        },

        citybike: {
            availableForSelection: true,
            defaultValue: false,
            nearYouLabel: {
                de: 'Sharing-Angebote in der Nähe',
                en: 'Shared mobility near you'
            }
        },
    },

    streetModes: {
        public_transport: {
            availableForSelection: true,
            defaultValue: true,
            exclusive: false,
            icon: 'bus-withoutBox',
        },

        walk: {
            availableForSelection: true,
            defaultValue: false,
            exclusive: true,
            icon: 'walk',
        },

        bicycle: {
            availableForSelection: true,
            defaultValue: false,
            exclusive: true,
            icon: 'bicycle-withoutBox',
        },

        car: {
            availableForSelection: false,
            defaultValue: false,
            exclusive: false,
            icon: 'car-withoutBox',
        },

        car_park: {
            availableForSelection: true,
            defaultValue: false,
            exclusive: false,
            icon: 'car-withoutBox',
        },

        carpool: {
            availableForSelection: true,
            defaultValue: false,
            exclusive: true,
            icon: 'carpool-withoutBox',
        },
    },

    showTicketInformation: true,
    showTicketPrice: true,
    availableTickets: { 'hbg' : {}},
    fareMapping: function mapHbFareId(fareId) {
        return {
            en: "Adult",
            de: "Regulär",
        };
    },
    displayFareInfoTop: false,


    showRouteSearch: false,
    showNearYouButtons: false,

    // adding assets/geoJson/hb-layers layers
    geoJson: {
        layers: [
            // bicycleinfrastructure includes shops, repair stations,
            {
                name: {
                    fi: '',
                    en: 'Service stations and stores',
                    de: "Service Stationen und Läden",
                },
                url: '/assets/geojson/hb-layers/bicycleinfrastructure.geojson',
            },
            /* Charging stations
            {
                name: {
                    fi: '',
                    en: 'Charging stations',
                    de: 'Ladestationen',
                },
                url: '/assets/geojson/hb-layers/charging.geojson',
            },*/
            // LoRaWan map layer
            {
                name: {
                    fi: '',
                    en: 'LoRaWAN Gateways',
                    de: 'LoRaWAN Gateways',
                },
                url: '/assets/geojson/hb-layers/lorawan-gateways.geojson',
                isOffByDefault: true,
            },
            // Nette Toilette layer
            {
                name: {
                    fi: '',
                    en: 'Public Toilets',
                    de: 'Nette Toilette',
                },
                url: '/assets/geojson/hb-layers/toilet.geojson',
                isOffByDefault: true,
            },
        ],
    },
    staticMessagesUrl: STATIC_MESSAGE_URL,
@ -587,20 +244,8 @@ export default configMerger(walttiConfig, {
        'lot_type:Parkhaus'
    ],

    suggestCarMinDistance: 800,
    suggestWalkMaxDistance: 3000,
    suggestBikeAndPublicMinDistance: 3000,
    suggestBikeAndParkMinDistance: 3000,

    // live bus locations
    vehicles: true,
    vehicles: false,
    showVehiclesOnSummaryPage: false,
    showVehiclesOnStopPage: true,

    showBikeAndPublicItineraries: true,
    showBikeAndParkItineraries: true,
    showStopAndRouteSearch: false,
    showTimeTableOptions: false,

    viaPointsEnabled: false,
    showVehiclesOnStopPage: true
});

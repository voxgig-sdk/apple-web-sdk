import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "articlecategory",
    "accessor": "Articlecategory",
    "op": "list",
    "method": "GET",
    "path": "/newsroom/article.{category}.json",
    "args": [
      {
        "name": "category",
        "wire": "category",
        "value": "photos"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "results": [
        {
          "title": "x",
          "description": "x",
          "category": "x",
          "date": "x",
          "publishedTime": 1,
          "link": "x",
          "image": {
            "wide": {
              "small": "x",
              "small2x": "x",
              "medium": "x",
              "medium2x": "x",
              "large": "x",
              "large2x": "x"
            },
            "hero-highlight": {
              "small": "x",
              "small2x": "x",
              "medium": "x",
              "medium2x": "x",
              "large": "x",
              "large2x": "x"
            }
          }
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "feed",
    "accessor": "Feed",
    "op": "load",
    "method": "GET",
    "path": "/newsroom/newsroom.everydayfeed.json",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "results": {
        "headline": "x",
        "tiles": [
          {
            "category": "x",
            "headline": "x",
            "time": "x",
            "ts": "2026-01-01T00:00:00Z",
            "ariaLabel": "x",
            "eyebrow": "x",
            "data-analytics-title": "x",
            "animated1": true,
            "video": {
              "src": "x"
            },
            "metadata": {
              "url": "x",
              "type": "x",
              "gradientType": "x",
              "usePicture": true
            },
            "image": {
              "metadata": {
                "uuid": "x",
                "srcs": {}
              }
            }
          }
        ]
      }
    },
    "idField": "id"
  },
  {
    "entity": "flyout",
    "accessor": "Flyout",
    "op": "list",
    "method": "GET",
    "path": "/api-www/global-elements/global-header/v1/flyouts",
    "args": [],
    "select": {
      "locale": "en_US"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "locale"
    ],
    "queryArgs": [
      {
        "name": "locale",
        "wire": "locale"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": [
      {
        "id": "x",
        "name": "x",
        "analyticsAttributes": [
          {
            "name": "x",
            "value": "x"
          }
        ],
        "elevatedGroups": [
          {
            "id": "x",
            "title": "x",
            "analyticsAttributes": [
              {
                "name": "x",
                "value": "x"
              }
            ],
            "baseLinks": [
              {
                "id": "x",
                "text": "x",
                "url": "x",
                "ariaLabel": "x",
                "analyticsAttributes": []
              }
            ],
            "elevatedLinks": [
              {
                "id": "x",
                "text": "x",
                "url": "x",
                "ariaLabel": "x",
                "analyticsAttributes": []
              }
            ]
          }
        ],
        "baseGroups": [
          {
            "id": "x",
            "title": "x",
            "analyticsAttributes": [
              {
                "name": "x",
                "value": "x"
              }
            ],
            "baseLinks": [
              {
                "id": "x",
                "text": "x",
                "url": "x",
                "ariaLabel": "x",
                "analyticsAttributes": []
              }
            ],
            "elevatedLinks": [
              {
                "id": "x",
                "text": "x",
                "url": "x",
                "ariaLabel": "x",
                "analyticsAttributes": []
              }
            ]
          }
        ]
      }
    ],
    "idField": "id"
  },
  {
    "entity": "geoswitcher",
    "accessor": "Geoswitcher",
    "op": "list",
    "method": "GET",
    "path": "/careers/ac-geoswitcher-data.json",
    "args": [],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "regions": [
        {
          "countries": [
            {
              "label": "x",
              "lang": "x",
              "locale": "x"
            }
          ]
        }
      ],
      "localeBasedLabels": [
        {
          "locale": "x",
          "country": "x",
          "barHeadline": "x",
          "closeButtonLabel": "x",
          "cta": "x",
          "currentlyViewing": "x",
          "modalHeadline": "x"
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "product_price",
    "accessor": "ProductPrice",
    "op": "load",
    "method": "GET",
    "path": "/{country}/shop/mcm/product-price",
    "args": [
      {
        "name": "country",
        "wire": "country",
        "value": "us"
      }
    ],
    "select": {
      "part": "v1"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "parts"
    ],
    "queryArgs": [
      {
        "name": "part",
        "wire": "parts"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "items": {}
    },
    "idField": "id"
  },
  {
    "entity": "suggestion",
    "accessor": "Suggestion",
    "op": "list",
    "method": "GET",
    "path": "/search-services/suggestions/defaultlinks/",
    "action": "defaultlink",
    "args": [],
    "select": {
      "locale": "en_US",
      "src": "globalnav"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "src",
      "locale"
    ],
    "queryArgs": [
      {
        "name": "locale",
        "wire": "locale"
      },
      {
        "name": "src",
        "wire": "src"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "id": "x",
      "results": [
        {
          "sectionName": "x",
          "sectionResults": [
            {
              "label": "x",
              "url": "x"
            }
          ]
        }
      ]
    },
    "idField": "id"
  },
  {
    "entity": "video_localization",
    "accessor": "VideoLocalization",
    "op": "load",
    "method": "GET",
    "path": "/ac/ac-video/latest/json/localization/{locale}.json",
    "args": [
      {
        "name": "locale",
        "wire": "locale",
        "value": "en-US"
      }
    ],
    "select": {},
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [],
    "queryArgs": [],
    "auth": null,
    "status": 200,
    "sample": {
      "audiotrackscontrol": "x",
      "adjustvolume": "x",
      "playpause": "x",
      "play": "x",
      "pause": "x",
      "mutevolume": "x",
      "fullscreen": "x",
      "exitfullscreen": "x",
      "airplay": "x",
      "captionscontrol": "x",
      "captionsturnedon": "x",
      "captionsturnedoff": "x",
      "subtitlescontrol": "x",
      "subtitlesturnedon": "x",
      "subtitlesturnedoff": "x",
      "share": "x",
      "elapsed": "x",
      "remaining": "x",
      "currenttimetext": "x",
      "pictureinpicture": "x",
      "exitpictureinpicture": "x",
      "closesharing": "x",
      "facebookshare": "x",
      "xshare": "x",
      "copylink": "x",
      "copyembed": "x",
      "copyarea": "x",
      "selectlink": "x",
      "selectembed": "x",
      "close": "x",
      "dismisscopy": "x",
      "replay": "x",
      "live": "x",
      "livestream": "x",
      "newwindow": "x",
      "threesixtyicon": "x",
      "threesixtyleft": "x",
      "threesixtyright": "x",
      "threesixtyup": "x",
      "threesixtydown": "x",
      "error": "x",
      "jumptochapter": "x",
      "chapter": "x",
      "minutesandseconds": "x",
      "loading": "x",
      "captionsoff": "x",
      "language": "x",
      "subtitleslanguage": "x",
      "style": "x",
      "audiotrack": "x",
      "back": "x",
      "seekslider": "x",
      "chapters": "x"
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})

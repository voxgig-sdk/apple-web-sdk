# AppleWeb SDK configuration

module AppleWebConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "AppleWeb",
        "slug" => "apple-web",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "now" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "https://www.apple.com",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "articlecategory" => {},
          "feed" => {},
          "flyout" => {},
          "geoswitcher" => {},
          "product_price" => {},
          "suggestion" => {},
          "video_localization" => {},
        },
      },
      "entity" => {
        "articlecategory" => {
          "fields" => [
            {
              "name" => "category",
              "title" => "Category",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "e.g.",
            },
            {
              "name" => "date",
              "title" => "Date",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Display date, e.g.",
            },
            {
              "name" => "description",
              "title" => "Description",
              "type" => "`$STRING`",
              "req" => true,
            },
            {
              "name" => "image",
              "title" => "Image",
              "type" => "`$OBJECT`",
              "req" => true,
              "short" => "Tile images by layout.",
            },
            {
              "name" => "link",
              "title" => "Link",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Absolute article URL.",
            },
            {
              "name" => "publishedTime",
              "title" => "Published Time",
              "type" => "`$INTEGER`",
              "req" => true,
              "short" => "Publication time in epoch milliseconds.",
              "format" => "int64",
            },
            {
              "name" => "title",
              "title" => "Title",
              "type" => "`$STRING`",
              "req" => true,
            },
          ],
          "name" => "articlecategory",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/newsroom/article.{category}.json",
                  "segments" => [
                    {
                      "lit" => "newsroom",
                    },
                    {
                      "lit" => "article.{category}.json",
                    },
                  ],
                  "parts" => [
                    "newsroom",
                    "article.{category}.json",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "category",
                        "orig" => "category",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => "photos",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "category",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "feed" => {
          "fields" => [
            {
              "name" => "headline",
              "title" => "Headline",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "e.g.",
            },
            {
              "name" => "tiles",
              "title" => "Tiles",
              "type" => "`$ARRAY`",
              "req" => true,
            },
          ],
          "name" => "feed",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/newsroom/newsroom.everydayfeed.json",
                  "segments" => [
                    {
                      "lit" => "newsroom",
                    },
                    {
                      "lit" => "newsroom.everydayfeed.json",
                    },
                  ],
                  "parts" => [
                    "newsroom",
                    "newsroom.everydayfeed.json",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
                  },
                  "args" => {},
                  "select" => {},
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "flyout" => {
          "fields" => [
            {
              "name" => "analyticsAttributes",
              "title" => "Analytics Attributes",
              "type" => "`$ARRAY`",
              "req" => true,
            },
            {
              "name" => "baseGroups",
              "title" => "Base Groups",
              "type" => "`$ARRAY`",
              "short" => "Absent on the `apple` (home) entry.",
            },
            {
              "name" => "elevatedGroups",
              "title" => "Elevated Groups",
              "type" => "`$ARRAY`",
              "short" => "Absent on the `apple` (home) entry.",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Flyout id, e.g.",
            },
            {
              "name" => "name",
              "title" => "Name",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Menu name, e.g.",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "flyout",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api-www/global-elements/global-header/v1/flyouts",
                  "segments" => [
                    {
                      "lit" => "api-www",
                    },
                    {
                      "lit" => "global-elements",
                    },
                    {
                      "lit" => "global-header",
                    },
                    {
                      "lit" => "v1",
                    },
                    {
                      "lit" => "flyouts",
                    },
                  ],
                  "parts" => [
                    "api-www",
                    "global-elements",
                    "global-header",
                    "v1",
                    "flyouts",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "locale",
                        "orig" => "locale",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "en_US",
                      },
                    ],
                  },
                  "select" => {},
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "geoswitcher" => {
          "fields" => [
            {
              "name" => "localeBasedLabels",
              "title" => "Locale Based Labels",
              "type" => "`$ARRAY`",
              "req" => true,
            },
            {
              "name" => "regions",
              "title" => "Regions",
              "type" => "`$ARRAY`",
              "req" => true,
            },
          ],
          "name" => "geoswitcher",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/careers/ac-geoswitcher-data.json",
                  "segments" => [
                    {
                      "lit" => "careers",
                    },
                    {
                      "lit" => "ac-geoswitcher-data.json",
                    },
                  ],
                  "parts" => [
                    "careers",
                    "ac-geoswitcher-data.json",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {},
                  "select" => {},
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "product_price" => {
          "fields" => [
            {
              "name" => "baseName",
              "title" => "Base Name",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "title" => "Id",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "Part number, e.g.",
            },
            {
              "name" => "name",
              "title" => "Name",
              "type" => "`$STRING`",
            },
            {
              "name" => "price",
              "title" => "Price",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "type",
              "title" => "Type",
              "type" => "`$STRING`",
              "req" => true,
              "short" => "`PART` for a known part; `UNKNOWN` when the part number is not sold in this store (then only `id` and `type` are present).",
            },
          ],
          "id" => {
            "field" => "id",
            "name" => "id",
          },
          "name" => "product_price",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/{country}/shop/mcm/product-price",
                  "segments" => [
                    {
                      "var" => "country",
                    },
                    {
                      "lit" => "shop",
                    },
                    {
                      "lit" => "mcm",
                    },
                    {
                      "lit" => "product-price",
                    },
                  ],
                  "parts" => [
                    "{country}",
                    "shop",
                    "mcm",
                    "product-price",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.items`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "country",
                        "orig" => "country",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => "us",
                      },
                    ],
                    "query" => [
                      {
                        "name" => "part",
                        "orig" => "parts",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                        "example" => "MX2D3AM/A",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "country",
                      "part",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "suggestion" => {
          "fields" => [],
          "name" => "suggestion",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/search-services/suggestions/defaultlinks/",
                  "segments" => [
                    {
                      "lit" => "search-services",
                    },
                    {
                      "lit" => "suggestions",
                    },
                    {
                      "lit" => "defaultlinks",
                    },
                  ],
                  "parts" => [
                    "search-services",
                    "suggestions",
                    "defaultlinks",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "locale",
                        "orig" => "locale",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "en_US",
                      },
                      {
                        "name" => "src",
                        "orig" => "src",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "globalnav",
                      },
                    ],
                  },
                  "select" => {
                    "$action" => "defaultlink",
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "video_localization" => {
          "fields" => [
            {
              "name" => "adjustvolume",
              "title" => "Adjustvolume",
              "type" => "`$STRING`",
            },
            {
              "name" => "airplay",
              "title" => "Airplay",
              "type" => "`$STRING`",
            },
            {
              "name" => "audiotrack",
              "title" => "Audiotrack",
              "type" => "`$STRING`",
            },
            {
              "name" => "audiotrackscontrol",
              "title" => "Audiotrackscontrol",
              "type" => "`$STRING`",
            },
            {
              "name" => "back",
              "title" => "Back",
              "type" => "`$STRING`",
            },
            {
              "name" => "captionscontrol",
              "title" => "Captionscontrol",
              "type" => "`$STRING`",
            },
            {
              "name" => "captionsoff",
              "title" => "Captionsoff",
              "type" => "`$STRING`",
            },
            {
              "name" => "captionsturnedoff",
              "title" => "Captionsturnedoff",
              "type" => "`$STRING`",
            },
            {
              "name" => "captionsturnedon",
              "title" => "Captionsturnedon",
              "type" => "`$STRING`",
            },
            {
              "name" => "chapter",
              "title" => "Chapter",
              "type" => "`$STRING`",
            },
            {
              "name" => "chapters",
              "title" => "Chapters",
              "type" => "`$STRING`",
            },
            {
              "name" => "close",
              "title" => "Close",
              "type" => "`$STRING`",
            },
            {
              "name" => "closesharing",
              "title" => "Closesharing",
              "type" => "`$STRING`",
            },
            {
              "name" => "copyarea",
              "title" => "Copyarea",
              "type" => "`$STRING`",
            },
            {
              "name" => "copyembed",
              "title" => "Copyembed",
              "type" => "`$STRING`",
            },
            {
              "name" => "copylink",
              "title" => "Copylink",
              "type" => "`$STRING`",
            },
            {
              "name" => "currenttimetext",
              "title" => "Currenttimetext",
              "type" => "`$STRING`",
            },
            {
              "name" => "dismisscopy",
              "title" => "Dismisscopy",
              "type" => "`$STRING`",
            },
            {
              "name" => "elapsed",
              "title" => "Elapsed",
              "type" => "`$STRING`",
            },
            {
              "name" => "error",
              "title" => "Error",
              "type" => "`$STRING`",
            },
            {
              "name" => "exitfullscreen",
              "title" => "Exitfullscreen",
              "type" => "`$STRING`",
            },
            {
              "name" => "exitpictureinpicture",
              "title" => "Exitpictureinpicture",
              "type" => "`$STRING`",
            },
            {
              "name" => "facebookshare",
              "title" => "Facebookshare",
              "type" => "`$STRING`",
            },
            {
              "name" => "fullscreen",
              "title" => "Fullscreen",
              "type" => "`$STRING`",
            },
            {
              "name" => "jumptochapter",
              "title" => "Jumptochapter",
              "type" => "`$STRING`",
            },
            {
              "name" => "language",
              "title" => "Language",
              "type" => "`$STRING`",
            },
            {
              "name" => "live",
              "title" => "Live",
              "type" => "`$STRING`",
            },
            {
              "name" => "livestream",
              "title" => "Livestream",
              "type" => "`$STRING`",
            },
            {
              "name" => "loading",
              "title" => "Loading",
              "type" => "`$STRING`",
            },
            {
              "name" => "minutesandseconds",
              "title" => "Minutesandseconds",
              "type" => "`$STRING`",
            },
            {
              "name" => "mutevolume",
              "title" => "Mutevolume",
              "type" => "`$STRING`",
            },
            {
              "name" => "newwindow",
              "title" => "Newwindow",
              "type" => "`$STRING`",
            },
            {
              "name" => "pause",
              "title" => "Pause",
              "type" => "`$STRING`",
            },
            {
              "name" => "pictureinpicture",
              "title" => "Pictureinpicture",
              "type" => "`$STRING`",
            },
            {
              "name" => "play",
              "title" => "Play",
              "type" => "`$STRING`",
            },
            {
              "name" => "playpause",
              "title" => "Playpause",
              "type" => "`$STRING`",
            },
            {
              "name" => "remaining",
              "title" => "Remaining",
              "type" => "`$STRING`",
            },
            {
              "name" => "replay",
              "title" => "Replay",
              "type" => "`$STRING`",
            },
            {
              "name" => "seekslider",
              "title" => "Seekslider",
              "type" => "`$STRING`",
            },
            {
              "name" => "selectembed",
              "title" => "Selectembed",
              "type" => "`$STRING`",
            },
            {
              "name" => "selectlink",
              "title" => "Selectlink",
              "type" => "`$STRING`",
            },
            {
              "name" => "share",
              "title" => "Share",
              "type" => "`$STRING`",
            },
            {
              "name" => "style",
              "title" => "Style",
              "type" => "`$STRING`",
            },
            {
              "name" => "subtitlescontrol",
              "title" => "Subtitlescontrol",
              "type" => "`$STRING`",
            },
            {
              "name" => "subtitleslanguage",
              "title" => "Subtitleslanguage",
              "type" => "`$STRING`",
            },
            {
              "name" => "subtitlesturnedoff",
              "title" => "Subtitlesturnedoff",
              "type" => "`$STRING`",
            },
            {
              "name" => "subtitlesturnedon",
              "title" => "Subtitlesturnedon",
              "type" => "`$STRING`",
            },
            {
              "name" => "threesixtydown",
              "title" => "Threesixtydown",
              "type" => "`$STRING`",
            },
            {
              "name" => "threesixtyicon",
              "title" => "Threesixtyicon",
              "type" => "`$STRING`",
            },
            {
              "name" => "threesixtyleft",
              "title" => "Threesixtyleft",
              "type" => "`$STRING`",
            },
            {
              "name" => "threesixtyright",
              "title" => "Threesixtyright",
              "type" => "`$STRING`",
            },
            {
              "name" => "threesixtyup",
              "title" => "Threesixtyup",
              "type" => "`$STRING`",
            },
            {
              "name" => "xshare",
              "title" => "Xshare",
              "type" => "`$STRING`",
            },
          ],
          "name" => "video_localization",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/ac/ac-video/latest/json/localization/{locale}.json",
                  "segments" => [
                    {
                      "lit" => "ac",
                    },
                    {
                      "lit" => "ac-video",
                    },
                    {
                      "lit" => "latest",
                    },
                    {
                      "lit" => "json",
                    },
                    {
                      "lit" => "localization",
                    },
                    {
                      "lit" => "{locale}.json",
                    },
                  ],
                  "parts" => [
                    "ac",
                    "ac-video",
                    "latest",
                    "json",
                    "localization",
                    "{locale}.json",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "params" => [
                      {
                        "name" => "locale",
                        "orig" => "locale",
                        "type" => "`$STRING`",
                        "kind" => "param",
                        "reqd" => true,
                        "example" => "en-US",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "locale",
                    ],
                  },
                  "response" => {
                    "kind" => "json",
                    "media" => "application/json",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    AppleWebFeatures.make_feature(name)
  end
end

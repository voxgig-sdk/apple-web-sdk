package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "AppleWeb",
			"slug": "apple-web",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"now": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://www.apple.com",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"articlecategory": map[string]any{},
				"feed": map[string]any{},
				"flyout": map[string]any{},
				"geoswitcher": map[string]any{},
				"product_price": map[string]any{},
				"suggestion": map[string]any{},
				"video_localization": map[string]any{},
			},
		},
		"entity": map[string]any{
			"articlecategory": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "category",
						"title": "Category",
						"type": "`$STRING`",
						"req": true,
						"short": "e.g.",
					},
					map[string]any{
						"name": "date",
						"title": "Date",
						"type": "`$STRING`",
						"req": true,
						"short": "Display date, e.g.",
					},
					map[string]any{
						"name": "description",
						"title": "Description",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "image",
						"title": "Image",
						"type": "`$OBJECT`",
						"req": true,
						"short": "Tile images by layout.",
					},
					map[string]any{
						"name": "link",
						"title": "Link",
						"type": "`$STRING`",
						"req": true,
						"short": "Absolute article URL.",
					},
					map[string]any{
						"name": "publishedTime",
						"title": "Published Time",
						"type": "`$INTEGER`",
						"req": true,
						"short": "Publication time in epoch milliseconds.",
						"format": "int64",
					},
					map[string]any{
						"name": "title",
						"title": "Title",
						"type": "`$STRING`",
						"req": true,
					},
				},
				"name": "articlecategory",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/newsroom/article.{category}.json",
								"segments": []any{
									map[string]any{
										"lit": "newsroom",
									},
									map[string]any{
										"lit": "article.{category}.json",
									},
								},
								"parts": []any{
									"newsroom",
									"article.{category}.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "category",
											"orig": "category",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "photos",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"category",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"feed": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "headline",
						"title": "Headline",
						"type": "`$STRING`",
						"req": true,
						"short": "e.g.",
					},
					map[string]any{
						"name": "tiles",
						"title": "Tiles",
						"type": "`$ARRAY`",
						"req": true,
					},
				},
				"name": "feed",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/newsroom/newsroom.everydayfeed.json",
								"segments": []any{
									map[string]any{
										"lit": "newsroom",
									},
									map[string]any{
										"lit": "newsroom.everydayfeed.json",
									},
								},
								"parts": []any{
									"newsroom",
									"newsroom.everydayfeed.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"flyout": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "analyticsAttributes",
						"title": "Analytics Attributes",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "baseGroups",
						"title": "Base Groups",
						"type": "`$ARRAY`",
						"short": "Absent on the `apple` (home) entry.",
					},
					map[string]any{
						"name": "elevatedGroups",
						"title": "Elevated Groups",
						"type": "`$ARRAY`",
						"short": "Absent on the `apple` (home) entry.",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "Flyout id, e.g.",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"req": true,
						"short": "Menu name, e.g.",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "flyout",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/api-www/global-elements/global-header/v1/flyouts",
								"segments": []any{
									map[string]any{
										"lit": "api-www",
									},
									map[string]any{
										"lit": "global-elements",
									},
									map[string]any{
										"lit": "global-header",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "flyouts",
									},
								},
								"parts": []any{
									"api-www",
									"global-elements",
									"global-header",
									"v1",
									"flyouts",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "locale",
											"orig": "locale",
											"type": "`$STRING`",
											"kind": "query",
											"example": "en_US",
										},
									},
								},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"geoswitcher": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "localeBasedLabels",
						"title": "Locale Based Labels",
						"type": "`$ARRAY`",
						"req": true,
					},
					map[string]any{
						"name": "regions",
						"title": "Regions",
						"type": "`$ARRAY`",
						"req": true,
					},
				},
				"name": "geoswitcher",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/careers/ac-geoswitcher-data.json",
								"segments": []any{
									map[string]any{
										"lit": "careers",
									},
									map[string]any{
										"lit": "ac-geoswitcher-data.json",
									},
								},
								"parts": []any{
									"careers",
									"ac-geoswitcher-data.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"product_price": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "baseName",
						"title": "Base Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"req": true,
						"short": "Part number, e.g.",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "price",
						"title": "Price",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "type",
						"title": "Type",
						"type": "`$STRING`",
						"req": true,
						"short": "`PART` for a known part; `UNKNOWN` when the part number is not sold in this store (then only `id` and `type` are present).",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "product_price",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/{country}/shop/mcm/product-price",
								"segments": []any{
									map[string]any{
										"var": "country",
									},
									map[string]any{
										"lit": "shop",
									},
									map[string]any{
										"lit": "mcm",
									},
									map[string]any{
										"lit": "product-price",
									},
								},
								"parts": []any{
									"{country}",
									"shop",
									"mcm",
									"product-price",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.items`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "country",
											"orig": "country",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "us",
										},
									},
									"query": []any{
										map[string]any{
											"name": "part",
											"orig": "parts",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
											"example": "MX2D3AM/A",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"country",
										"part",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"suggestion": map[string]any{
				"fields": []any{},
				"name": "suggestion",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/search-services/suggestions/defaultlinks/",
								"segments": []any{
									map[string]any{
										"lit": "search-services",
									},
									map[string]any{
										"lit": "suggestions",
									},
									map[string]any{
										"lit": "defaultlinks",
									},
								},
								"parts": []any{
									"search-services",
									"suggestions",
									"defaultlinks",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "locale",
											"orig": "locale",
											"type": "`$STRING`",
											"kind": "query",
											"example": "en_US",
										},
										map[string]any{
											"name": "src",
											"orig": "src",
											"type": "`$STRING`",
											"kind": "query",
											"example": "globalnav",
										},
									},
								},
								"select": map[string]any{
									"$action": "defaultlink",
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"video_localization": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "adjustvolume",
						"title": "Adjustvolume",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "airplay",
						"title": "Airplay",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "audiotrack",
						"title": "Audiotrack",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "audiotrackscontrol",
						"title": "Audiotrackscontrol",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "back",
						"title": "Back",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "captionscontrol",
						"title": "Captionscontrol",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "captionsoff",
						"title": "Captionsoff",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "captionsturnedoff",
						"title": "Captionsturnedoff",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "captionsturnedon",
						"title": "Captionsturnedon",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "chapter",
						"title": "Chapter",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "chapters",
						"title": "Chapters",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "close",
						"title": "Close",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "closesharing",
						"title": "Closesharing",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "copyarea",
						"title": "Copyarea",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "copyembed",
						"title": "Copyembed",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "copylink",
						"title": "Copylink",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "currenttimetext",
						"title": "Currenttimetext",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "dismisscopy",
						"title": "Dismisscopy",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "elapsed",
						"title": "Elapsed",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "error",
						"title": "Error",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "exitfullscreen",
						"title": "Exitfullscreen",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "exitpictureinpicture",
						"title": "Exitpictureinpicture",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "facebookshare",
						"title": "Facebookshare",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "fullscreen",
						"title": "Fullscreen",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "jumptochapter",
						"title": "Jumptochapter",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "language",
						"title": "Language",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "live",
						"title": "Live",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "livestream",
						"title": "Livestream",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "loading",
						"title": "Loading",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "minutesandseconds",
						"title": "Minutesandseconds",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "mutevolume",
						"title": "Mutevolume",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "newwindow",
						"title": "Newwindow",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "pause",
						"title": "Pause",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "pictureinpicture",
						"title": "Pictureinpicture",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "play",
						"title": "Play",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "playpause",
						"title": "Playpause",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "remaining",
						"title": "Remaining",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "replay",
						"title": "Replay",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "seekslider",
						"title": "Seekslider",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "selectembed",
						"title": "Selectembed",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "selectlink",
						"title": "Selectlink",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "share",
						"title": "Share",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "style",
						"title": "Style",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "subtitlescontrol",
						"title": "Subtitlescontrol",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "subtitleslanguage",
						"title": "Subtitleslanguage",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "subtitlesturnedoff",
						"title": "Subtitlesturnedoff",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "subtitlesturnedon",
						"title": "Subtitlesturnedon",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "threesixtydown",
						"title": "Threesixtydown",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "threesixtyicon",
						"title": "Threesixtyicon",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "threesixtyleft",
						"title": "Threesixtyleft",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "threesixtyright",
						"title": "Threesixtyright",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "threesixtyup",
						"title": "Threesixtyup",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "xshare",
						"title": "Xshare",
						"type": "`$STRING`",
					},
				},
				"name": "video_localization",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/ac/ac-video/latest/json/localization/{locale}.json",
								"segments": []any{
									map[string]any{
										"lit": "ac",
									},
									map[string]any{
										"lit": "ac-video",
									},
									map[string]any{
										"lit": "latest",
									},
									map[string]any{
										"lit": "json",
									},
									map[string]any{
										"lit": "localization",
									},
									map[string]any{
										"lit": "{locale}.json",
									},
								},
								"parts": []any{
									"ac",
									"ac-video",
									"latest",
									"json",
									"localization",
									"{locale}.json",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "locale",
											"orig": "locale",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "en-US",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"locale",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}

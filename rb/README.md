# AppleWeb Ruby SDK



The Ruby SDK for the AppleWeb API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Articlecategory` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/apple-web-sdk/tags)), or
from a clone:

```bash
git clone https://github.com/voxgig-sdk/apple-web-sdk
```

Then add it to your `Gemfile` by path, and run `bundle install`:

```ruby
gem "voxgig-sdk-apple-web-sdk", path: "./apple-web-sdk/rb"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "AppleWeb_sdk"

client = AppleWebSDK.new
```

### 2. List articlecategory records

```ruby
begin
  # list returns an Array of Articlecategory entities, one per record; data_get reads the record.
  articlecategorys = client.Articlecategory.list({ "category" => "example" })
  articlecategorys.each do |item|
    record = item.data_get
    puts "#{record["category"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  productprice = client.ProductPrice.load({ "country" => "example", "part" => "example" })
rescue => err
  warn "load failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = AppleWebSDK.test

# Entity ops return the ENTITY (raises on error);
# data_get reads its mock record.
productprice = client.ProductPrice.load({ "country" => "example", "part" => "example" })
puts productprice.data_get
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = AppleWebSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
APPLE_WEB_TEST_LIVE=TRUE
```

Then run:

```bash
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### AppleWebSDK

```ruby
require_relative "AppleWeb_sdk"
client = AppleWebSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = AppleWebSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### AppleWebSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `Articlecategory` | `(data) -> ArticlecategoryEntity` | Create an Articlecategory entity instance. |
| `Feed` | `(data) -> FeedEntity` | Create a Feed entity instance. |
| `Flyout` | `(data) -> FlyoutEntity` | Create a Flyout entity instance. |
| `Geoswitcher` | `(data) -> GeoswitcherEntity` | Create a Geoswitcher entity instance. |
| `ProductPrice` | `(data) -> ProductPriceEntity` | Create a ProductPrice entity instance. |
| `Suggestion` | `(data) -> SuggestionEntity` | Create a Suggestion entity instance. |
| `VideoLocalization` | `(data) -> VideoLocalizationEntity` | Create a VideoLocalization entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria, and return it. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all), one per record. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` an `Array` of entities, one
per record; an entity's `data_get` reads its record. On failure they raise a
`AppleWebError` (a `StandardError` subclass), so wrap calls in
`begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

### Entities

#### Articlecategory

| Field | Description |
| --- | --- |
| `category` | e.g. |
| `date` | Display date, e.g. |
| `description` |  |
| `image` | Tile images by layout. |
| `link` | Absolute article URL. |
| `publishedTime` | Publication time in epoch milliseconds. |
| `title` |  |

Operations: List.

API path: `/newsroom/article.{category}.json`

#### Feed

| Field | Description |
| --- | --- |
| `headline` | e.g. |
| `tiles` |  |

Operations: Load.

API path: `/newsroom/newsroom.everydayfeed.json`

#### Flyout

| Field | Description |
| --- | --- |
| `analyticsAttributes` |  |
| `baseGroups` | Absent on the `apple` (home) entry. |
| `elevatedGroups` | Absent on the `apple` (home) entry. |
| `id` | Flyout id, e.g. |
| `name` | Menu name, e.g. |

Operations: List.

API path: `/api-www/global-elements/global-header/v1/flyouts`

#### Geoswitcher

| Field | Description |
| --- | --- |
| `localeBasedLabels` |  |
| `regions` |  |

Operations: List.

API path: `/careers/ac-geoswitcher-data.json`

#### ProductPrice

| Field | Description |
| --- | --- |
| `baseName` |  |
| `id` | Part number, e.g. |
| `name` |  |
| `price` |  |
| `type` | `PART` for a known part; `UNKNOWN` when the part number is not sold in this store (then only `id` and `type` are present). |

Operations: Load.

API path: `/{country}/shop/mcm/product-price`

#### Suggestion

| Field | Description |
| --- | --- |

Operations: List.

API path: `/search-services/suggestions/defaultlinks/`

#### VideoLocalization

| Field | Description |
| --- | --- |
| `adjustvolume` |  |
| `airplay` |  |
| `audiotrack` |  |
| `audiotrackscontrol` |  |
| `back` |  |
| `captionscontrol` |  |
| `captionsoff` |  |
| `captionsturnedoff` |  |
| `captionsturnedon` |  |
| `chapter` |  |
| `chapters` |  |
| `close` |  |
| `closesharing` |  |
| `copyarea` |  |
| `copyembed` |  |
| `copylink` |  |
| `currenttimetext` |  |
| `dismisscopy` |  |
| `elapsed` |  |
| `error` |  |
| `exitfullscreen` |  |
| `exitpictureinpicture` |  |
| `facebookshare` |  |
| `fullscreen` |  |
| `jumptochapter` |  |
| `language` |  |
| `live` |  |
| `livestream` |  |
| `loading` |  |
| `minutesandseconds` |  |
| `mutevolume` |  |
| `newwindow` |  |
| `pause` |  |
| `pictureinpicture` |  |
| `play` |  |
| `playpause` |  |
| `remaining` |  |
| `replay` |  |
| `seekslider` |  |
| `selectembed` |  |
| `selectlink` |  |
| `share` |  |
| `style` |  |
| `subtitlescontrol` |  |
| `subtitleslanguage` |  |
| `subtitlesturnedoff` |  |
| `subtitlesturnedon` |  |
| `threesixtydown` |  |
| `threesixtyicon` |  |
| `threesixtyleft` |  |
| `threesixtyright` |  |
| `threesixtyup` |  |
| `xshare` |  |

Operations: Load.

API path: `/ac/ac-video/latest/json/localization/{locale}.json`



## Entities


### Articlecategory

Create an instance: `articlecategory = client.Articlecategory`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `category` | `String` | e.g. |
| `date` | `String` | Display date, e.g. |
| `description` | `String` |  |
| `image` | `Hash` | Tile images by layout. |
| `link` | `String` | Absolute article URL. |
| `publishedTime` | `Integer` | Publication time in epoch milliseconds. |
| `title` | `String` |  |

#### Example: List

```ruby
# list returns an Array of Articlecategory entities, one per record (raises on error).
articlecategorys = client.Articlecategory.list({ "category" => "example" })
articlecategorys.each { |item| puts item.data_get }
```


### Feed

Create an instance: `feed = client.Feed`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `headline` | `String` | e.g. |
| `tiles` | `Array` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Feed record (raises on error).
feed = client.Feed.load()
```


### Flyout

Create an instance: `flyout = client.Flyout`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `analyticsAttributes` | `Array` |  |
| `baseGroups` | `Array` | Absent on the `apple` (home) entry. |
| `elevatedGroups` | `Array` | Absent on the `apple` (home) entry. |
| `id` | `String` | Flyout id, e.g. |
| `name` | `String` | Menu name, e.g. |

#### Example: List

```ruby
# list returns an Array of Flyout entities, one per record (raises on error).
flyouts = client.Flyout.list
flyouts.each { |item| puts item.data_get }
```


### Geoswitcher

Create an instance: `geoswitcher = client.Geoswitcher`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `localeBasedLabels` | `Array` |  |
| `regions` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of Geoswitcher entities, one per record (raises on error).
geoswitchers = client.Geoswitcher.list
geoswitchers.each { |item| puts item.data_get }
```


### ProductPrice

Create an instance: `product_price = client.ProductPrice`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `baseName` | `String` |  |
| `id` | `String` | Part number, e.g. |
| `name` | `String` |  |
| `price` | `Hash` |  |
| `type` | `String` | `PART` for a known part; `UNKNOWN` when the part number is not sold in this store (then only `id` and `type` are present). |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the ProductPrice record (raises on error).
product_price = client.ProductPrice.load({ "country" => "country", "part" => "part" })
```


### Suggestion

Create an instance: `suggestion = client.Suggestion`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```ruby
# list returns an Array of Suggestion entities, one per record (raises on error).
suggestions = client.Suggestion.list
suggestions.each { |item| puts item.data_get }
```


### VideoLocalization

Create an instance: `video_localization = client.VideoLocalization`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `adjustvolume` | `String` |  |
| `airplay` | `String` |  |
| `audiotrack` | `String` |  |
| `audiotrackscontrol` | `String` |  |
| `back` | `String` |  |
| `captionscontrol` | `String` |  |
| `captionsoff` | `String` |  |
| `captionsturnedoff` | `String` |  |
| `captionsturnedon` | `String` |  |
| `chapter` | `String` |  |
| `chapters` | `String` |  |
| `close` | `String` |  |
| `closesharing` | `String` |  |
| `copyarea` | `String` |  |
| `copyembed` | `String` |  |
| `copylink` | `String` |  |
| `currenttimetext` | `String` |  |
| `dismisscopy` | `String` |  |
| `elapsed` | `String` |  |
| `error` | `String` |  |
| `exitfullscreen` | `String` |  |
| `exitpictureinpicture` | `String` |  |
| `facebookshare` | `String` |  |
| `fullscreen` | `String` |  |
| `jumptochapter` | `String` |  |
| `language` | `String` |  |
| `live` | `String` |  |
| `livestream` | `String` |  |
| `loading` | `String` |  |
| `minutesandseconds` | `String` |  |
| `mutevolume` | `String` |  |
| `newwindow` | `String` |  |
| `pause` | `String` |  |
| `pictureinpicture` | `String` |  |
| `play` | `String` |  |
| `playpause` | `String` |  |
| `remaining` | `String` |  |
| `replay` | `String` |  |
| `seekslider` | `String` |  |
| `selectembed` | `String` |  |
| `selectlink` | `String` |  |
| `share` | `String` |  |
| `style` | `String` |  |
| `subtitlescontrol` | `String` |  |
| `subtitleslanguage` | `String` |  |
| `subtitlesturnedoff` | `String` |  |
| `subtitlesturnedon` | `String` |  |
| `threesixtydown` | `String` |  |
| `threesixtyicon` | `String` |  |
| `threesixtyleft` | `String` |  |
| `threesixtyright` | `String` |  |
| `threesixtyup` | `String` |  |
| `xshare` | `String` |  |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the VideoLocalization record (raises on error).
video_localization = client.VideoLocalization.load({ "locale" => "locale" })
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Rate limiting |
| [`retry`](#retry) | Retry |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Rate limiting.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Retry.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Timeout.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── AppleWeb_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── schema.rb                  -- Generated option + entity specs
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`AppleWeb_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```ruby
productprice = client.ProductPrice
productprice.load({ "country" => "example", "part" => "example" })

# productprice.data_get now returns the productprice data from the last load
# productprice.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.

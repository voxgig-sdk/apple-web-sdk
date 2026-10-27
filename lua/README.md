# AppleWeb Lua SDK



The Lua SDK for the AppleWeb API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Articlecategory()` — each with the same small set of operations (`list`, `load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/apple-web-sdk/tags)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("apple-web_sdk")

local client = sdk.new()
```

### 2. List articlecategory records

Entity operations return `(value, err)`. For `list`, `value` is an
array of entities, one per record — iterate it directly (there is no
wrapper), and read each record with `data_get()`.

```lua
local articlecategorys, err = client:Articlecategory():list({ category = "example" })
if err then error(err) end

for _, item in ipairs(articlecategorys) do
  for k, val in pairs(item:data_get()) do print(k, val) end
end
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local productprice, err = client:ProductPrice():load({ country = "example", part = "example" })
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:ProductPrice():load({ country = "example", part = "example" })
-- result is the entity; data_get() reads its mock record; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
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
cd lua && busted test/
```


## Reference

### AppleWebSDK

```lua
local sdk = require("apple-web_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### AppleWebSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
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
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria, and return it. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria, one per record. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the entity
itself — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` | the entity, whose `data_get()` reads its record (a `table`) |
| `list` | an array (`table`) of entities, one per record |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local feed, err = client:Feed():load()
    if err then error(err) end
    -- feed is the loaded entity

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

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

Create an instance: `local articlecategory = client:Articlecategory(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `category` | `string` | e.g. |
| `date` | `string` | Display date, e.g. |
| `description` | `string` |  |
| `image` | `table` | Tile images by layout. |
| `link` | `string` | Absolute article URL. |
| `publishedTime` | `number` | Publication time in epoch milliseconds. |
| `title` | `string` |  |

#### Example: List

```lua
local articlecategorys, err = client:Articlecategory():list({ category = "example" })
```


### Feed

Create an instance: `local feed = client:Feed(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `headline` | `string` | e.g. |
| `tiles` | `table` |  |

#### Example: Load

```lua
local feed, err = client:Feed():load()
```


### Flyout

Create an instance: `local flyout = client:Flyout(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `analyticsAttributes` | `table` |  |
| `baseGroups` | `table` | Absent on the `apple` (home) entry. |
| `elevatedGroups` | `table` | Absent on the `apple` (home) entry. |
| `id` | `string` | Flyout id, e.g. |
| `name` | `string` | Menu name, e.g. |

#### Example: List

```lua
local flyouts, err = client:Flyout():list()
```


### Geoswitcher

Create an instance: `local geoswitcher = client:Geoswitcher(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `localeBasedLabels` | `table` |  |
| `regions` | `table` |  |

#### Example: List

```lua
local geoswitchers, err = client:Geoswitcher():list()
```


### ProductPrice

Create an instance: `local product_price = client:ProductPrice(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `baseName` | `string` |  |
| `id` | `string` | Part number, e.g. |
| `name` | `string` |  |
| `price` | `table` |  |
| `type` | `string` | `PART` for a known part; `UNKNOWN` when the part number is not sold in this store (then only `id` and `type` are present). |

#### Example: Load

```lua
local product_price, err = client:ProductPrice():load({ country = "country", part = "part" })
```


### Suggestion

Create an instance: `local suggestion = client:Suggestion(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```lua
local suggestions, err = client:Suggestion():list()
```


### VideoLocalization

Create an instance: `local video_localization = client:VideoLocalization(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `adjustvolume` | `string` |  |
| `airplay` | `string` |  |
| `audiotrack` | `string` |  |
| `audiotrackscontrol` | `string` |  |
| `back` | `string` |  |
| `captionscontrol` | `string` |  |
| `captionsoff` | `string` |  |
| `captionsturnedoff` | `string` |  |
| `captionsturnedon` | `string` |  |
| `chapter` | `string` |  |
| `chapters` | `string` |  |
| `close` | `string` |  |
| `closesharing` | `string` |  |
| `copyarea` | `string` |  |
| `copyembed` | `string` |  |
| `copylink` | `string` |  |
| `currenttimetext` | `string` |  |
| `dismisscopy` | `string` |  |
| `elapsed` | `string` |  |
| `error` | `string` |  |
| `exitfullscreen` | `string` |  |
| `exitpictureinpicture` | `string` |  |
| `facebookshare` | `string` |  |
| `fullscreen` | `string` |  |
| `jumptochapter` | `string` |  |
| `language` | `string` |  |
| `live` | `string` |  |
| `livestream` | `string` |  |
| `loading` | `string` |  |
| `minutesandseconds` | `string` |  |
| `mutevolume` | `string` |  |
| `newwindow` | `string` |  |
| `pause` | `string` |  |
| `pictureinpicture` | `string` |  |
| `play` | `string` |  |
| `playpause` | `string` |  |
| `remaining` | `string` |  |
| `replay` | `string` |  |
| `seekslider` | `string` |  |
| `selectembed` | `string` |  |
| `selectlink` | `string` |  |
| `share` | `string` |  |
| `style` | `string` |  |
| `subtitlescontrol` | `string` |  |
| `subtitleslanguage` | `string` |  |
| `subtitlesturnedoff` | `string` |  |
| `subtitlesturnedon` | `string` |  |
| `threesixtydown` | `string` |  |
| `threesixtyicon` | `string` |  |
| `threesixtyleft` | `string` |  |
| `threesixtyright` | `string` |  |
| `threesixtyup` | `string` |  |
| `xshare` | `string` |  |

#### Example: Load

```lua
local video_localization, err = client:VideoLocalization():load({ locale = "locale" })
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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── apple-web_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── schema.lua               -- Generated option + entity specs
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`apple-web_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```lua
local productprice = client:ProductPrice()
productprice:load({ country = "example", part = "example" })

-- productprice:data_get() now returns the productprice data from the last load
-- productprice:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.

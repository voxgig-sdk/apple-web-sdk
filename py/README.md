# AppleWeb Python SDK



The Python SDK for the AppleWeb API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Articlecategory()` — each
carrying a small, uniform set of operations (`list`, `load`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/apple-web-sdk/tags)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
from appleweb_sdk import AppleWebSDK

client = AppleWebSDK()
```

### 2. List articlecategory records

`list()` returns a `list` of entities, one per record, and raises on
error; an entity's `data_get()` reads its record (a `dict`).

```python
try:
    articlecategorys = client.Articlecategory().list({"category": "example"})
    for articlecategory in articlecategorys:
        print(articlecategory.data_get())
except Exception as err:
    print(f"list failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    productprice = client.ProductPrice().load({"country": "example", "part": "example"})
    print(productprice.data_get())
except Exception as err:
    print(f"load failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = AppleWebSDK.test()

# Entity ops return the entity, and list one per record; they raise on error.
productprice = client.ProductPrice().load({"country": "example", "part": "example"})
# data_get() on an entity reads its mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = AppleWebSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### AppleWebSDK

```python
from appleweb_sdk import AppleWebSDK

client = AppleWebSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = AppleWebSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### AppleWebSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria, one per record. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` a `list` of entities, one
per record; an entity's `data_get()` reads its record (a `dict`). They raise
on error, so wrap calls in `try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `articlecategory = client.Articlecategory()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `category` | `str` | e.g. |
| `date` | `str` | Display date, e.g. |
| `description` | `str` |  |
| `image` | `dict` | Tile images by layout. |
| `link` | `str` | Absolute article URL. |
| `publishedTime` | `int` | Publication time in epoch milliseconds. |
| `title` | `str` |  |

#### Example: List

```python
articlecategorys = client.Articlecategory().list({"category": "example"})
```


### Feed

Create an instance: `feed = client.Feed()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `headline` | `str` | e.g. |
| `tiles` | `list` |  |

#### Example: Load

```python
feed = client.Feed().load()
```


### Flyout

Create an instance: `flyout = client.Flyout()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `analyticsAttributes` | `list` |  |
| `baseGroups` | `list` | Absent on the `apple` (home) entry. |
| `elevatedGroups` | `list` | Absent on the `apple` (home) entry. |
| `id` | `str` | Flyout id, e.g. |
| `name` | `str` | Menu name, e.g. |

#### Example: List

```python
flyouts = client.Flyout().list()
```


### Geoswitcher

Create an instance: `geoswitcher = client.Geoswitcher()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `localeBasedLabels` | `list` |  |
| `regions` | `list` |  |

#### Example: List

```python
geoswitchers = client.Geoswitcher().list()
```


### ProductPrice

Create an instance: `product_price = client.ProductPrice()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `baseName` | `str` |  |
| `id` | `str` | Part number, e.g. |
| `name` | `str` |  |
| `price` | `dict` |  |
| `type` | `str` | `PART` for a known part; `UNKNOWN` when the part number is not sold in this store (then only `id` and `type` are present). |

#### Example: Load

```python
product_price = client.ProductPrice().load({"country": "country", "part": "part"})
```


### Suggestion

Create an instance: `suggestion = client.Suggestion()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |

#### Example: List

```python
suggestions = client.Suggestion().list()
```


### VideoLocalization

Create an instance: `video_localization = client.VideoLocalization()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `adjustvolume` | `str` |  |
| `airplay` | `str` |  |
| `audiotrack` | `str` |  |
| `audiotrackscontrol` | `str` |  |
| `back` | `str` |  |
| `captionscontrol` | `str` |  |
| `captionsoff` | `str` |  |
| `captionsturnedoff` | `str` |  |
| `captionsturnedon` | `str` |  |
| `chapter` | `str` |  |
| `chapters` | `str` |  |
| `close` | `str` |  |
| `closesharing` | `str` |  |
| `copyarea` | `str` |  |
| `copyembed` | `str` |  |
| `copylink` | `str` |  |
| `currenttimetext` | `str` |  |
| `dismisscopy` | `str` |  |
| `elapsed` | `str` |  |
| `error` | `str` |  |
| `exitfullscreen` | `str` |  |
| `exitpictureinpicture` | `str` |  |
| `facebookshare` | `str` |  |
| `fullscreen` | `str` |  |
| `jumptochapter` | `str` |  |
| `language` | `str` |  |
| `live` | `str` |  |
| `livestream` | `str` |  |
| `loading` | `str` |  |
| `minutesandseconds` | `str` |  |
| `mutevolume` | `str` |  |
| `newwindow` | `str` |  |
| `pause` | `str` |  |
| `pictureinpicture` | `str` |  |
| `play` | `str` |  |
| `playpause` | `str` |  |
| `remaining` | `str` |  |
| `replay` | `str` |  |
| `seekslider` | `str` |  |
| `selectembed` | `str` |  |
| `selectlink` | `str` |  |
| `share` | `str` |  |
| `style` | `str` |  |
| `subtitlescontrol` | `str` |  |
| `subtitleslanguage` | `str` |  |
| `subtitlesturnedoff` | `str` |  |
| `subtitlesturnedon` | `str` |  |
| `threesixtydown` | `str` |  |
| `threesixtyicon` | `str` |  |
| `threesixtyleft` | `str` |  |
| `threesixtyright` | `str` |  |
| `threesixtyup` | `str` |  |
| `xshare` | `str` |  |

#### Example: Load

```python
video_localization = client.VideoLocalization().load({"locale": "locale"})
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── appleweb_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── schema.py                    -- Generated option + entity specs
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`appleweb_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
productprice = client.ProductPrice()
productprice.load({"country": "example", "part": "example"})

# productprice.data_get() now returns the productprice data from the last load
# productprice.match_get() returns the last match criteria
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

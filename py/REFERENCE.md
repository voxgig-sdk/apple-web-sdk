# AppleWeb Python SDK Reference

Complete API reference for the AppleWeb Python SDK.


## AppleWebSDK

### Constructor

```python
from appleweb_sdk import AppleWebSDK

client = AppleWebSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `AppleWebSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = AppleWebSDK.test()
```


### Instance Methods

#### `Articlecategory(data=None)`

Create a new `ArticlecategoryEntity` instance. Pass `None` for no initial data.

#### `Feed(data=None)`

Create a new `FeedEntity` instance. Pass `None` for no initial data.

#### `Flyout(data=None)`

Create a new `FlyoutEntity` instance. Pass `None` for no initial data.

#### `Geoswitcher(data=None)`

Create a new `GeoswitcherEntity` instance. Pass `None` for no initial data.

#### `ProductPrice(data=None)`

Create a new `ProductPriceEntity` instance. Pass `None` for no initial data.

#### `Suggestion(data=None)`

Create a new `SuggestionEntity` instance. Pass `None` for no initial data.

#### `VideoLocalization(data=None)`

Create a new `VideoLocalizationEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## ArticlecategoryEntity

```python
articlecategory = client.Articlecategory()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | `str` | Yes | e.g. |
| `date` | `str` | Yes | Display date, e.g. |
| `description` | `str` | Yes |  |
| `image` | `dict` | Yes | Tile images by layout. |
| `link` | `str` | Yes | Absolute article URL. |
| `publishedTime` | `int` | Yes | Publication time in epoch milliseconds. |
| `title` | `str` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ArticlecategoryEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Articlecategory().list({"category": "example"})
for articlecategory in results:
    print(articlecategory.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ArticlecategoryEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FeedEntity

```python
feed = client.Feed()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `headline` | `str` | Yes | e.g. |
| `tiles` | `list` | Yes |  |

### Operations

#### `load(reqmatch, ctrl=None) -> FeedEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.Feed().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FeedEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FlyoutEntity

```python
flyout = client.Flyout()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `analyticsAttributes` | `list` | Yes |  |
| `baseGroups` | `list` | No | Absent on the `apple` (home) entry. |
| `elevatedGroups` | `list` | No | Absent on the `apple` (home) entry. |
| `id` | `str` | Yes | Flyout id, e.g. |
| `name` | `str` | Yes | Menu name, e.g. |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[FlyoutEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Flyout().list()
for flyout in results:
    print(flyout.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FlyoutEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GeoswitcherEntity

```python
geoswitcher = client.Geoswitcher()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `localeBasedLabels` | `list` | Yes |  |
| `regions` | `list` | Yes |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[GeoswitcherEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Geoswitcher().list()
for geoswitcher in results:
    print(geoswitcher.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GeoswitcherEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ProductPriceEntity

```python
product_price = client.ProductPrice()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `baseName` | `str` | No |  |
| `id` | `str` | Yes | Part number, e.g. |
| `name` | `str` | No |  |
| `price` | `dict` | No |  |
| `type` | `str` | Yes | `PART` for a known part; `UNKNOWN` when the part number is not sold in this store (then only `id` and `type` are present). |

### Operations

#### `load(reqmatch, ctrl=None) -> ProductPriceEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.ProductPrice().load({"country": "country", "part": "part"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProductPriceEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SuggestionEntity

```python
suggestion = client.Suggestion()
```

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[SuggestionEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Suggestion().list()
for suggestion in results:
    print(suggestion.data_get())
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SuggestionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VideoLocalizationEntity

```python
video_localization = client.VideoLocalization()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `adjustvolume` | `str` | No |  |
| `airplay` | `str` | No |  |
| `audiotrack` | `str` | No |  |
| `audiotrackscontrol` | `str` | No |  |
| `back` | `str` | No |  |
| `captionscontrol` | `str` | No |  |
| `captionsoff` | `str` | No |  |
| `captionsturnedoff` | `str` | No |  |
| `captionsturnedon` | `str` | No |  |
| `chapter` | `str` | No |  |
| `chapters` | `str` | No |  |
| `close` | `str` | No |  |
| `closesharing` | `str` | No |  |
| `copyarea` | `str` | No |  |
| `copyembed` | `str` | No |  |
| `copylink` | `str` | No |  |
| `currenttimetext` | `str` | No |  |
| `dismisscopy` | `str` | No |  |
| `elapsed` | `str` | No |  |
| `error` | `str` | No |  |
| `exitfullscreen` | `str` | No |  |
| `exitpictureinpicture` | `str` | No |  |
| `facebookshare` | `str` | No |  |
| `fullscreen` | `str` | No |  |
| `jumptochapter` | `str` | No |  |
| `language` | `str` | No |  |
| `live` | `str` | No |  |
| `livestream` | `str` | No |  |
| `loading` | `str` | No |  |
| `minutesandseconds` | `str` | No |  |
| `mutevolume` | `str` | No |  |
| `newwindow` | `str` | No |  |
| `pause` | `str` | No |  |
| `pictureinpicture` | `str` | No |  |
| `play` | `str` | No |  |
| `playpause` | `str` | No |  |
| `remaining` | `str` | No |  |
| `replay` | `str` | No |  |
| `seekslider` | `str` | No |  |
| `selectembed` | `str` | No |  |
| `selectlink` | `str` | No |  |
| `share` | `str` | No |  |
| `style` | `str` | No |  |
| `subtitlescontrol` | `str` | No |  |
| `subtitleslanguage` | `str` | No |  |
| `subtitlesturnedoff` | `str` | No |  |
| `subtitlesturnedon` | `str` | No |  |
| `threesixtydown` | `str` | No |  |
| `threesixtyicon` | `str` | No |  |
| `threesixtyleft` | `str` | No |  |
| `threesixtyright` | `str` | No |  |
| `threesixtyup` | `str` | No |  |
| `xshare` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> VideoLocalizationEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

```python
result = client.VideoLocalization().load({"locale": "locale"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VideoLocalizationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```python
client = AppleWebSDK({
    "feature": {
        "ratelimit": {"active": True},
        "retry": {"active": True},
        "test": {"active": True},
        "timeout": {"active": True},
    },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `ratelimit`

Rate limiting.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Retry.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Timeout.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `now` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.


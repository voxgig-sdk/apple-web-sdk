# AppleWeb Ruby SDK Reference

Complete API reference for the AppleWeb Ruby SDK.


## AppleWebSDK

### Constructor

```ruby
require_relative 'AppleWeb_sdk'

client = AppleWebSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `AppleWebSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = AppleWebSDK.test
```


### Instance Methods

#### `Articlecategory(data = nil)`

Create a new `Articlecategory` entity instance. Pass `nil` for no initial data.

#### `Feed(data = nil)`

Create a new `Feed` entity instance. Pass `nil` for no initial data.

#### `Flyout(data = nil)`

Create a new `Flyout` entity instance. Pass `nil` for no initial data.

#### `Geoswitcher(data = nil)`

Create a new `Geoswitcher` entity instance. Pass `nil` for no initial data.

#### `ProductPrice(data = nil)`

Create a new `ProductPrice` entity instance. Pass `nil` for no initial data.

#### `Suggestion(data = nil)`

Create a new `Suggestion` entity instance. Pass `nil` for no initial data.

#### `VideoLocalization(data = nil)`

Create a new `VideoLocalization` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## ArticlecategoryEntity

```ruby
articlecategory = client.Articlecategory
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | `String` | Yes | e.g. |
| `date` | `String` | Yes | Display date, e.g. |
| `description` | `String` | Yes |  |
| `image` | `Hash` | Yes | Tile images by layout. |
| `link` | `String` | Yes | Absolute article URL. |
| `publishedTime` | `Integer` | Yes | Publication time in epoch milliseconds. |
| `title` | `String` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Articlecategory.list({ "category" => "example" })
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ArticlecategoryEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## FeedEntity

```ruby
feed = client.Feed
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `headline` | `String` | Yes | e.g. |
| `tiles` | `Array` | Yes |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.Feed.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `FeedEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## FlyoutEntity

```ruby
flyout = client.Flyout
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `analyticsAttributes` | `Array` | Yes |  |
| `baseGroups` | `Array` | No | Absent on the `apple` (home) entry. |
| `elevatedGroups` | `Array` | No | Absent on the `apple` (home) entry. |
| `id` | `String` | Yes | Flyout id, e.g. |
| `name` | `String` | Yes | Menu name, e.g. |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Flyout.list
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `FlyoutEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## GeoswitcherEntity

```ruby
geoswitcher = client.Geoswitcher
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `localeBasedLabels` | `Array` | Yes |  |
| `regions` | `Array` | Yes |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Geoswitcher.list
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GeoswitcherEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ProductPriceEntity

```ruby
product_price = client.ProductPrice
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `baseName` | `String` | No |  |
| `id` | `String` | Yes | Part number, e.g. |
| `name` | `String` | No |  |
| `price` | `Hash` | No |  |
| `type` | `String` | Yes | `PART` for a known part; `UNKNOWN` when the part number is not sold in this store (then only `id` and `type` are present). |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.ProductPrice.load({ "country" => "country", "part" => "part" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ProductPriceEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SuggestionEntity

```ruby
suggestion = client.Suggestion
```

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record; `data_get` reads each record. Raises on error.

```ruby
results = client.Suggestion.list
results.each { |item| puts item.data_get }
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SuggestionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## VideoLocalizationEntity

```ruby
video_localization = client.VideoLocalization
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `adjustvolume` | `String` | No |  |
| `airplay` | `String` | No |  |
| `audiotrack` | `String` | No |  |
| `audiotrackscontrol` | `String` | No |  |
| `back` | `String` | No |  |
| `captionscontrol` | `String` | No |  |
| `captionsoff` | `String` | No |  |
| `captionsturnedoff` | `String` | No |  |
| `captionsturnedon` | `String` | No |  |
| `chapter` | `String` | No |  |
| `chapters` | `String` | No |  |
| `close` | `String` | No |  |
| `closesharing` | `String` | No |  |
| `copyarea` | `String` | No |  |
| `copyembed` | `String` | No |  |
| `copylink` | `String` | No |  |
| `currenttimetext` | `String` | No |  |
| `dismisscopy` | `String` | No |  |
| `elapsed` | `String` | No |  |
| `error` | `String` | No |  |
| `exitfullscreen` | `String` | No |  |
| `exitpictureinpicture` | `String` | No |  |
| `facebookshare` | `String` | No |  |
| `fullscreen` | `String` | No |  |
| `jumptochapter` | `String` | No |  |
| `language` | `String` | No |  |
| `live` | `String` | No |  |
| `livestream` | `String` | No |  |
| `loading` | `String` | No |  |
| `minutesandseconds` | `String` | No |  |
| `mutevolume` | `String` | No |  |
| `newwindow` | `String` | No |  |
| `pause` | `String` | No |  |
| `pictureinpicture` | `String` | No |  |
| `play` | `String` | No |  |
| `playpause` | `String` | No |  |
| `remaining` | `String` | No |  |
| `replay` | `String` | No |  |
| `seekslider` | `String` | No |  |
| `selectembed` | `String` | No |  |
| `selectlink` | `String` | No |  |
| `share` | `String` | No |  |
| `style` | `String` | No |  |
| `subtitlescontrol` | `String` | No |  |
| `subtitleslanguage` | `String` | No |  |
| `subtitlesturnedoff` | `String` | No |  |
| `subtitlesturnedon` | `String` | No |  |
| `threesixtydown` | `String` | No |  |
| `threesixtyicon` | `String` | No |  |
| `threesixtyleft` | `String` | No |  |
| `threesixtyright` | `String` | No |  |
| `threesixtyup` | `String` | No |  |
| `xshare` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get` reads, and raises on error.

```ruby
result = client.VideoLocalization.load({ "locale" => "locale" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `VideoLocalizationEntity` instance with the same client and
options.

#### `get_name -> String`

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

```ruby
client = AppleWebSDK.new({
  "feature" => {
    "ratelimit" => { "active" => true },
    "retry" => { "active" => true },
    "test" => { "active" => true },
    "timeout" => { "active" => true },
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


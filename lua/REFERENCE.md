# AppleWeb Lua SDK Reference

Complete API reference for the AppleWeb Lua SDK.


## AppleWebSDK

### Constructor

```lua
local sdk = require("apple-web_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Articlecategory(data)`

Create a new `Articlecategory` entity instance. Pass `nil` for no initial data.

#### `Feed(data)`

Create a new `Feed` entity instance. Pass `nil` for no initial data.

#### `Flyout(data)`

Create a new `Flyout` entity instance. Pass `nil` for no initial data.

#### `Geoswitcher(data)`

Create a new `Geoswitcher` entity instance. Pass `nil` for no initial data.

#### `ProductPrice(data)`

Create a new `ProductPrice` entity instance. Pass `nil` for no initial data.

#### `Suggestion(data)`

Create a new `Suggestion` entity instance. Pass `nil` for no initial data.

#### `VideoLocalization(data)`

Create a new `VideoLocalization` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## ArticlecategoryEntity

```lua
local articlecategory = client:Articlecategory(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | `string` | Yes | e.g. |
| `date` | `string` | Yes | Display date, e.g. |
| `description` | `string` | Yes |  |
| `image` | `table` | Yes | Tile images by layout. |
| `link` | `string` | Yes | Absolute article URL. |
| `publishedTime` | `number` | Yes | Publication time in epoch milliseconds. |
| `title` | `string` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Articlecategory():list({ category = "example" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ArticlecategoryEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## FeedEntity

```lua
local feed = client:Feed(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `headline` | `string` | Yes | e.g. |
| `tiles` | `table` | Yes |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:Feed():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FeedEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## FlyoutEntity

```lua
local flyout = client:Flyout(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `analyticsAttributes` | `table` | Yes |  |
| `baseGroups` | `table` | No | Absent on the `apple` (home) entry. |
| `elevatedGroups` | `table` | No | Absent on the `apple` (home) entry. |
| `id` | `string` | Yes | Flyout id, e.g. |
| `name` | `string` | Yes | Menu name, e.g. |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Flyout():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FlyoutEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## GeoswitcherEntity

```lua
local geoswitcher = client:Geoswitcher(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `localeBasedLabels` | `table` | Yes |  |
| `regions` | `table` | Yes |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Geoswitcher():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GeoswitcherEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ProductPriceEntity

```lua
local product_price = client:ProductPrice(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `baseName` | `string` | No |  |
| `id` | `string` | Yes | Part number, e.g. |
| `name` | `string` | No |  |
| `price` | `table` | No |  |
| `type` | `string` | Yes | `PART` for a known part; `UNKNOWN` when the part number is not sold in this store (then only `id` and `type` are present). |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:ProductPrice():load({ country = "country", part = "part" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ProductPriceEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SuggestionEntity

```lua
local suggestion = client:Suggestion(nil)
```

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array of entities, one per record, or `nil` and an error on failure.

```lua
local results, err = client:Suggestion():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SuggestionEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## VideoLocalizationEntity

```lua
local video_localization = client:VideoLocalization(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `adjustvolume` | `string` | No |  |
| `airplay` | `string` | No |  |
| `audiotrack` | `string` | No |  |
| `audiotrackscontrol` | `string` | No |  |
| `back` | `string` | No |  |
| `captionscontrol` | `string` | No |  |
| `captionsoff` | `string` | No |  |
| `captionsturnedoff` | `string` | No |  |
| `captionsturnedon` | `string` | No |  |
| `chapter` | `string` | No |  |
| `chapters` | `string` | No |  |
| `close` | `string` | No |  |
| `closesharing` | `string` | No |  |
| `copyarea` | `string` | No |  |
| `copyembed` | `string` | No |  |
| `copylink` | `string` | No |  |
| `currenttimetext` | `string` | No |  |
| `dismisscopy` | `string` | No |  |
| `elapsed` | `string` | No |  |
| `error` | `string` | No |  |
| `exitfullscreen` | `string` | No |  |
| `exitpictureinpicture` | `string` | No |  |
| `facebookshare` | `string` | No |  |
| `fullscreen` | `string` | No |  |
| `jumptochapter` | `string` | No |  |
| `language` | `string` | No |  |
| `live` | `string` | No |  |
| `livestream` | `string` | No |  |
| `loading` | `string` | No |  |
| `minutesandseconds` | `string` | No |  |
| `mutevolume` | `string` | No |  |
| `newwindow` | `string` | No |  |
| `pause` | `string` | No |  |
| `pictureinpicture` | `string` | No |  |
| `play` | `string` | No |  |
| `playpause` | `string` | No |  |
| `remaining` | `string` | No |  |
| `replay` | `string` | No |  |
| `seekslider` | `string` | No |  |
| `selectembed` | `string` | No |  |
| `selectlink` | `string` | No |  |
| `share` | `string` | No |  |
| `style` | `string` | No |  |
| `subtitlescontrol` | `string` | No |  |
| `subtitleslanguage` | `string` | No |  |
| `subtitlesturnedoff` | `string` | No |  |
| `subtitlesturnedon` | `string` | No |  |
| `threesixtydown` | `string` | No |  |
| `threesixtyicon` | `string` | No |  |
| `threesixtyleft` | `string` | No |  |
| `threesixtyright` | `string` | No |  |
| `threesixtyup` | `string` | No |  |
| `xshare` | `string` | No |  |

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, or `nil` and an error on failure.

```lua
local result, err = client:VideoLocalization():load({ locale = "locale" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VideoLocalizationEntity` instance with the same client and
options.

#### `get_name() -> string`

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

```lua
local client = sdk.new({
  feature = {
    ratelimit = { active = true },
    retry = { active = true },
    test = { active = true },
    timeout = { active = true },
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


# AppleWeb PHP SDK Reference

Complete API reference for the AppleWeb PHP SDK.


## AppleWebSDK

### Constructor

```php
require_once __DIR__ . '/appleweb_sdk.php';

$client = new AppleWebSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `AppleWebSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = AppleWebSDK::test();
```


### Instance Methods

#### `Articlecategory($data = null)`

Create a new `ArticlecategoryEntity` instance. Pass `null` for no initial data.

#### `Feed($data = null)`

Create a new `FeedEntity` instance. Pass `null` for no initial data.

#### `Flyout($data = null)`

Create a new `FlyoutEntity` instance. Pass `null` for no initial data.

#### `Geoswitcher($data = null)`

Create a new `GeoswitcherEntity` instance. Pass `null` for no initial data.

#### `ProductPrice($data = null)`

Create a new `ProductPriceEntity` instance. Pass `null` for no initial data.

#### `Suggestion($data = null)`

Create a new `SuggestionEntity` instance. Pass `null` for no initial data.

#### `VideoLocalization($data = null)`

Create a new `VideoLocalizationEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): AppleWebUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## ArticlecategoryEntity

```php
$articlecategory = $client->Articlecategory();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `category` | `string` | Yes | e.g. |
| `date` | `string` | Yes | Display date, e.g. |
| `description` | `string` | Yes |  |
| `image` | `array` | Yes | Tile images by layout. |
| `link` | `string` | Yes | Absolute article URL. |
| `publishedTime` | `int` | Yes | Publication time in epoch milliseconds. |
| `title` | `string` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Articlecategory()->list(["category" => "example"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ArticlecategoryEntity`

Create a new `ArticlecategoryEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## FeedEntity

```php
$feed = $client->Feed();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `headline` | `string` | Yes | e.g. |
| `tiles` | `array` | Yes |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->Feed()->load();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): FeedEntity`

Create a new `FeedEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## FlyoutEntity

```php
$flyout = $client->Flyout();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `analyticsAttributes` | `array` | Yes |  |
| `baseGroups` | `array` | No | Absent on the `apple` (home) entry. |
| `elevatedGroups` | `array` | No | Absent on the `apple` (home) entry. |
| `id` | `string` | Yes | Flyout id, e.g. |
| `name` | `string` | Yes | Menu name, e.g. |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Flyout()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): FlyoutEntity`

Create a new `FlyoutEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## GeoswitcherEntity

```php
$geoswitcher = $client->Geoswitcher();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `localeBasedLabels` | `array` | Yes |  |
| `regions` | `array` | Yes |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Geoswitcher()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): GeoswitcherEntity`

Create a new `GeoswitcherEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ProductPriceEntity

```php
$product_price = $client->ProductPrice();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `baseName` | `string` | No |  |
| `id` | `string` | Yes | Part number, e.g. |
| `name` | `string` | No |  |
| `price` | `array` | No |  |
| `type` | `string` | Yes | `PART` for a known part; `UNKNOWN` when the part number is not sold in this store (then only `id` and `type` are present). |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->ProductPrice()->load(["country" => "country", "part" => "part"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ProductPriceEntity`

Create a new `ProductPriceEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SuggestionEntity

```php
$suggestion = $client->Suggestion();
```

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Suggestion()->list();
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SuggestionEntity`

Create a new `SuggestionEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## VideoLocalizationEntity

```php
$video_localization = $client->VideoLocalization();
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

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

```php
$result = $client->VideoLocalization()->load(["locale" => "locale"]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): VideoLocalizationEntity`

Create a new `VideoLocalizationEntity` instance with the same client and
options.

#### `get_name(): string`

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

```php
$client = new AppleWebSDK([
  "feature" => [
    "ratelimit" => ["active" => true],
    "retry" => ["active" => true],
    "test" => ["active" => true],
    "timeout" => ["active" => true],
  ],
]);
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


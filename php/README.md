# AppleWeb PHP SDK



The PHP SDK for the AppleWeb API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Articlecategory()` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/apple-web-sdk/tags)), or
from a clone as a Composer path repository:

```bash
git clone https://github.com/voxgig-sdk/apple-web-sdk
composer config repositories.apple-web-sdk path ./apple-web-sdk/php
composer require voxgig-sdk/apple-web-sdk:@dev
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'appleweb_sdk.php';

$client = new AppleWebSDK();
```

### 2. List articlecategory records

```php
try {
    // list() returns entity instances; data_get() reads each record.
    $articlecategorys = $client->Articlecategory()->list(["category" => "example"]);
    foreach ($articlecategorys as $record) {
        $item = $record->data_get();
        echo $item["category"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $productprice = $client->ProductPrice()->load(["country" => "example", "part" => "example"]);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = AppleWebSDK::test();

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
$productprice = $client->ProductPrice()->load(["country" => "example", "part" => "example"]);
print_r($productprice->data_get());
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new AppleWebSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
APPLE_WEB_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### AppleWebSDK

```php
require_once 'appleweb_sdk.php';
$client = new AppleWebSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = AppleWebSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### AppleWebSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Articlecategory` | `($data): ArticlecategoryEntity` | Create an Articlecategory entity instance. |
| `Feed` | `($data): FeedEntity` | Create a Feed entity instance. |
| `Flyout` | `($data): FlyoutEntity` | Create a Flyout entity instance. |
| `Geoswitcher` | `($data): GeoswitcherEntity` | Create a Geoswitcher entity instance. |
| `ProductPrice` | `($data): ProductPriceEntity` | Create a ProductPrice entity instance. |
| `Suggestion` | `($data): SuggestionEntity` | Create a Suggestion entity instance. |
| `VideoLocalization` | `($data): VideoLocalizationEntity` | Create a VideoLocalization entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): mixed` | Load a single entity by match criteria, and return it. |
| `list` | `(?array $reqmatch = null, $ctrl): mixed` | List entities matching the criteria (call with no argument to list all), one per record. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the entity, and `list` an `array` of entities, one
per record; an entity's `data_get()` reads its record (an `array`). They
throw on error, so wrap calls in `try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Create an instance: `$articlecategory = $client->Articlecategory();`

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
| `image` | `array` | Tile images by layout. |
| `link` | `string` | Absolute article URL. |
| `publishedTime` | `int` | Publication time in epoch milliseconds. |
| `title` | `string` |  |

#### Example: List

```php
// list() returns an array of Articlecategory entities, one per record (throws on error).
$articlecategorys = $client->Articlecategory()->list(["category" => "example"]);
```


### Feed

Create an instance: `$feed = $client->Feed();`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `headline` | `string` | e.g. |
| `tiles` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Feed record (throws on error).
$feed = $client->Feed()->load();
```


### Flyout

Create an instance: `$flyout = $client->Flyout();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `analyticsAttributes` | `array` |  |
| `baseGroups` | `array` | Absent on the `apple` (home) entry. |
| `elevatedGroups` | `array` | Absent on the `apple` (home) entry. |
| `id` | `string` | Flyout id, e.g. |
| `name` | `string` | Menu name, e.g. |

#### Example: List

```php
// list() returns an array of Flyout entities, one per record (throws on error).
$flyouts = $client->Flyout()->list();
```


### Geoswitcher

Create an instance: `$geoswitcher = $client->Geoswitcher();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `localeBasedLabels` | `array` |  |
| `regions` | `array` |  |

#### Example: List

```php
// list() returns an array of Geoswitcher entities, one per record (throws on error).
$geoswitchers = $client->Geoswitcher()->list();
```


### ProductPrice

Create an instance: `$product_price = $client->ProductPrice();`

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
| `price` | `array` |  |
| `type` | `string` | `PART` for a known part; `UNKNOWN` when the part number is not sold in this store (then only `id` and `type` are present). |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the ProductPrice record (throws on error).
$product_price = $client->ProductPrice()->load(["country" => "country", "part" => "part"]);
```


### Suggestion

Create an instance: `$suggestion = $client->Suggestion();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```php
// list() returns an array of Suggestion entities, one per record (throws on error).
$suggestions = $client->Suggestion()->list();
```


### VideoLocalization

Create an instance: `$video_localization = $client->VideoLocalization();`

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

```php
// load() returns the ENTITY — call data_get() for the VideoLocalization record (throws on error).
$video_localization = $client->VideoLocalization()->load(["locale" => "locale"]);
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

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── appleweb_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── schema.php                     -- Generated option + entity specs
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`appleweb_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$productprice = $client->ProductPrice();
$productprice->load(["country" => "example", "part" => "example"]);

// $productprice->data_get() now returns the productprice data from the last load
// $productprice->match_get() returns the last match criteria
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

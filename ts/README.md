# AppleWeb TypeScript SDK



The TypeScript SDK for the AppleWeb API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Articlecategory()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`, see [Tags](https://github.com/voxgig-sdk/apple-web-sdk/tags)), or from a
clone, which carries the compiled `dist/`:

```bash
git clone https://github.com/voxgig-sdk/apple-web-sdk
npm install ./apple-web-sdk/ts
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { AppleWebSDK } from '@voxgig-sdk/apple-web-sdk'

const client = new AppleWebSDK()
```

### 2. List articlecategory records

`list()` resolves to an array of Articlecategory ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const articlecategorys = await client.Articlecategory().list({ category: "example" })

for (const articlecategory of articlecategorys) {
  console.log(articlecategory.data())
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const productprice = await client.ProductPrice().load({ country: "example", part: "example" })
  console.log(productprice.data())
} catch (err) {
  console.error('load failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
result envelope. Branch on `ok`; on failure `status` holds the HTTP status
(for error responses) and `err` holds the error:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (!result.ok) {
  console.error('request failed:', result.status, result.err)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = AppleWebSDK.test()

const productprice = await client.ProductPrice().load({ country: 'example_country', part: 'example_part' })
// productprice is the ProductPrice entity; .data() reads its mock record
console.log(productprice.data())
```

You can also use the instance method:

```ts
const client = new AppleWebSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.ProductPrice()

// First call runs the operation and stores its result
await entity.load({ country: 'example_country', part: 'example_part' })

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new AppleWebSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
APPLE_WEB_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```

Live entity tests continue independent operations after errors and attempt
supported cleanup. Their final result reports failures and missing prerequisites
after the remaining work completes. The model and test inputs determine which
API operations the generated scenarios cover.


## Reference

### AppleWebSDK

#### Constructor

```ts
new AppleWebSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Articlecategory(data?)` | `ArticlecategoryEntity` | Create an Articlecategory entity instance. |
| `Feed(data?)` | `FeedEntity` | Create a Feed entity instance. |
| `Flyout(data?)` | `FlyoutEntity` | Create a Flyout entity instance. |
| `Geoswitcher(data?)` | `GeoswitcherEntity` | Create a Geoswitcher entity instance. |
| `ProductPrice(data?)` | `ProductPriceEntity` | Create a ProductPrice entity instance. |
| `Suggestion(data?)` | `SuggestionEntity` | Create a Suggestion entity instance. |
| `VideoLocalization(data?)` | `VideoLocalizationEntity` | Create a VideoLocalization entity instance. |
| `tester(testopts?, sdkopts?)` | `AppleWebSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `AppleWebSDK.test(testopts?, sdkopts?)` | `AppleWebSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria, and return it. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria, one per record. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): AppleWebSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity itself — there is no result
envelope, and an entity's `data()` reads its record:

- `load` resolves to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

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

Operations: list.

API path: `/newsroom/article.{category}.json`

#### Feed

| Field | Description |
| --- | --- |
| `headline` | e.g. |
| `tiles` |  |

Operations: load.

API path: `/newsroom/newsroom.everydayfeed.json`

#### Flyout

| Field | Description |
| --- | --- |
| `analyticsAttributes` |  |
| `baseGroups` | Absent on the `apple` (home) entry. |
| `elevatedGroups` | Absent on the `apple` (home) entry. |
| `id` | Flyout id, e.g. |
| `name` | Menu name, e.g. |

Operations: list.

API path: `/api-www/global-elements/global-header/v1/flyouts`

#### Geoswitcher

| Field | Description |
| --- | --- |
| `localeBasedLabels` |  |
| `regions` |  |

Operations: list.

API path: `/careers/ac-geoswitcher-data.json`

#### ProductPrice

| Field | Description |
| --- | --- |
| `baseName` |  |
| `id` | Part number, e.g. |
| `name` |  |
| `price` |  |
| `type` | `PART` for a known part; `UNKNOWN` when the part number is not sold in this store (then only `id` and `type` are present). |

Operations: load.

API path: `/{country}/shop/mcm/product-price`

#### Suggestion

| Field | Description |
| --- | --- |

Operations: list.

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

Operations: load.

API path: `/ac/ac-video/latest/json/localization/{locale}.json`



## Entities


### Articlecategory

Create an instance: `const articlecategory = client.Articlecategory()`

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
| `image` | `Record<string, any>` | Tile images by layout. |
| `link` | `string` | Absolute article URL. |
| `publishedTime` | `number` | Publication time in epoch milliseconds. |
| `title` | `string` |  |

#### Example: List

```ts
const articlecategorys = await client.Articlecategory().list({ category: "example" })
```


### Feed

Create an instance: `const feed = client.Feed()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `headline` | `string` | e.g. |
| `tiles` | `any[]` |  |

#### Example: Load

```ts
const feed = await client.Feed().load()
```


### Flyout

Create an instance: `const flyout = client.Flyout()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `analyticsAttributes` | `any[]` |  |
| `baseGroups` | `any[]` | Absent on the `apple` (home) entry. |
| `elevatedGroups` | `any[]` | Absent on the `apple` (home) entry. |
| `id` | `string` | Flyout id, e.g. |
| `name` | `string` | Menu name, e.g. |

#### Example: List

```ts
const flyouts = await client.Flyout().list()
```


### Geoswitcher

Create an instance: `const geoswitcher = client.Geoswitcher()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `localeBasedLabels` | `any[]` |  |
| `regions` | `any[]` |  |

#### Example: List

```ts
const geoswitchers = await client.Geoswitcher().list()
```


### ProductPrice

Create an instance: `const product_price = client.ProductPrice()`

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
| `price` | `Record<string, any>` |  |
| `type` | `string` | `PART` for a known part; `UNKNOWN` when the part number is not sold in this store (then only `id` and `type` are present). |

#### Example: Load

```ts
const product_price = await client.ProductPrice().load({ country: 'country', part: 'part' })
```


### Suggestion

Create an instance: `const suggestion = client.Suggestion()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Example: List

```ts
const suggestions = await client.Suggestion().list()
```


### VideoLocalization

Create an instance: `const video_localization = client.VideoLocalization()`

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

```ts
const video_localization = await client.VideoLocalization().load({ locale: 'locale' })
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
apple-web/
├── src/
│   ├── AppleWebSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { AppleWebSDK } from '@voxgig-sdk/apple-web-sdk'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const productprice = client.ProductPrice()
await productprice.load({ country: "example", part: "example" })

// productprice.data() now returns the productprice data from the last `load`
// productprice.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.

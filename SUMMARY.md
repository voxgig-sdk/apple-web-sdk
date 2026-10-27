# Apple Web API

Unofficial, undocumented JSON endpoints that the `www.apple.com` website itself loads (global navigation, store prices, newsroom feeds, careers and video-player strings). This is not an Apple-published API. Knowledge comes from the community Swift client https://github.com/l0v3m0n3y/apple (src/apple.swift lists the seven routes) and from live GET probes of every route on 2026-10-23. Unverified: which newsroom categories exist besides `photos` and `update` (`latest` and `press-release` returned an empty `results` list); which store `country` path values work besides `us` and `uk` (part numbers are store-specific, for example `MX2D3AM/A` in the US and `MX2D3ZM/A` in the UK); and locales other than en-US and fr-FR. The suggestions route needs its trailing slash (without it the server answers 200 with an empty body). No key is needed; Apple may change any of these without notice.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 7 entities and 7 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Articlecategory

Results: Articles.

SDK operations: `list`.

Key fields to recognise:

- `category`: for example `PHOTOS`, `UPDATE`.
- `date`: Display date, for example `September 18, 2026`.
- `image`: Tile images by layout.
- `link`: Absolute article URL.
- `publishedTime`: Publication time in epoch milliseconds.

### Feed

Results: Newsroom feed.

SDK operations: `load`.

Key fields to recognise:

- `headline`: for example `Latest News`.

### Flyout

Results: Flyout menus.

SDK operations: `list`.

Key fields to recognise:

- `baseGroups`: Absent on the `apple` (home) entry.
- `elevatedGroups`: Absent on the `apple` (home) entry.
- `id`: Flyout id, for example `8543e00d`.
- `name`: Menu name, for example `store`, `mac`, `iphone`, `support`.

### Geoswitcher

Results: Switcher data.

SDK operations: `list`.

### ProductPrice

Results: Prices by part number.

SDK operations: `load`.

Key fields to recognise:

- `id`: Part number, for example `MX2D3AM/A`.
- `type`: `PART` for a known part; `UNKNOWN` when the part number is not sold in this store (then only `id` and `type` are present).

### Suggestion

Results: Default suggestions.

SDK operations: `list`.

### VideoLocalization

Results: Localised strings.

SDK operations: `load`.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Articlecategory | `list` | `GET /newsroom/article.{category}.json` | See reference |
| Feed | `load` | `GET /newsroom/newsroom.everydayfeed.json` | See reference |
| Flyout | `list` | `GET /api-www/global-elements/global-header/v1/flyouts` | See reference |
| Geoswitcher | `list` | `GET /careers/ac-geoswitcher-data.json` | See reference |
| ProductPrice | `load` | `GET /{country}/shop/mcm/product-price` | See reference |
| Suggestion | `list` | `GET /search-services/suggestions/defaultlinks/` | See reference |
| VideoLocalization | `load` | `GET /ac/ac-video/latest/json/localization/{locale}.json` | See reference |

## Connect to the API

- apple.com website: `https://www.apple.com`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `apple-web_list`: List records for an entity. Supported entities: `articlecategory`, `flyout`, `geoswitcher`, `suggestion`.
- `apple-web_load`: Load one record for an entity. Supported entities: `feed`, `product_price`, `video_localization`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.


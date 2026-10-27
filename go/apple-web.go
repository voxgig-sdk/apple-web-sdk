package voxgigapplewebsdk

import (
	"github.com/voxgig-sdk/apple-web-sdk/go/core"
	"github.com/voxgig-sdk/apple-web-sdk/go/entity"
	"github.com/voxgig-sdk/apple-web-sdk/go/feature"
	_ "github.com/voxgig-sdk/apple-web-sdk/go/utility"
)

// Type aliases preserve external API.
type AppleWebSDK = core.AppleWebSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type AppleWebEntity = core.AppleWebEntity
type StreamItem = core.StreamItem
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type AppleWebError = core.AppleWebError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewRatelimitFeatureFunc = func() core.Feature {
		return feature.NewRatelimitFeature()
	}
	core.NewRetryFeatureFunc = func() core.Feature {
		return feature.NewRetryFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewTimeoutFeatureFunc = func() core.Feature {
		return feature.NewTimeoutFeature()
	}
	core.NewArticlecategoryEntityFunc = func(client *core.AppleWebSDK, entopts map[string]any) core.AppleWebEntity {
		return entity.NewArticlecategoryEntity(client, entopts)
	}
	core.NewFeedEntityFunc = func(client *core.AppleWebSDK, entopts map[string]any) core.AppleWebEntity {
		return entity.NewFeedEntity(client, entopts)
	}
	core.NewFlyoutEntityFunc = func(client *core.AppleWebSDK, entopts map[string]any) core.AppleWebEntity {
		return entity.NewFlyoutEntity(client, entopts)
	}
	core.NewGeoswitcherEntityFunc = func(client *core.AppleWebSDK, entopts map[string]any) core.AppleWebEntity {
		return entity.NewGeoswitcherEntity(client, entopts)
	}
	core.NewProductPriceEntityFunc = func(client *core.AppleWebSDK, entopts map[string]any) core.AppleWebEntity {
		return entity.NewProductPriceEntity(client, entopts)
	}
	core.NewSuggestionEntityFunc = func(client *core.AppleWebSDK, entopts map[string]any) core.AppleWebEntity {
		return entity.NewSuggestionEntity(client, entopts)
	}
	core.NewVideoLocalizationEntityFunc = func(client *core.AppleWebSDK, entopts map[string]any) core.AppleWebEntity {
		return entity.NewVideoLocalizationEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewAppleWebSDK = core.NewAppleWebSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var SharedConfig = core.SharedConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewAppleWebSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *AppleWebSDK  { return NewAppleWebSDK(nil) }
func Test() *AppleWebSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewRatelimitFeature = feature.NewRatelimitFeature
var NewRetryFeature = feature.NewRetryFeature
var NewTestFeature = feature.NewTestFeature
var NewTimeoutFeature = feature.NewTimeoutFeature

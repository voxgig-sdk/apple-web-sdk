package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewArticlecategoryEntityFunc func(client *AppleWebSDK, entopts map[string]any) AppleWebEntity

var NewFeedEntityFunc func(client *AppleWebSDK, entopts map[string]any) AppleWebEntity

var NewFlyoutEntityFunc func(client *AppleWebSDK, entopts map[string]any) AppleWebEntity

var NewGeoswitcherEntityFunc func(client *AppleWebSDK, entopts map[string]any) AppleWebEntity

var NewProductPriceEntityFunc func(client *AppleWebSDK, entopts map[string]any) AppleWebEntity

var NewSuggestionEntityFunc func(client *AppleWebSDK, entopts map[string]any) AppleWebEntity

var NewVideoLocalizationEntityFunc func(client *AppleWebSDK, entopts map[string]any) AppleWebEntity


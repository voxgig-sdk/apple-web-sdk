// Typed models for the AppleWeb SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/apple-web-sdk/go/core"
)

// Articlecategory is the typed data model for the articlecategory entity.
type Articlecategory struct {
}

// ArticlecategoryListMatch is the typed request payload for Articlecategory.ListTyped.
type ArticlecategoryListMatch struct {
	Category string `json:"category"`
}

// Feed is the typed data model for the feed entity.
type Feed struct {
}

// FeedLoadMatch is the typed request payload for Feed.LoadTyped.
type FeedLoadMatch struct {
	Headline *string `json:"headline,omitempty"`
	Tiles *[]any `json:"tiles,omitempty"`
}

// Flyout is the typed data model for the flyout entity.
type Flyout struct {
}

// FlyoutListMatch is the typed request payload for Flyout.ListTyped.
type FlyoutListMatch struct {
	Locale *string `json:"locale,omitempty"`
}

// Geoswitcher is the typed data model for the geoswitcher entity.
type Geoswitcher struct {
}

// GeoswitcherListMatch is the typed request payload for Geoswitcher.ListTyped.
type GeoswitcherListMatch struct {
	LocaleBasedLabels *[]any `json:"localeBasedLabels,omitempty"`
	Regions *[]any `json:"regions,omitempty"`
}

// ProductPrice is the typed data model for the product_price entity.
type ProductPrice struct {
}

// ProductPriceLoadMatch is the typed request payload for ProductPrice.LoadTyped.
type ProductPriceLoadMatch struct {
	Country string `json:"country"`
	Part string `json:"part"`
}

// Suggestion is the typed data model for the suggestion entity.
type Suggestion struct {
}

// SuggestionListMatch is the typed request payload for Suggestion.ListTyped.
type SuggestionListMatch struct {
	Locale *string `json:"locale,omitempty"`
	Src *string `json:"src,omitempty"`
}

// VideoLocalization is the typed data model for the video_localization entity.
type VideoLocalization struct {
}

// VideoLocalizationLoadMatch is the typed request payload for VideoLocalization.LoadTyped.
type VideoLocalizationLoadMatch struct {
	Locale string `json:"locale"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

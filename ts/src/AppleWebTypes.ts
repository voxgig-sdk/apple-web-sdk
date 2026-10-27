// Typed models for the AppleWeb SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Articlecategory {
  category: string
  date: string
  description: string
  image: Record<string, any>
  link: string
  publishedTime: number
  title: string
}

export interface ArticlecategoryListMatch {
  category: string
}

export interface Feed {
  headline: string
  tiles: any[]
}

export interface FeedLoadMatch {
  headline?: string
  tiles?: any[]
}

export interface Flyout {
  analyticsAttributes: any[]
  baseGroups?: any[]
  elevatedGroups?: any[]
  id: string
  name: string
}

export interface FlyoutListMatch {
  locale?: string
}

export interface Geoswitcher {
  localeBasedLabels: any[]
  regions: any[]
}

export interface GeoswitcherListMatch {
  localeBasedLabels?: any[]
  regions?: any[]
}

export interface ProductPrice {
  baseName?: string
  id: string
  name?: string
  price?: Record<string, any>
  type: string
}

export interface ProductPriceLoadMatch {
  country: string
  part: string
}

export interface Suggestion {
}

export interface SuggestionListMatch {
  locale?: string
  src?: string

  // Selects a custom action instead of the plain list:
  //   'defaultlink'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface VideoLocalization {
  adjustvolume?: string
  airplay?: string
  audiotrack?: string
  audiotrackscontrol?: string
  back?: string
  captionscontrol?: string
  captionsoff?: string
  captionsturnedoff?: string
  captionsturnedon?: string
  chapter?: string
  chapters?: string
  close?: string
  closesharing?: string
  copyarea?: string
  copyembed?: string
  copylink?: string
  currenttimetext?: string
  dismisscopy?: string
  elapsed?: string
  error?: string
  exitfullscreen?: string
  exitpictureinpicture?: string
  facebookshare?: string
  fullscreen?: string
  jumptochapter?: string
  language?: string
  live?: string
  livestream?: string
  loading?: string
  minutesandseconds?: string
  mutevolume?: string
  newwindow?: string
  pause?: string
  pictureinpicture?: string
  play?: string
  playpause?: string
  remaining?: string
  replay?: string
  seekslider?: string
  selectembed?: string
  selectlink?: string
  share?: string
  style?: string
  subtitlescontrol?: string
  subtitleslanguage?: string
  subtitlesturnedoff?: string
  subtitlesturnedon?: string
  threesixtydown?: string
  threesixtyicon?: string
  threesixtyleft?: string
  threesixtyright?: string
  threesixtyup?: string
  xshare?: string
}

export interface VideoLocalizationLoadMatch {
  locale: string
}


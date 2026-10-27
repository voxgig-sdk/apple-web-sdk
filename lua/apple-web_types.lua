-- Typed models for the AppleWeb SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
-- params (op.<name>.points[].g.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Articlecategory
---@field category string
---@field date string
---@field description string
---@field image table
---@field link string
---@field publishedTime number
---@field title string

---@class ArticlecategoryListMatch
---@field category string

---@class Feed
---@field headline string
---@field tiles table

---@class FeedLoadMatch
---@field headline? string
---@field tiles? table

---@class Flyout
---@field analyticsAttributes table
---@field baseGroups? table
---@field elevatedGroups? table
---@field id string
---@field name string

---@class FlyoutListMatch
---@field locale? string

---@class Geoswitcher
---@field localeBasedLabels table
---@field regions table

---@class GeoswitcherListMatch
---@field localeBasedLabels? table
---@field regions? table

---@class ProductPrice
---@field baseName? string
---@field id string
---@field name? string
---@field price? table
---@field type string

---@class ProductPriceLoadMatch
---@field country string
---@field part string

---@class Suggestion

---@class SuggestionListMatch
---@field locale? string
---@field src? string

---@class VideoLocalization
---@field adjustvolume? string
---@field airplay? string
---@field audiotrack? string
---@field audiotrackscontrol? string
---@field back? string
---@field captionscontrol? string
---@field captionsoff? string
---@field captionsturnedoff? string
---@field captionsturnedon? string
---@field chapter? string
---@field chapters? string
---@field close? string
---@field closesharing? string
---@field copyarea? string
---@field copyembed? string
---@field copylink? string
---@field currenttimetext? string
---@field dismisscopy? string
---@field elapsed? string
---@field error? string
---@field exitfullscreen? string
---@field exitpictureinpicture? string
---@field facebookshare? string
---@field fullscreen? string
---@field jumptochapter? string
---@field language? string
---@field live? string
---@field livestream? string
---@field loading? string
---@field minutesandseconds? string
---@field mutevolume? string
---@field newwindow? string
---@field pause? string
---@field pictureinpicture? string
---@field play? string
---@field playpause? string
---@field remaining? string
---@field replay? string
---@field seekslider? string
---@field selectembed? string
---@field selectlink? string
---@field share? string
---@field style? string
---@field subtitlescontrol? string
---@field subtitleslanguage? string
---@field subtitlesturnedoff? string
---@field subtitlesturnedon? string
---@field threesixtydown? string
---@field threesixtyicon? string
---@field threesixtyleft? string
---@field threesixtyright? string
---@field threesixtyup? string
---@field xshare? string

---@class VideoLocalizationLoadMatch
---@field locale string

local M = {}

return M

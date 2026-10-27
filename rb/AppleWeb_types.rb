# frozen_string_literal: true

# Typed models for the AppleWeb SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Articlecategory entity data model.
#
# @!attribute [rw] category
#   @return [String]
#
# @!attribute [rw] date
#   @return [String]
#
# @!attribute [rw] description
#   @return [String]
#
# @!attribute [rw] image
#   @return [Hash]
#
# @!attribute [rw] link
#   @return [String]
#
# @!attribute [rw] publishedTime
#   @return [Integer]
#
# @!attribute [rw] title
#   @return [String]
Articlecategory = Struct.new(
  :category,
  :date,
  :description,
  :image,
  :link,
  :publishedTime,
  :title,
  keyword_init: true
)

# Request payload for Articlecategory#list.
#
# @!attribute [rw] category
#   @return [String]
ArticlecategoryListMatch = Struct.new(
  :category,
  keyword_init: true
)

# Feed entity data model.
#
# @!attribute [rw] headline
#   @return [String]
#
# @!attribute [rw] tiles
#   @return [Array]
Feed = Struct.new(
  :headline,
  :tiles,
  keyword_init: true
)

# Request payload for Feed#load.
#
# @!attribute [rw] headline
#   @return [String, nil]
#
# @!attribute [rw] tiles
#   @return [Array, nil]
FeedLoadMatch = Struct.new(
  :headline,
  :tiles,
  keyword_init: true
)

# Flyout entity data model.
#
# @!attribute [rw] analyticsAttributes
#   @return [Array]
#
# @!attribute [rw] baseGroups
#   @return [Array, nil]
#
# @!attribute [rw] elevatedGroups
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String]
Flyout = Struct.new(
  :analyticsAttributes,
  :baseGroups,
  :elevatedGroups,
  :id,
  :name,
  keyword_init: true
)

# Request payload for Flyout#list.
#
# @!attribute [rw] locale
#   @return [String, nil]
FlyoutListMatch = Struct.new(
  :locale,
  keyword_init: true
)

# Geoswitcher entity data model.
#
# @!attribute [rw] localeBasedLabels
#   @return [Array]
#
# @!attribute [rw] regions
#   @return [Array]
Geoswitcher = Struct.new(
  :localeBasedLabels,
  :regions,
  keyword_init: true
)

# Request payload for Geoswitcher#list.
#
# @!attribute [rw] localeBasedLabels
#   @return [Array, nil]
#
# @!attribute [rw] regions
#   @return [Array, nil]
GeoswitcherListMatch = Struct.new(
  :localeBasedLabels,
  :regions,
  keyword_init: true
)

# ProductPrice entity data model.
#
# @!attribute [rw] baseName
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] price
#   @return [Hash, nil]
#
# @!attribute [rw] type
#   @return [String]
ProductPrice = Struct.new(
  :baseName,
  :id,
  :name,
  :price,
  :type,
  keyword_init: true
)

# Request payload for ProductPrice#load.
#
# @!attribute [rw] country
#   @return [String]
#
# @!attribute [rw] part
#   @return [String]
ProductPriceLoadMatch = Struct.new(
  :country,
  :part,
  keyword_init: true
)

# Suggestion entity data model.
class Suggestion
end

# Request payload for Suggestion#list.
#
# @!attribute [rw] locale
#   @return [String, nil]
#
# @!attribute [rw] src
#   @return [String, nil]
SuggestionListMatch = Struct.new(
  :locale,
  :src,
  keyword_init: true
)

# VideoLocalization entity data model.
#
# @!attribute [rw] adjustvolume
#   @return [String, nil]
#
# @!attribute [rw] airplay
#   @return [String, nil]
#
# @!attribute [rw] audiotrack
#   @return [String, nil]
#
# @!attribute [rw] audiotrackscontrol
#   @return [String, nil]
#
# @!attribute [rw] back
#   @return [String, nil]
#
# @!attribute [rw] captionscontrol
#   @return [String, nil]
#
# @!attribute [rw] captionsoff
#   @return [String, nil]
#
# @!attribute [rw] captionsturnedoff
#   @return [String, nil]
#
# @!attribute [rw] captionsturnedon
#   @return [String, nil]
#
# @!attribute [rw] chapter
#   @return [String, nil]
#
# @!attribute [rw] chapters
#   @return [String, nil]
#
# @!attribute [rw] close
#   @return [String, nil]
#
# @!attribute [rw] closesharing
#   @return [String, nil]
#
# @!attribute [rw] copyarea
#   @return [String, nil]
#
# @!attribute [rw] copyembed
#   @return [String, nil]
#
# @!attribute [rw] copylink
#   @return [String, nil]
#
# @!attribute [rw] currenttimetext
#   @return [String, nil]
#
# @!attribute [rw] dismisscopy
#   @return [String, nil]
#
# @!attribute [rw] elapsed
#   @return [String, nil]
#
# @!attribute [rw] error
#   @return [String, nil]
#
# @!attribute [rw] exitfullscreen
#   @return [String, nil]
#
# @!attribute [rw] exitpictureinpicture
#   @return [String, nil]
#
# @!attribute [rw] facebookshare
#   @return [String, nil]
#
# @!attribute [rw] fullscreen
#   @return [String, nil]
#
# @!attribute [rw] jumptochapter
#   @return [String, nil]
#
# @!attribute [rw] language
#   @return [String, nil]
#
# @!attribute [rw] live
#   @return [String, nil]
#
# @!attribute [rw] livestream
#   @return [String, nil]
#
# @!attribute [rw] loading
#   @return [String, nil]
#
# @!attribute [rw] minutesandseconds
#   @return [String, nil]
#
# @!attribute [rw] mutevolume
#   @return [String, nil]
#
# @!attribute [rw] newwindow
#   @return [String, nil]
#
# @!attribute [rw] pause
#   @return [String, nil]
#
# @!attribute [rw] pictureinpicture
#   @return [String, nil]
#
# @!attribute [rw] play
#   @return [String, nil]
#
# @!attribute [rw] playpause
#   @return [String, nil]
#
# @!attribute [rw] remaining
#   @return [String, nil]
#
# @!attribute [rw] replay
#   @return [String, nil]
#
# @!attribute [rw] seekslider
#   @return [String, nil]
#
# @!attribute [rw] selectembed
#   @return [String, nil]
#
# @!attribute [rw] selectlink
#   @return [String, nil]
#
# @!attribute [rw] share
#   @return [String, nil]
#
# @!attribute [rw] style
#   @return [String, nil]
#
# @!attribute [rw] subtitlescontrol
#   @return [String, nil]
#
# @!attribute [rw] subtitleslanguage
#   @return [String, nil]
#
# @!attribute [rw] subtitlesturnedoff
#   @return [String, nil]
#
# @!attribute [rw] subtitlesturnedon
#   @return [String, nil]
#
# @!attribute [rw] threesixtydown
#   @return [String, nil]
#
# @!attribute [rw] threesixtyicon
#   @return [String, nil]
#
# @!attribute [rw] threesixtyleft
#   @return [String, nil]
#
# @!attribute [rw] threesixtyright
#   @return [String, nil]
#
# @!attribute [rw] threesixtyup
#   @return [String, nil]
#
# @!attribute [rw] xshare
#   @return [String, nil]
VideoLocalization = Struct.new(
  :adjustvolume,
  :airplay,
  :audiotrack,
  :audiotrackscontrol,
  :back,
  :captionscontrol,
  :captionsoff,
  :captionsturnedoff,
  :captionsturnedon,
  :chapter,
  :chapters,
  :close,
  :closesharing,
  :copyarea,
  :copyembed,
  :copylink,
  :currenttimetext,
  :dismisscopy,
  :elapsed,
  :error,
  :exitfullscreen,
  :exitpictureinpicture,
  :facebookshare,
  :fullscreen,
  :jumptochapter,
  :language,
  :live,
  :livestream,
  :loading,
  :minutesandseconds,
  :mutevolume,
  :newwindow,
  :pause,
  :pictureinpicture,
  :play,
  :playpause,
  :remaining,
  :replay,
  :seekslider,
  :selectembed,
  :selectlink,
  :share,
  :style,
  :subtitlescontrol,
  :subtitleslanguage,
  :subtitlesturnedoff,
  :subtitlesturnedon,
  :threesixtydown,
  :threesixtyicon,
  :threesixtyleft,
  :threesixtyright,
  :threesixtyup,
  :xshare,
  keyword_init: true
)

# Request payload for VideoLocalization#load.
#
# @!attribute [rw] locale
#   @return [String]
VideoLocalizationLoadMatch = Struct.new(
  :locale,
  keyword_init: true
)


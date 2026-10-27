<?php
declare(strict_types=1);

// Typed models for the AppleWeb SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
// params (op.<name>.points[].g.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Articlecategory entity data model. */
class Articlecategory
{
    public string $category;
    public string $date;
    public string $description;
    public array $image;
    public string $link;
    public int $publishedTime;
    public string $title;
}

/** Request payload for Articlecategory#list. */
class ArticlecategoryListMatch
{
    public string $category;
}

/** Feed entity data model. */
class Feed
{
    public string $headline;
    public array $tiles;
}

/** Request payload for Feed#load. */
class FeedLoadMatch
{
    public ?string $headline = null;
    public ?array $tiles = null;
}

/** Flyout entity data model. */
class Flyout
{
    public array $analyticsAttributes;
    public ?array $baseGroups = null;
    public ?array $elevatedGroups = null;
    public string $id;
    public string $name;
}

/** Request payload for Flyout#list. */
class FlyoutListMatch
{
    public ?string $locale = null;
}

/** Geoswitcher entity data model. */
class Geoswitcher
{
    public array $localeBasedLabels;
    public array $regions;
}

/** Request payload for Geoswitcher#list. */
class GeoswitcherListMatch
{
    public ?array $localeBasedLabels = null;
    public ?array $regions = null;
}

/** ProductPrice entity data model. */
class ProductPrice
{
    public ?string $baseName = null;
    public string $id;
    public ?string $name = null;
    public ?array $price = null;
    public string $type;
}

/** Request payload for ProductPrice#load. */
class ProductPriceLoadMatch
{
    public string $country;
    public string $part;
}

/** Suggestion entity data model. */
class Suggestion
{
}

/** Request payload for Suggestion#list. */
class SuggestionListMatch
{
    public ?string $locale = null;
    public ?string $src = null;
}

/** VideoLocalization entity data model. */
class VideoLocalization
{
    public ?string $adjustvolume = null;
    public ?string $airplay = null;
    public ?string $audiotrack = null;
    public ?string $audiotrackscontrol = null;
    public ?string $back = null;
    public ?string $captionscontrol = null;
    public ?string $captionsoff = null;
    public ?string $captionsturnedoff = null;
    public ?string $captionsturnedon = null;
    public ?string $chapter = null;
    public ?string $chapters = null;
    public ?string $close = null;
    public ?string $closesharing = null;
    public ?string $copyarea = null;
    public ?string $copyembed = null;
    public ?string $copylink = null;
    public ?string $currenttimetext = null;
    public ?string $dismisscopy = null;
    public ?string $elapsed = null;
    public ?string $error = null;
    public ?string $exitfullscreen = null;
    public ?string $exitpictureinpicture = null;
    public ?string $facebookshare = null;
    public ?string $fullscreen = null;
    public ?string $jumptochapter = null;
    public ?string $language = null;
    public ?string $live = null;
    public ?string $livestream = null;
    public ?string $loading = null;
    public ?string $minutesandseconds = null;
    public ?string $mutevolume = null;
    public ?string $newwindow = null;
    public ?string $pause = null;
    public ?string $pictureinpicture = null;
    public ?string $play = null;
    public ?string $playpause = null;
    public ?string $remaining = null;
    public ?string $replay = null;
    public ?string $seekslider = null;
    public ?string $selectembed = null;
    public ?string $selectlink = null;
    public ?string $share = null;
    public ?string $style = null;
    public ?string $subtitlescontrol = null;
    public ?string $subtitleslanguage = null;
    public ?string $subtitlesturnedoff = null;
    public ?string $subtitlesturnedon = null;
    public ?string $threesixtydown = null;
    public ?string $threesixtyicon = null;
    public ?string $threesixtyleft = null;
    public ?string $threesixtyright = null;
    public ?string $threesixtyup = null;
    public ?string $xshare = null;
}

/** Request payload for VideoLocalization#load. */
class VideoLocalizationLoadMatch
{
    public string $locale;
}


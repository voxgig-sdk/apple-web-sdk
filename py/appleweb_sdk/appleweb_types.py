# Typed models for the AppleWeb SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Articlecategory(TypedDict):
    category: str
    date: str
    description: str
    image: dict
    link: str
    publishedTime: int
    title: str


class ArticlecategoryListMatch(TypedDict):
    category: str


class Feed(TypedDict):
    headline: str
    tiles: list


class FeedLoadMatch(TypedDict, total=False):
    headline: str
    tiles: list


class FlyoutRequired(TypedDict):
    analyticsAttributes: list
    id: str
    name: str


class Flyout(FlyoutRequired, total=False):
    baseGroups: list
    elevatedGroups: list


class FlyoutListMatch(TypedDict, total=False):
    locale: str


class Geoswitcher(TypedDict):
    localeBasedLabels: list
    regions: list


class GeoswitcherListMatch(TypedDict, total=False):
    localeBasedLabels: list
    regions: list


class ProductPriceRequired(TypedDict):
    id: str
    type: str


class ProductPrice(ProductPriceRequired, total=False):
    baseName: str
    name: str
    price: dict


class ProductPriceLoadMatch(TypedDict):
    country: str
    part: str


class Suggestion(TypedDict):
    pass


class SuggestionListMatch(TypedDict, total=False):
    locale: str
    src: str


class VideoLocalization(TypedDict, total=False):
    adjustvolume: str
    airplay: str
    audiotrack: str
    audiotrackscontrol: str
    back: str
    captionscontrol: str
    captionsoff: str
    captionsturnedoff: str
    captionsturnedon: str
    chapter: str
    chapters: str
    close: str
    closesharing: str
    copyarea: str
    copyembed: str
    copylink: str
    currenttimetext: str
    dismisscopy: str
    elapsed: str
    error: str
    exitfullscreen: str
    exitpictureinpicture: str
    facebookshare: str
    fullscreen: str
    jumptochapter: str
    language: str
    live: str
    livestream: str
    loading: str
    minutesandseconds: str
    mutevolume: str
    newwindow: str
    pause: str
    pictureinpicture: str
    play: str
    playpause: str
    remaining: str
    replay: str
    seekslider: str
    selectembed: str
    selectlink: str
    share: str
    style: str
    subtitlescontrol: str
    subtitleslanguage: str
    subtitlesturnedoff: str
    subtitlesturnedon: str
    threesixtydown: str
    threesixtyicon: str
    threesixtyleft: str
    threesixtyright: str
    threesixtyup: str
    xshare: str


class VideoLocalizationLoadMatch(TypedDict):
    locale: str

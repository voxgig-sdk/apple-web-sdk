# AppleWeb SDK feature factory

from appleweb_sdk.feature.base_feature import AppleWebBaseFeature
from appleweb_sdk.feature.ratelimit_feature import AppleWebRatelimitFeature
from appleweb_sdk.feature.retry_feature import AppleWebRetryFeature
from appleweb_sdk.feature.test_feature import AppleWebTestFeature
from appleweb_sdk.feature.timeout_feature import AppleWebTimeoutFeature


_FEATURES = {
    "base": lambda: AppleWebBaseFeature(),
    "ratelimit": lambda: AppleWebRatelimitFeature(),
    "retry": lambda: AppleWebRetryFeature(),
    "test": lambda: AppleWebTestFeature(),
    "timeout": lambda: AppleWebTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES

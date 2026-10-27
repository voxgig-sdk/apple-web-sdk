# AppleWeb SDK utility: make_context

from appleweb_sdk.core.context import AppleWebContext


def make_context_util(ctxmap, basectx):
    return AppleWebContext(ctxmap, basectx)

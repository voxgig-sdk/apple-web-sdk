# AppleWeb SDK utility: make_context

from projectname_sdk.core.context import AppleWebContext


def make_context_util(ctxmap, basectx):
    return AppleWebContext(ctxmap, basectx)

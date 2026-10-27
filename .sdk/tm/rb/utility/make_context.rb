# AppleWeb SDK utility: make_context
require_relative '../core/context'
module AppleWebUtilities
  MakeContext = ->(ctxmap, basectx) {
    AppleWebContext.new(ctxmap, basectx)
  }
end

# AppleWeb SDK utility: prepare_body
require_relative 'media'
module AppleWebUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return AppleWebUtilities.raw_body(ctx.reqdata) if AppleWebUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end

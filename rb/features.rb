# AppleWeb SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module AppleWebFeatures
  def self.make_feature(name)
    case name
    when "base"
      AppleWebBaseFeature.new
    when "ratelimit"
      AppleWebRatelimitFeature.new
    when "retry"
      AppleWebRetryFeature.new
    when "test"
      AppleWebTestFeature.new
    when "timeout"
      AppleWebTimeoutFeature.new
    else
      AppleWebBaseFeature.new
    end
  end
end

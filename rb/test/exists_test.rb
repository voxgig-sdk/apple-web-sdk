# AppleWeb SDK exists test

require "minitest/autorun"
require_relative "../AppleWeb_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = AppleWebSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end

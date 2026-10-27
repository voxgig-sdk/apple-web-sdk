# Feed entity test

require "minitest/autorun"
require "json"
require_relative "../AppleWeb_sdk"
require_relative "runner"

class FeedEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = AppleWebSDK.test(nil, nil)
    ent = testsdk.Feed(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = AppleWebConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = AppleWebSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Feed(nil).load({ "headline" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = feed_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "feed." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    feed_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.feed")))
    feed_ref01_data = nil
    if feed_ref01_data_raw.length > 0
      feed_ref01_data = Helpers.to_map(feed_ref01_data_raw[0][1])
    end

    # LOAD
    feed_ref01_ent = client.Feed(nil)
    feed_ref01_match_dt0 = {}
    feed_ref01_data_dt0_loaded = feed_ref01_ent.load(feed_ref01_match_dt0, nil)
    assert !feed_ref01_data_dt0_loaded.nil?

  end
end

def feed_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "feed", "FeedTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = AppleWebSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["feed01", "feed02", "feed03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["APPLE_WEB_TEST_FEED_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "APPLE_WEB_TEST_FEED_ENTID" => idmap,
    "APPLE_WEB_TEST_LIVE" => "FALSE",
    "APPLE_WEB_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["APPLE_WEB_TEST_FEED_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["APPLE_WEB_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      # FIRST, so the generated fields below win: sdk-test-control.json's
      # test.client.options adds to the live client, it does not redirect it.
      Runner.live_client_options,
      {
      },
      extra || {},
    ])
    client = AppleWebSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["APPLE_WEB_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["APPLE_WEB_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end

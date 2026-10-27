# Articlecategory entity test

require "minitest/autorun"
require "json"
require_relative "../AppleWeb_sdk"
require_relative "runner"

class ArticlecategoryEntityTest < Minitest::Test
  # main.kit.test.live.strict is true (the default is true): a live
  # request that fails, or a live test missing an input it needs,
  # fails the test.
  # An account with no record for a test to read skips it either way.
  LIVE_STRICT = true

  def test_create_instance
    testsdk = AppleWebSDK.test(nil, nil)
    ent = testsdk.Articlecategory(nil)
    assert !ent.nil?
  end

  def test_validate
    cfg = AppleWebConfig.shared_config
    unless cfg["feature"].is_a?(Hash) && cfg["feature"].key?("validate")
      skip("feature not present in this SDK: validate")
    end
    client = AppleWebSDK.test(nil, { "feature" => { "validate" => { "active" => true } } })
    err = assert_raises(StandardError) do
      client.Articlecategory(nil).list({ "category" => 1 }, nil)
    end
    assert_equal "validate_failed", err.code
  end

  def test_basic_flow
    setup = articlecategory_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "articlecategory." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    if setup[:live]
      ["category01"].each do |_live_key|
        if setup[:synthetic_only] || setup[:idmap][_live_key].nil?
          Runner.live_miss(LIVE_STRICT, "Live entity test blocked: needs #{_live_key} via APPLE_WEB_TEST_ARTICLECATEGORY_ENTID")
        end
      end
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    articlecategory_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.articlecategory")))
    articlecategory_ref01_data = nil
    if articlecategory_ref01_data_raw.length > 0
      articlecategory_ref01_data = Helpers.to_map(articlecategory_ref01_data_raw[0][1])
    end

    # LIST
    articlecategory_ref01_ent = client.Articlecategory(nil)
    articlecategory_ref01_match = {
      "category" => setup[:idmap]["category01"],
    }

    articlecategory_ref01_list_result = articlecategory_ref01_ent.list(articlecategory_ref01_match, nil)
    assert articlecategory_ref01_list_result.is_a?(Array)

  end
end

def articlecategory_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "articlecategory", "ArticlecategoryTestData.json")
  entity_data_source = File.read(entity_data_file, encoding: "UTF-8")
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = AppleWebSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["articlecategory01", "articlecategory02", "articlecategory03", "category01"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Whether *_ENTID supplied the idmap, read before env_override consumes
  # it: without it, the ids a live flow binds are the fixture's synthetic ones.
  entid_env_raw = ENV["APPLE_WEB_TEST_ARTICLECATEGORY_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "APPLE_WEB_TEST_ARTICLECATEGORY_ENTID" => idmap,
    "APPLE_WEB_TEST_LIVE" => "FALSE",
    "APPLE_WEB_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["APPLE_WEB_TEST_ARTICLECATEGORY_ENTID"])
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

package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/apple-web-sdk/go"
	"github.com/voxgig-sdk/apple-web-sdk/go/core"

	vs "github.com/voxgig-sdk/apple-web-sdk/go/utility/struct"
)

// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const articlecategoryEntityLiveStrict = true


func TestArticlecategoryEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Articlecategory(nil)
		if ent == nil {
			t.Fatal("expected non-nil ArticlecategoryEntity")
		}
	})

	t.Run("validate", func(t *testing.T) {
		if !fhHasFeature("validate") {
			t.Skip("feature not present in this SDK: validate")
		}
		client := sdk.TestSDK(nil, map[string]any{
			"feature": map[string]any{"validate": map[string]any{"active": true}},
		})
		_, err := client.Articlecategory(nil).List(map[string]any{"category": 1}, nil)
		if sdkerr, ok := err.(*core.AppleWebError); !ok || "validate_failed" != sdkerr.Code {
			t.Fatalf("expected validate_failed, got %v", err)
		}
	})

	t.Run("basic", func(tt *testing.T) {
		var t testing.TB = tt
		setup := articlecategoryBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "articlecategory." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		if setup.live {
			for _, _liveKey := range []string{"category01"} {
				if setup.syntheticOnly || setup.idmap[_liveKey] == nil {
					liveMiss(t, articlecategoryEntityLiveStrict, "Live entity test blocked: needs %s via APPLE_WEB_TEST_ARTICLECATEGORY_ENTID", _liveKey)
				}
			}
		}
		client := setup.client
		_ = client

		// Bootstrap entity data from existing test data (no create step in flow).
		articlecategoryRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.articlecategory")))
		var articlecategoryRef01Data map[string]any
		if len(articlecategoryRef01DataRaw) > 0 {
			articlecategoryRef01Data = core.ToMapAny(articlecategoryRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = articlecategoryRef01Data

		// LIST
		articlecategoryRef01Ent := client.Articlecategory(nil)
		articlecategoryRef01Match := map[string]any{
			"category": setup.idmap["category01"],
		}

		articlecategoryRef01ListResult, err := articlecategoryRef01Ent.List(articlecategoryRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, articlecategoryRef01ListOk := articlecategoryRef01ListResult.([]any)
		if !articlecategoryRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", articlecategoryRef01ListResult)
		}

	})
}

func articlecategoryBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "articlecategory", "ArticlecategoryTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read articlecategory test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse articlecategory test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"articlecategory01", "articlecategory02", "articlecategory03", "category01"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Whether *_ENTID supplied the idmap, read before envOverride consumes it:
	// without it, the ids a live flow binds are the fixture's synthetic ones.
	entidEnvRaw := os.Getenv("APPLE_WEB_TEST_ARTICLECATEGORY_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"APPLE_WEB_TEST_ARTICLECATEGORY_ENTID": idmap,
		"APPLE_WEB_TEST_LIVE":      "FALSE",
		"APPLE_WEB_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["APPLE_WEB_TEST_ARTICLECATEGORY_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["APPLE_WEB_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
			},
			extraOpts,
		})
		client = sdk.NewAppleWebSDK(core.ToMapAny(mergedOpts))
	}

	live := env["APPLE_WEB_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["APPLE_WEB_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}

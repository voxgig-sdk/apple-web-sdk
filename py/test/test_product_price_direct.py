# ProductPrice direct test

import json
import os
import pytest

from appleweb_sdk.utility.voxgig_struct import voxgig_struct as vs
from appleweb_sdk import AppleWebSDK
from appleweb_sdk.core import helpers
from test import runner


# main.kit.test.live.strict is true (the default is true): a live
# request that fails, or a live test missing an input it needs,
# fails the test.
# An account with no record for a test to read skips it either way.
LIVE_STRICT = True


def _live_ok(result):
    status = helpers.to_int(result.get("status"))
    return result.get("err") is None and bool(result.get("ok")) and 200 <= status < 300


class TestProductPriceDirect:

    def test_should_direct_load_product_price(self):
        setup = _product_price_direct_setup({"id": "direct01"})
        _skip, _reason = runner.is_control_skipped("direct", "direct-load-product_price", "live" if setup["live"] else "unit")
        if _skip:
            pytest.skip(_reason or "skipped via sdk-test-control.json")
            return
        client = setup["client"]

        params = {}
        query = {}
        if setup["live"]:
            query["parts"] = "MX2D3AM/A"
            params["country"] = "us"
            pass
        else:
            params["country"] = "direct01"
            pass

        result = client.direct({
            "path": "{country}/shop/mcm/product-price",
            "method": "GET",
            "params": params,
            "query": query,
        })
        if setup["live"]:
            if not _live_ok(result):
                runner.live_miss(LIVE_STRICT, "Live load failed: " + runner.live_describe(result))
            if result.get("data") is None:
                runner.live_miss(LIVE_STRICT, "Live load returned no data: " + runner.live_describe(result))
        else:
            assert result["ok"] is True
            assert helpers.to_int(result["status"]) == 200
            assert result["data"] is not None
            if isinstance(result["data"], dict):
                assert result["data"]["id"] == "direct01"
            assert len(setup["calls"]) == 1



def _product_price_direct_setup(mockres):
    runner.load_env_local()

    calls = []

    env = runner.env_override({
        "APPLE_WEB_TEST_PRODUCT_PRICE_ENTID": {},
        "APPLE_WEB_TEST_LIVE": "FALSE",
    })

    live = env.get("APPLE_WEB_TEST_LIVE") == "TRUE"

    if live:
        # sdk-test-control.json's test.client.options seeds the live
        # client; the generated fields below overwrite anything they name.
        merged_opts = dict(runner.live_client_options())
        merged_opts.update({
        })
        client = AppleWebSDK(merged_opts)
        idmap = env.get("APPLE_WEB_TEST_PRODUCT_PRICE_ENTID")
        # A path parameter's example stands in for an id *_ENTID does not give.
        idmap = {"country01": "us",
                 **(idmap if isinstance(idmap, dict) else {})}
        return {
            "client": client,
            "calls": calls,
            "live": True,
            "idmap": idmap if isinstance(idmap, dict) else {},
        }

    def mock_fetch(url, init):
        calls.append({"url": url, "init": init})
        return {
            "status": 200,
            "statusText": "OK",
            "headers": {},
            "json": lambda: mockres if mockres is not None else {"id": "direct01"},
            "body": "mock",
        }, None

    client = AppleWebSDK({
        "base": "http://localhost:8080",
        "system": {
            "fetch": mock_fetch,
        },
    })

    return {
        "client": client,
        "calls": calls,
        "live": False,
        "idmap": {},
    }

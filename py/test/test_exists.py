# AppleWeb SDK exists test

import pytest
from appleweb_sdk import AppleWebSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = AppleWebSDK.test(None, None)
        assert testsdk is not None

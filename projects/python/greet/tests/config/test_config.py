from unittest import TestCase

from greet import CommonConfiguration


class TestConfig(TestCase):
    def test_simple(self):
        config = CommonConfiguration(who_am_i="hello")
        self.assertEqual(config.who_am_i, "hello")

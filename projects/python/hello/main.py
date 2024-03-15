import pandas as pd
import statsmodels.api as sm
from greet.config import CommonConfiguration


def main(config: CommonConfiguration | None = None):
    if config:
        print("Hello, {}".format(config.who_am_i))
    df = pd.DataFrame({"a": [1, 2, 3]})
    print(df)


if __name__ == "__main__":
    config1 = CommonConfiguration(who_am_i=123)
    config = CommonConfiguration(who_am_i="johnnyxcy")
    main(config)

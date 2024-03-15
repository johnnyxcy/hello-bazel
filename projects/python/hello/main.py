import pandas as pd
import statsmodels as sp
from greet.config import CommonConfiguration


def main(config: CommonConfiguration | None = None):
    if config:
        print("Hello, {}".format(config.who_am_i))
    df = pd.DataFrame({"a": [1, 2, 3]})
    print(df)
    print(sp)


if __name__ == "__main__":
    lst = []
    # l.append("1")
    # l.append(2)
    wrong_config = CommonConfiguration(who_am_i=1e-4)
    config = CommonConfiguration(who_am_i="johnnyxcy")
    main(config)

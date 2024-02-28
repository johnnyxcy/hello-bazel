import pandas as pd

# from greet.config import CommonConfiguration


def main():
    # print("hello world")
    df = pd.DataFrame({"a": [1, 2, 3]})
    print(df)


if __name__ == "__main__":
    # config = CommonConfiguration(who_am_i="johnnyxcy")
    main()
    print("done")

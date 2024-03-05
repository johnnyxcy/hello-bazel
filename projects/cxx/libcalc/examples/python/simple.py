import numpy as np

import projects.cxx.libcalc._libcalc as libcalc

if __name__ == "__main__":
    print(libcalc.math.add(1, 2))
    print(libcalc.math.sub(2, 1))

    print(libcalc.math.add(np.array([1, 2]), np.array([3, 4])))

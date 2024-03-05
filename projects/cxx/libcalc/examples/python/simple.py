import projects.cxx.libcalc._libcalc as libcalc

print(libcalc.math.add(1, 2))
print(libcalc.math.sub(2, 1))


import numpy as np

print(libcalc.math.add(np.array([1, 2]), np.array([3, 4])))

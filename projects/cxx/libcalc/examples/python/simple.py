import libcalc._libcalc as libcalc

print(libcalc)
import os

print(os.path.abspath(libcalc.__file__))
print(os.path.abspath(__file__))
print(libcalc.add(1, 2))

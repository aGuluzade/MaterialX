//
// TM & (c) 2017 Lucasfilm Entertainment Company Ltd. and Lucasfilm Ltd.
// All rights reserved.  See LICENSE.txt for license.
//

#include <PyMaterialX/PyMaterialX.h>

namespace py = pybind11;

void bindPyArnoldShaderGenerator(py::module& mod);

PYBIND11_MODULE(PyMaterialXGenArnold, mod)
{
    mod.doc() = "Module containing Python bindings for the MaterialXGenArnold library";

    bindPyArnoldShaderGenerator(mod);
}

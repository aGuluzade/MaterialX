
# Appends a path to an environment variable.
# Note: if you want to append multiple paths either call this multiple
#       times, or send in the paths with the proper platform separator.
#
#   envVar         The environment variable to modify
#   pathToAppend   The path to append
#
function(append_path_to_env_var envVar pathToAppend)
    file(TO_NATIVE_PATH "${pathToAppend}" nativePathToAppend)
    if(DEFINED ENV{${envVar}})
        if(WIN32)
            set(newPath "$ENV{${envVar}};${nativePathToAppend}")
        else()
            set(newPath "$ENV{${envVar}}:${nativePathToAppend}")
        endif()
        set(ENV{${envVar}} "${newPath}")
    else()
        set(ENV{${envVar}} "${nativePathToAppend}")
    endif()
    message("Updated ${envVar}: $ENV{${envVar}}")
endfunction()

# Finds if a specific Python module is installed in the current Python.
# <module>_FOUND will be set to indicate whether the module was found.
#
# module           The python module to find
#
function(find_python_module module)
	string(TOUPPER ${module} module_upper)
	set(module_found "${module_upper}_FOUND")
	if(NOT ${module_found})
		if(ARGC GREATER 1 AND ARGV1 STREQUAL "REQUIRED")
			set(${module}_FIND_REQUIRED TRUE)
		endif()
		execute_process(COMMAND "${PYTHON_EXECUTABLE}" "-c"
			"import re, ${module}; print re.compile('/__init__.py.*').sub('',${module}.__file__)"
			RESULT_VARIABLE _${module}_status
			OUTPUT_VARIABLE _${module}_location
			ERROR_QUIET OUTPUT_STRIP_TRAILING_WHITESPACE)
		if(NOT _${module}_status)
			set(${module_found} ${_${module}_location} CACHE STRING
				"Location of Python module ${module}")
		endif(NOT _${module}_status)
	endif(NOT ${module_found})
endfunction(find_python_module)

/* Copyright (c) 2018 Robert Steckroth <RobertSteckroth@gmail.com>

	Brace Navlink resides under the MIT licensed.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

  Brace Navlink is module to automatically add markdown page navigation links.

  this file is a part of Brace Navlink 

 Author: Robert Edward Steckroth II, BustOut, <RobertSteckroth@gmail.com> */

var info = require("../package.json"),
	program = require("commander"),
	print = require("bracket_print")

var dir = "", repo_url = ""
program.version(info.name + " " + info.version)
.usage(`[options] [directory]
----------------------------------------------------------------------------------------------------
The last argument is the directory where the markdown files are located. This directory does not need to 
be contained within the project repository structure. The last parameter is the base directory where the 
markdown files are found. The directory where the script was started is used when not supplied. This 
directory must be at or below a project root directory structure in order to use the associated information.
The project root is the directory which contains the .git repository. The backup directory can be an 
absolute path or a relative path and does not need to be contained in a project. The project root directory 
will be used as the base directory (the same way the last parameter is), if it is supplied as relative.

//.option("-S, --synchronous", "All functions used in the document parser will happen synchronously (default is asynchronous).")
.parse(process.argv)

// The directory is optional and will be the last process argument if provided from the command line.
if ( process.argv.length <= 2 ) {
	program.outputHelp()
	process.exit(0)
}

// The process exit code is maintained for unit testing via the cli.
require("../../brace_navlink")(program, print({title_stamp: false, log_title: "bin"}), function(exit_code) { process.exit(exit_code) })

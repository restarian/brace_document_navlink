/* Copyright (c) 2018 Robert Steckroth <RobertSteckroth@gmail.com>

	Brace Document Navlink resides under the MIT licensed.

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

  Brace Document Navlink is module to automatically add markdown page navigation links.

  this file is a part of Brace Document Navlink  

 Author: Robert Edward Steckroth, BustOut, <RobertSteckroth@gmail.com> */

var expect = require("chai").expect,
	path = require("path"),
	fs = require("fs"),
	utils = require("bracket_utils"),
	maybe = require("brace_maybe")

var it = maybe(global)	
stop = !!process.env.DRY_RUN  
quiet = !!process.env.QUIET

var remove_cache = utils.remove_cache.bind(null, "r.js", "document_parse.js")
module.paths.unshift(path.join(__dirname, "/..", "/../"))

describe("Using stop further progression methodology for dependencies in: "+path.basename(__filename), function() { 


	describe("Checking for dependencies..", function() { 

		it("r_js in the system as a program", function(done) {
			stop = true 
			expect(fs.existsSync(rjs_path = require.resolve("requirejs")), "could not find r.js dependency").to.be.true
			stop = false 
			done()
		})

		/*
		it("git is available in the system as a program", function(done) {
			stop = true 
			utils.Spawner("git", [], function() {
				expect(true).to.be.true
				stop = false 
				done()
			}, function() {
				expect(false, "git is not available as a system program").to.be.true
				done()
			})
		})
		*/

	})

	describe("Dummy test", function() {

		var requirejs, example_dir = path.join(__dirname, "/example")
		beforeEach(function() {
			remove_cache()
			requirejs = require("requirejs")
			requirejs.config({baseUrl: path.join(__dirname, "/../lib"), nodeRequire: require})

		})

		describe("...", function() {

			it("...", function(done) {
				done()
			})
		})

	})
})


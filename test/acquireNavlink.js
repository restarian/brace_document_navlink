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

 Author: Robert Edward Steckroth, Bust0ut, <RobertSteckroth@gmail.com> */

var expect = require("chai").expect,
	path = require("path"),
	fs = require("fs"),
	utils = require("bracket_utils"),
	maybe = require("brace_maybe")

var remove_cache = utils.remove_cache.bind(null, "r.js", "navlink.js")
module.paths.unshift(path.join(__dirname, "..", ".."))
var it_will = global

describe("using stop further progression methodology for dependencies in: "+path.basename(__filename), function() { 

	var it = maybe(it_will)	
	it_will.stop = !!process.env.DRY_RUN  
	it_will.quiet = !!process.env.QUIET

	describe("checking for dependencies..", function() { 

		it("r_js in the system as a program", function(done) {
			it_will.stop = true 
			expect(fs.existsSync(rjs_path = require.resolve("requirejs")), "could not find r.js dependency").to.be.true
			it_will.stop = false 
			done()
		})

		/*
		it("git is available in the system as a program", function(done) {
			it_will.stop = true 
			utils.Spawn("git", [], function() {
				it_will.stop = false 
				done()
			}, function(error) { expect(false, error).to.be.true; done() })
		})

		it("is able to find the test"+path.sep+"example submodule at " + cwd, function(done) {

			it_will.stop = true 
			utils.Spawn("git", ["config", "--local", "remote.origin.url", "https://my/cool/hosting/unit_test.git"], {cwd: cwd}, (code, stdout, stderr) => {
				it_will.stop = false
				done()
			}, function(error) { expect(false, error).to.be.true; done() })
		})
		*/


	})

	describe("the acquireNavlink API member generates the correct navigation link data when", function() {

		var requirejs, structure, data
		beforeEach(function() {
			remove_cache()
			requirejs = require("requirejs")
			requirejs.config({baseUrl: path.join(__dirname, "..", "lib"), nodeRequire: require})

			structure = [
				"/home/project/doc/about.md",
				{ 
					"specs": [
						"/home/project/doc/spec/meta.md",
						"/home/project/doc/spec/license.md",
						],
				}
			]
		})

		it("all arguments are passed in as empty data objects", function(done) {
			requirejs(["./navlink"], function(navlink) { 

				navlink().acquireNavlink([], "", "", function(nav_list) {

					expect(nav_list).to.be.empty	
					done()

				}, function(error) { expect(false, error).to.be.true; done() })
			})
		})

		it("with all arguments are passed in empty except the structure parameter", function(done) {
			requirejs(["./navlink"], function(navlink) { 

				var nav = navlink()

				nav.option.indentation = "  "
				nav.acquireNavlink(structure, "", "", function(nav_list) {
					// The title and object link should be empty but the list should still be created.
					expect(nav_list).to.deep.equal([ "* [About](/about.md)", "* Specs", "  * [Meta](/specs/meta.md)", "  * [License](/specs/license.md)" ])

					nav.option.indentation = "@"
					nav.acquireNavlink(structure, "", "", function(nav_list) {
						// The title and object link should be empty but the list should still be created.
						expect(nav_list).to.deep.equal([ "* [About](/about.md)", "* Specs", "@* [Meta](/specs/meta.md)", "@* [License](/specs/license.md)" ])
						done()
					}, function(error) { expect(false, error).to.be.true; done() })

				}, function(error) { expect(false, error).to.be.true; done() })

			})
		})

		it("with a structure and link url and an empty current_page", function(done) {
			requirejs(["./navlink"], function(navlink) { 

				navlink().acquireNavlink(structure, "", "https://this/url/different", function(nav_list) {

					// The title and object link should be empty but the list should still be created.
					expect(nav_list).to.deep.equal([ 
						"* [About](https://this/url/different/about.md)", 
						"* Specs", 
						"  * [Meta](https://this/url/different/specs/meta.md)", 
						"  * [License](https://this/url/different/specs/license.md)" 
					])
					done()

				}, function(error) { expect(false, error).to.be.true; done() })
			})
		})

		it("with a structure and link url and a current_path for one of the other stucture entities", function(done) {
			requirejs(["./navlink"], function(navlink) { 

				navlink().acquireNavlink(structure, "/home/project/doc/spec/meta.md", "https://this/url/different", function(nav_list) {

					// The title and object link should be empty but the list should still be created.
					expect(nav_list).to.deep.equal([ 
						"* [About](https://this/url/different/about.md)", 
						"* Specs", 
						"  * **Meta**",
						"  * [License](https://this/url/different/specs/license.md)", 
					])
					done()

				}, function(error) { expect(false, error).to.be.true; done() })
			})
		})
		
		it("-- synchronously -- with a structure and link url and a current_path for a structure entry", function(done) {
			requirejs(["./navlink"], function(navlink) { 

				// The acquireNavlink member is and should be asynchronous so it is checked this way once too.
				expect(
					navlink().acquireNavlink(structure, "/home/project/doc/spec/license.md", "https://this/url/different", function(nav_list) {
					}, function(error) { expect(false, error).to.be.true; done() })
				).to.deep.equal([ 
						"* [About](https://this/url/different/about.md)", 
						"* Specs", 
						"  * [Meta](https://this/url/different/specs/meta.md)",
						"  * **License**", 
					])
				done()
			})
		})
	})
})



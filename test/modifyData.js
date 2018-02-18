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

		/*
		it("r_js in the system as a program", function(done) {
			it_will.stop = true 
			expect(fs.existsSync(rjs_path = require.resolve("requirejs")), "could not find r.js dependency").to.be.true
			it_will.stop = false 
			done()
		})

		it("git is available in the system as a program", function(done) {
			it_will.stop = true 
			utils.Spawn("git", [], function() {
				it_will.stop = false 
				done()
			}, function() {
				expect(false, "git is not available as a system program").to.be.true
				done()
			})
		})

		it("is able to find the test"+path.sep+"example submodule at " + cwd, function(done) {

			it_will.stop = true 
			utils.Spawn("git", ["config", "--local", "remote.origin.url", "https://my/cool/hosting/unit_test.git"], {cwd: cwd}, (code, stdout, stderr) => {
				it_will.stop = false
				done()
			}, function(error) {
				expect(false, error).to.be.true	
				done()
			})
		})
		*/

	})

	describe("the modifyData API member replaces the passed in data", function(done) {

		var requirejs
		beforeEach(function() {
			remove_cache()
			requirejs = require("requirejs")
			requirejs.config({baseUrl: path.join(__dirname, "..", "lib"), nodeRequire: require})
		})


		var structure = [
			"/home/project/doc/about.md",
			{ 
				"specs": [
					"/home/project/doc/spec/meta.md",
					"/home/project/doc/spec/license.md",
					],
			}
		]

		var data = {
			"/home/project/doc/spec/license.md": {
				file_name: 'license.md',
				relative_dir: '',
				document_dir: '/home/myname/company/brace_document/docs_raw',
				base_dir: '/home/myname/company/brace_document/docs_raw',
				primary_heading: '# Brace Document\n',
				secondary_heading: '# License Information\n',
				content: `# Brace Document
# License Information
This is the document page body`
			},
		}

		it("all arguments are passed in as empty data objects", function(done) {
			requirejs(["./navlink"], function(navlink) { 

				navlink().modifyData([], {}, "", function(mutated) {

					expect(mutated).to.be.empty	
					done()

				}, function(error) { expect(false, error).to.be.true; done() })
			})
		})

		it("with all arguments are passed in as empty data objects except the structure parameter", function(done) {
			requirejs(["./navlink"], function(navlink) { 

				navlink().modifyData(structure, {}, "", function(mutated) {

					// The title and object link should be empty but the list should still be created.
					expect(mutated).to.deep.equal({})
					done()

				}, function(error) { expect(false, error).to.be.true; done() })
			})
		})

		it("with a structure and a incomplete data object and an empty link url", function(done) {
			requirejs(["./navlink"], function(navlink) { 

				navlink().modifyData(structure, data, "", function(mutated) {

					//console.log(mutated["/home/project/doc/spec/license.md"].content)
					expect(mutated).to.deep.equal(
					{
						"/home/project/doc/spec/license.md": {
							"base_dir": "/home/myname/company/brace_document/docs_raw",
							"content": "# Brace Document\n# License Information\n\n---\n### Document pages\n* [](/)\n* Specs\n  * [](/)\n  * **/**\n\n---\nThis is the document page body",
							"document_dir": "/home/myname/company/brace_document/docs_raw",
							"file_name": "license.md",
							"primary_heading": "# Brace Document\n",
							"relative_dir": "",
							"secondary_heading": "# License Information\n"
						}
					})

					done()

				}, function(error) { expect(false, error).to.be.true; done() })
			})
		})


		it("with a structure and a incomplete data object that has only one line of page text and an link url and the title set to GooD deal", function(done) {
			requirejs(["./navlink"], function(navlink) { 

				var data = {
					"/home/project/doc/spec/license.md": {
						file_name: 'license.md',
						relative_dir: '',
						document_dir: '/home/myname/company/brace_document/docs_raw',
						base_dir: '/home/myname/company/brace_document/docs_raw',
						primary_heading: '',
						secondary_heading: '',
						content: `This is the document page body`
					},
				}

				var nav = navlink()
				nav.title = "GooD deal"
				nav.modifyData(structure, data, "https://a/good/url", function(mutated) {

					//console.log(mutated["/home/project/doc/spec/license.md"].content)
					expect(mutated).to.deep.equal(
					{
						"/home/project/doc/spec/license.md": {
							"base_dir": "/home/myname/company/brace_document/docs_raw",
							"content": "\n\n---\n### GooD deal\n* [](https://a/good/url/)\n* Specs\n  * [](https://a/good/url/)\n  * **/**\n\n---\nThis is the document page body",
							"document_dir": "/home/myname/company/brace_document/docs_raw",
							"file_name": "license.md",
							"primary_heading": "",
							"relative_dir": "",
							"secondary_heading": ""
						}
					})

					done()

				}, function(error) { expect(false, error).to.be.true; done() })
			})
		})
	})
})



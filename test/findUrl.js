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

var remove_cache = utils.remove_cache.bind(null, "r.js", "document_parse.js")
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

		it("git is available in the system as a program", function(done) {
			it_will.stop = true 
			utils.Spawner("git", [], function() {
				it_will.stop = false 
				done()
			}, function() {
				expect(false, "git is not available as a system program").to.be.true
				done()
			})
		})

	})

	describe("using the blank testing example directory -> " + path.join("test", "example"), function() {

		var cwd = path.join(__dirname, "example"), requirejs
		beforeEach(function() {
			remove_cache()
			requirejs = require("requirejs")
			requirejs.config({baseUrl: path.join(__dirname, "..", "lib"), nodeRequire: require})
		})

		it("is able to create a git repository in the directory if there is not one already at " + cwd, function(done) {

			it_will.stop = true 
			utils.Spawn("git", ["init"], {cwd: cwd}, (code, stdout, stderr) => {
				it_will.stop = false
				done()
			}, function(error) {
				expect(false, error).to.be.true	
				done()
			})
		})

		it("is able to set the remote origin url for the git repository at " + cwd, function(done) {

			it_will.stop = true 
			utils.Spawn("git", ["remote", "add", "origin", "https://my/cool/hosting/unit_test.git"], {cwd: cwd}, (code, stdout, stderr) => {
				it_will.stop = false
				done()
			}, function(error) {
				expect(false, error).to.be.true	
				done()
			})
		})

		it("is able to add all changed to the repository at " + cwd, function(done) {

			it_will.stop = true 
			utils.Spawn("git", ["add", "--all"], {cwd: cwd}, (code, stdout, stderr) => {
				it_will.stop = false
				done()
			}, function(error) {
				expect(false, error).to.be.true	
				done()
			})
		})

		it("is able to create first commit" + cwd, function(done) {

			it_will.stop = true 
			utils.Spawn("git", ["commit", "-m", "'Unit testing generated message'"], {cwd: cwd}, (code, stdout, stderr) => {
				it_will.stop = false
				done()
			}, function(error) {
				expect(false, error).to.be.true	
				done()
			})
		})

		it("finds the correct url data for the project", function(done) {

			requirejs(["navlink"], function(navlink) { 

				var nav = navlink()

				nav.findUrl(cwd, function() {

					expect(nav._origin_url).to.have.keys(Object.keys(require("url").parse("")))
					expect(nav.origin_url).to.include("https://my/cool/hosting/unit_test/blob/"+nav.branch)
					var branch = nav.branch
					utils.Spawn("git", ["rev-parse", "--abbrev-ref", "HEAD"], {cwd: cwd}, (code, stdout, stderr) => {

						expect(stderr).to.be.empty
						expect(stdout).to.include(branch)
						done()
					}, function(error) {
						expect(false, error).to.be.true
						done()
					})
				}, function(error) {
					expect(false, error).to.be.true
					done()
				})
			})
		})
		

	})
})



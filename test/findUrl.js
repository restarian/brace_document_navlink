/* Copyright (c) 2018 Robert Steckroth <RobertSteckroth@gmail.com>

	Brace document navlink resides under the MIT licensed.

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

  Brace document navlink is module to automatically add markdown page navigation links.

  this file is a part of Brace document navlink */

var expect = require("chai").expect,
	path = require("path"),
	fs = require("fs"),
	utils = require("bracket_utils"),
	maybe = require("brace_maybe")

var cache = utils.cacheManager(require)
module.paths.unshift(path.join(__dirname, "..", ".."))
var it_will = global

describe("using stop further progression methodology for dependencies in: "+path.basename(__filename), function() { 

	var it = maybe(it_will)	
	it_will.stop = !!process.env.DRY_RUN  
	it_will.quiet = !!process.env.QUIET

	var cwd = path.join(__dirname, "example")
	
	describe("checking for dependencies..", function() { 

		it("r_js in the system as a program", function(done) {
			it_will.stop = true 
			expect((function() {try { require("requirejs"); return true; } catch(e) { return e; }})()).to.be.true 
			it_will.stop = false 
			done()
		})

		it("git is available in the system as a program", function(done) {
			it_will.stop = true 
			utils.Spawn("git", [], function() {
				it_will.stop = false 
				done()
			}, function(error) { expect(false, error).to.be.true; done() })
		})

		it("is able to find the dummy submodule at " + cwd, function(done) {
			it_will.stop = true 
			utils.Spawn("git", ["rev-parse", "--show-toplevel"], {cwd: cwd}, (code, stdout, stderr) => {
				var ab_p = stdout.replace(/^[\n,\r,\t]*/, "").replace(/[\n,\r,\t]*$/, "")
				expect(ab_p).to.equal(ab_p.replace(/\\/g, "\/"))
				it_will.stop = false
				done()
			}, function(error) { expect(false, error).to.be.true; done() })
		})

		it("is able to set a new remote origin to the dummy repository " + cwd, function(done) {
			it_will.stop = true 
			utils.Spawn("git", ["config", "--local", "remote.origin.url", "https://my/cool/hosting/unit_test.git"], {cwd: cwd}, (code, stdout, stderr) => {
				it_will.stop = false
				done()
			}, function(error) { expect(false, error).to.be.true; done() })
		})

	})

	describe("using the blank testing example directory -> " + path.join("test", "example"), function() {

		var requirejs
		beforeEach(function() {
			cache.start()
			requirejs = require("requirejs")
			requirejs.config({baseUrl: path.join(__dirname, "..", "lib"), nodeRequire: require})
		})
		afterEach(cache.dump.bind(cache))

		it("finds the correct url data for the project", function(done) {
			requirejs(["./navlink"], function(navlink) { 

				navlink(function() {
					this.findUrl(cwd, () => {

						expect(this._origin_url).to.have.keys(Object.keys(require("url").parse("")))
						expect(this.origin_url).to.include("https://my/cool/hosting/unit_test/blob/"+this.branch)
						var branch = this.branch
						utils.Spawn("git", ["rev-parse", "--abbrev-ref", "HEAD"], {cwd: cwd}, (code, stdout, stderr) => {

							expect(stderr).to.be.empty
							expect(stdout.replace(/\s/g, "")).to.equal(branch)
							done()
						}, function(error) { expect(false, error).to.be.true; done() })
					}, function(error) { expect(false, error).to.be.true; done() })
				})
			})
		
		})
	})
})



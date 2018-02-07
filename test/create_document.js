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

var remove_cache = utils.remove_cache.bind(null, "r.js", "navlink_parse.js")
module.paths.unshift(path.join(__dirname, "/..", "/../"))

describe("using stop further progression methodology for dependencies in: "+path.basename(__filename), function() { 

	var it_will = global
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
			stop = true 
			utils.Spawner("git", [], function() {
				expect(true).to.be.true
				it_will.stop = false 
				done()
			}, function() {
				expect(false, "git is not available as a system program").to.be.true
				done()
			})
		})

	})

	describe("using the blank testing example directory -> " + path.join("example", "/empty_project"), function() {

		var requirejs, cwd = path.join(__dirname, "/example", "/empty_project")
		beforeEach(function() {
			remove_cache()
			requirejs = require("requirejs")
			requirejs.config({baseUrl: path.join(__dirname, "/../lib"), nodeRequire: require})

		})

		describe("with no flags set to the document_parser", function(done) {
/*
			it("Outputs correct error if the origin url is not set", function(done) {

				utils.Spawn("git", "config", "--local", "origin"
				requirejs(["document_parse"], function(document_parse) { 

					var parser = document_parse()
					parser.relative_docs_dir = path.join("../", "empty_project")

					parser.findPath(cwd, function() {

						parser.findUrl(parser.project_root, function() {
							
						}, function(error) {
							expect(error.toString()).to.include("The origin url for this project is not available and will not set.")
							done()
						})
					}, function(error) {
						expect(false, error).to.be.true
						done()
					})
				})
			})
*/			
			it.only("finds the correct url data", function(done) {

				utils.Spawn("git", ["remote", "add", "origin", "https://cool/joe/hosting"], {cwd: cwd}, function(code, stdout, stderr) {
					expect(stderr).to.be.empty
					requirejs(["document_parse"], function(document_parse) { 

						var parser = document_parse()
						parser.relative_docs_dir = path.join("../", "empty_project")

						parser.findPath(cwd, function() {

							parser.findUrl(parser.project_root, function() {
								
								// This should be moralized but the same as the location set above
								expect(parser.relative_docs_dir).to.equal(path.join(".", "/"))
								// Should be the same as the relative_docs_dir if it is not provided.
								expect(parser.relative_backup_dir).to.equal(parser.relative_docs_dir)
								expect(parser._origin_url).to.have.keys(Object.keys(require("url").parse("")))
								expect(parser.origin_url).to.include(`https://cool/joe/hosting`)
								expect(parser.origin_url).to.include(parser.relative_backup_dir)
								var branch = parser.branch
								utils.Spawn("git", ["rev-parse", "--abbrev-ref", "HEAD"], function(code, stdout) {
									expect(stdout).to.equal(branch)
									done()
								})
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

		describe("with the backup directory option used and verbose flag set", function(done) {

			it("finds the correct url data", function(done) {

				requirejs(["document_parse"], function(document_parse) { 

					var parser = document_parse()
					parser.relative_docs_dir = "../empty_project"
					parser.backup = "../docs_temp"

					parser.find_git_root(cwd, function(root) {
						parser.find_relative_data(root, function() {
							
							expect(parser.relative_docs_dir).to.equal("./")
							expect(parser.relative_backup_dir).to.equal("docs_temp")
							expect(parser._origin_url).to.have.keys(Object.keys(require("url").parse("")))
							expect(parser.origin_url).to.include(`https://`)
							expect(parser.origin_url).to.include(parser.relative_backup_dir)
							var branch = parser.branch
							utils.Spawn("git", ["branch"], function(code, stdout) {
								expect(stdout).to.include("* "+branch)
								done()
							})
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
})


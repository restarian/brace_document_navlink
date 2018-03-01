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
	maybe = require("brace_maybe"),
	os = require("os")

var EOL = os.platform() === "win32" && "\r\n" || "\n"

var cache = utils.cacheManager(require)
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

	describe("the modifyData API member correctly alters the passed in data when", function(done) {

		afterEach(cache.dump.bind(cache))
		var requirejs, structure_a, structure_b, data_a, data_b
		beforeEach(function() {
			cache.start()
			requirejs = require("requirejs")
			requirejs.config({baseUrl: path.join(__dirname, "..", "lib"), nodeRequire: require})

			structure_a = [
				"/home/project/doc/about.md",
				{ 
					"specs": [
						"/home/project/doc/spec/meta.md",
						"/home/project/doc/spec/testing_file.md",
						],
				},
				{ 
					"contact": [
						"/home/project/doc/author.md",
					],
				},
			]

			structure_b = [
				"/home/project/doc/about.md",
				{ 
					"specs": "bad sata",
				},
				{ 
					"contact": [
						"/home/project/doc/author.md",
						{ 
							"a_person": [
								"/home/project/doc/a_person/man.md",
								"/home/project/doc/a_person/woman.md",
							],
						}
					],
				},
				{}
			]

			structure_c = [
				"/home/project/doc/about.md",
				"/home/project/doc/spec/meta.md",
				"/home/project/doc/spec/testing_file.md",
				{}
			]

			data_a = {
				"/home/project/doc/spec/testing_file.md": {
					content: `# Brace Document
# License Information
	This is the document page body`
				},
			}

			data_b = {
				"/home/project/doc/spec/testing_file.md": {
					content: ""
				},
			}
		})

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

				navlink().modifyData(structure_a, {}, "", function(mutated) {

					// The title and object link should be empty but the list should still be created.
					expect(mutated).to.deep.equal({})
					done()

				}, function(error) { expect(false, error).to.be.true; done() })
			})
		})

		it("with a structure and a incomplete data object and an empty link url", function(done) {
			requirejs(["./navlink"], function(navlink) { 

				navlink(function() { 
					this.modifyData(structure_a, data_a, "", function(mutated) {

						expect(mutated).to.deep.equal(
						{
							"/home/project/doc/spec/testing_file.md": {
								"content": EOL+"---"+EOL+"### Document pages"+EOL+
								"* [About](/about.md)"+EOL+ 
								"* Specs"+EOL+"  * [Meta](/specs/meta.md)"+EOL+ "  * **Testing file**"+ EOL + 
								"* Contact" + EOL + "  * [Author](/contact/author.md)" + EOL +
								"# Brace Document"+EOL+"# License Information"+EOL+"\tThis is the document page body"
							}
						})
						done()

					}, function(error) { expect(false, error).to.be.true; done() })
				})
			})
		})

		it("with a structure and a incomplete data object which has an empty content value and an empty link url", function(done) {
			requirejs(["./navlink"], function(navlink) { 

				navlink(function() { 
					this.modifyData(structure_a, data_b, "", function(mutated) {

						expect(mutated).to.deep.equal(
						{
							"/home/project/doc/spec/testing_file.md": {
								"content": EOL+"---"+EOL+"### Document pages"+EOL+
								"* [About](/about.md)"+EOL+ 
								"* Specs"+EOL+"  * [Meta](/specs/meta.md)"+EOL+ "  * **Testing file**"+ EOL + 
								"* Contact" + EOL + "  * [Author](/contact/author.md)" + EOL
							}
						})
						done()

					}, function(error) { expect(false, error).to.be.true; done() })
				})
			})
		})
		
		it("with a structure and a incomplete data object which has an empty content value and an empty link url with the forceTitle option", function(done) {
			requirejs(["./navlink"], function(navlink) { 

				navlink(function() { 
					this.option.forceTitle = true
					this.option.title = "sweet"

					this.modifyData(structure_a, data_b, "", function(mutated) {

						expect(mutated).to.deep.equal(
						{
							"/home/project/doc/spec/testing_file.md": {
								"content": EOL+"---"+EOL+"### sweet"+EOL+
								"* [About](/about.md)"+EOL+ 
								"* Specs"+EOL+"  * [Meta](/specs/meta.md)"+EOL+ "  * **Testing file**"+ EOL + 
								"* Contact" + EOL + "  * [Author](/contact/author.md)" + EOL 
							}
						})
						done()

					}, function(error) { expect(false, error).to.be.true; done() })
				})
			})
		})

		it("with a structure and a incomplete data object that has only one line of page text and an link url and the title set to GooD deal", function(done) {
			requirejs(["./navlink"], function(navlink) { 

				var data = {
					"/home/project/doc/spec/testing_file.md": {
						content: `This is the document page body
`
					},
				}

				var nav = navlink()
				nav.option.title = "GooD deal"
				nav.modifyData(structure_a, data, "https://a/good/url", function(mutated) {

					expect(mutated).to.deep.equal(
					{
						"/home/project/doc/spec/testing_file.md": {
							"content": EOL+"---"+EOL+"### GooD deal"+EOL+
								"* [About](https://a/good/url/about.md)"+EOL+ 
								"* Specs"+EOL+"  * [Meta](https://a/good/url/specs/meta.md)"+EOL+ "  * **Testing file**"+ EOL + 
								"* Contact" + EOL + "  * [Author](https://a/good/url/contact/author.md)" + EOL +
								"This is the document page body" + EOL
						}
					})
					done()

				}, function(error) { expect(false, error).to.be.true; done() })
			})
		})

		it("with a nested structure and incomplete data object that has only one line of page text and an link url and the title option used", function(done) {
			requirejs(["./navlink"], function(navlink) { 

				var data = {
					"/home/project/doc/spec/testing_file.md": {
						content: `This is the document page body`
					},
				}

				var nav = navlink()
				nav.option.title = "GooD deal"
				nav.modifyData(structure_b, data, "https://a/good/url", function(mutated) {

					expect(mutated).to.deep.equal(
					{
						"/home/project/doc/spec/testing_file.md": {
							"content": EOL+"---"+EOL+"### GooD deal"+EOL+
								"* [About](https://a/good/url/about.md)"+EOL+ 
								"* Specs" + EOL + 
								"* Contact" + EOL + "  * [Author](https://a/good/url/contact/author.md)" + EOL +
									"  * A person" +EOL+"    * [Man](https://a/good/url/contact/a_person/man.md)" + EOL + "    * [Woman](https://a/good/url/contact/a_person/woman.md)" + EOL +

								"This is the document page body"
						}
					})
					done()

				}, function(error) { expect(false, error).to.be.true; done() })
			})
		})

		it("with a nested structure and incomplete data object that has a barebones navlink identifier", function(done) {
			requirejs(["./navlink"], function(navlink) { 

				var data = {
					"/home/project/doc/spec/testing_file.md": {
						content: `
---
### Cool

*
This is the document page body	`
					},
				}

				var nav = navlink()
		//		nav.option.title = "GooD deal"
				nav.modifyData(structure_b, data, "https://a/good/url", function(mutated) {

					expect(mutated).to.deep.equal(
					{
						"/home/project/doc/spec/testing_file.md": {
							"content": EOL+"---"+EOL+"### Cool"+EOL+
								"* [About](https://a/good/url/about.md)"+EOL+ 
								"* Specs" + EOL + 
								"* Contact" + EOL + "  * [Author](https://a/good/url/contact/author.md)" + EOL +
									"  * A person" +EOL+"    * [Man](https://a/good/url/contact/a_person/man.md)" + EOL + "    * [Woman](https://a/good/url/contact/a_person/woman.md)" + EOL +

								EOL+"*"+EOL +
								"This is the document page body\t"
						}
					})
					done()

				}, function(error) { expect(false, error).to.be.true; done() })
			})
		})

		describe("with a nested structure and incomplete data object and using content", function() {

			it("in content variant A", function(done) {
				requirejs(["./navlink"], function(navlink) { 

					var data = {
						"/home/project/doc/spec/testing_file.md": {
							content: `
*****
######### Cool
	This is the document page body`
						},
					}

					var nav = navlink()
			//		nav.option.title = "GooD deal"
					nav.modifyData(structure_b, data, "https://a/good/url", function(mutated) {

						expect(mutated).to.deep.equal(
						{
							"/home/project/doc/spec/testing_file.md": {
								"content": EOL+"*****"+EOL+"######### Cool"+EOL+
									"* [About](https://a/good/url/about.md)"+EOL+ 
									"* Specs" + EOL + 
									"* Contact" + EOL + "  * [Author](https://a/good/url/contact/author.md)" + EOL +
										"  * A person" +EOL+"    * [Man](https://a/good/url/contact/a_person/man.md)" + EOL + "    * [Woman](https://a/good/url/contact/a_person/woman.md)" + EOL +
									"\tThis is the document page body"
							}
						})
						done()

					}, function(error) { expect(false, error).to.be.true; done() })
				})
			})

			it("in content variant B", function(done) {
				requirejs(["./navlink"], function(navlink) { 

					var data = {
						"/home/project/doc/spec/testing_file.md": {
							content: `
	*****
######### Cool


	This is the document page body`
						},
					}

					var nav = navlink()
			//		nav.option.title = "GooD deal"
					nav.modifyData(structure_b, data, "https://a/good/url", function(mutated) {

						expect(mutated).to.deep.equal(
						{
							"/home/project/doc/spec/testing_file.md": {
								"content": EOL+"*****"+EOL+"######### Cool"+EOL+
									"* [About](https://a/good/url/about.md)"+EOL+ 
									"* Specs" + EOL + 
									"* Contact" + EOL + "  * [Author](https://a/good/url/contact/author.md)" + EOL +
										"  * A person" +EOL+"    * [Man](https://a/good/url/contact/a_person/man.md)" + EOL + "    * [Woman](https://a/good/url/contact/a_person/woman.md)" + EOL + EOL + EOL + 
									"This is the document page body" + EOL
							}
						})
						done()

					}, function(error) { expect(false, error).to.be.true; done() })
				})
			})

			it("in content variant C", function(done) {
				requirejs(["./navlink"], function(navlink) { 

					var data = {
						"/home/project/doc/spec/testing_file.md": {
							content: `
	*****
######### Cool

	* This is safe
	This is the document page body`
						},
					}

					var nav = navlink()
			//		nav.option.title = "GooD deal"
					nav.modifyData(structure_b, data, "https://a/good/url", function(mutated) {

						expect(mutated).to.deep.equal(
						{
							"/home/project/doc/spec/testing_file.md": {
								"content": EOL+"*****"+EOL+"######### Cool"+EOL+
									"* [About](https://a/good/url/about.md)"+EOL+ 
									"* Specs" + EOL + 
									"* Contact" + EOL + "  * [Author](https://a/good/url/contact/author.md)" + EOL +
										"  * A person" +EOL+"    * [Man](https://a/good/url/contact/a_person/man.md)" + EOL + "    * [Woman](https://a/good/url/contact/a_person/woman.md)" + EOL + EOL + "\t* This is safe" + EOL +
									"\tThis is the document page body" + EOL
							}
						})
						done()

					}, function(error) { expect(false, error).to.be.true; done() })
				})
			})

			it("in content variant D", function(done) {
				requirejs(["./navlink"], function(navlink) { 

					var data = {
						"/home/project/doc/spec/testing_file.md": {
							content: `



######### Cool

* This is safe
This is the document page body`
						},
					}

					var nav = navlink()
					nav.modifyData(structure_b, data, "https://a/good/url", function(mutated) {

						expect(mutated).to.deep.equal(
						{
							"/home/project/doc/spec/testing_file.md": {
								"content": EOL + "---" + EOL + "### Document pages" + EOL +
									"* [About](https://a/good/url/about.md)" + EOL + 
									"* Specs" + EOL + 
									"* Contact" + EOL + "  * [Author](https://a/good/url/contact/author.md)" + EOL +
									"  * A person" +EOL +
										"    * [Man](https://a/good/url/contact/a_person/man.md)" + EOL + 
										"    * [Woman](https://a/good/url/contact/a_person/woman.md)" + 
									EOL + EOL + EOL + EOL + EOL + "######### Cool" + EOL + EOL + 
									"* This is safe" + EOL +
									"This is the document page body"
							}
						})
						done()

					}, function(error) { expect(false, error).to.be.true; done() })
				})
			})

			it.skip("in content variant E", function(done) {
				requirejs(["./navlink"], function(navlink) { 

					var data = {
						"/home/project/doc/spec/testing_file.md": {
							content: `
	*****
######### Cool

	* This is safe
	This is the document page body`
						},
					}

					var nav = navlink()
			//		nav.option.title = "GooD deal"
					nav.modifyData(structure_b, data, "https://a/good/url", function(mutated) {

						expect(mutated).to.deep.equal(
						{
							"/home/project/doc/spec/testing_file.md": {
								"content": EOL+"\t*****"+EOL+"######### Cool"+EOL+
									"* [About](https://a/good/url/about.md)"+EOL+ 
									"* Specs" + EOL + 
									"* Contact" + EOL + "  * [Author](https://a/good/url/contact/author.md)" + EOL +
										"  * A person" +EOL+"    * [Man](https://a/good/url/contact/a_person/man.md)" + EOL + "    * [Woman](https://a/good/url/contact/a_person/woman.md)" + EOL + EOL + "\t* This is safe" + EOL +
									"\tThis is the document page body" + EOL
							}
						})
						done()

					}, function(error) { expect(false, error).to.be.true; done() })
				})
			})
		})
	})
})



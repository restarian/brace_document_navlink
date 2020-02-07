/* Copyright (C) 2018 Robert Steckroth <RobertSteckroth@gmail.com>

Brace document navlink resides under the MIT license

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

  Brace document navlink is module which generates  markdown page navigation links.

  this file is a part of Brace document navlink  

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. */

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

	describe("checking for dependencies..", function() { 

		it("r_js in the system as a program", function(done) {
			it_will.stop = true 
			expect((function() {try { require("requirejs"); return true; } catch(e) { return e; }})()).to.be.true 
			it_will.stop = false 
			done()
		})

	})

	describe("the other API members such as", function(done) {

		var requirejs
		beforeEach(function() {
			cache.start()
			requirejs = require("requirejs")
			requirejs.config({baseUrl: path.join(__dirname, "..", "lib"), nodeRequire: require})
		})
		afterEach(cache.dump.bind(cache))

		it("the sentenceConvert member works as expected", function(done) {
			requirejs(["./navlink"], function(navlink) { 

				var nav = navlink()
				expect(nav.sentenceConvert("cooljoes")).to.equal("Cooljoes")
				expect(nav.sentenceConvert("cool joes")).to.equal("Cool joes")
				expect(nav.sentenceConvert("cool Joes")).to.equal("Cool joes")
				expect(nav.sentenceConvert("Cool Joes")).to.equal("Cool joes")
				expect(nav.sentenceConvert("CoolJoes")).to.equal("Cool joes")
				expect(nav.sentenceConvert(" CoolJoes")).to.equal("Cool joes")
				expect(nav.sentenceConvert(" CoolJoes\n ")).to.equal("Cool joes")

				expect(nav.sentenceConvert("Cool JoesHere   man")).to.equal("Cool joes here man")
				expect(nav.sentenceConvert("Cool_Joes_\n_here-man")).to.equal("Cool joes here man")
				expect(nav.sentenceConvert("-Cool Joes_here-man")).to.equal("Cool joes here man")
				expect(nav.sentenceConvert("cool,_Joes,_man")).to.equal("Cool, joes, man")

				expect(nav.sentenceConvert("--_Cool Joes_here-man")).to.equal("Cool joes here man")
				expect(nav.sentenceConvert("--_Cool Joes__here-man")).to.equal("Cool joes here man")
				expect(nav.sentenceConvert(".Cool 	\tJoes+here.man ")).to.equal("Cool joes here man")
				expect(nav.sentenceConvert("  .!@Cool$@#\n*&( Joes+here()()(-man  ")).to.equal("!@cool$@ &( joes here()()( man")
				expect(nav.sentenceConvert(".!  @Cool\t[]&#*(\n\t\r\t\r\n$@#*&( Joes+here()()(-man")).to.equal("! @cool []& ( $@ &( joes here()()( man")
				done()
				}, function(error) { expect(false, error).to.be.true; done() })
		})
	})
})



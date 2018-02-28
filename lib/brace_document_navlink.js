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

if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(["bracket_print", "./navlink.js"], function(print, navlink) {

	return function(parser, up, cb, err) {

		// The simplest way to determine if the argument is of the bracket_print type.
		if ( up && up.parent && (up instanceof up.parent) ) 
			this.up = up = up.spawn(up.log_title+" -> ") 
		else {
			if ( typeof up === "function" ) {
				err = cb 
				cb = up
			}
			this.up = up = print({level: 1, title: true, title_stamp: false})
		}

		up.log_title = up.log_title + "brace_document_navlink"
		this.up_err = up.spawn({level: 2, log_title: up.log_title+" - ERROR"})	

		cb = typeof cb === "function" && cb || function(){}
		// Create the error callback which will transfer the logger from this method into the calling method error callback.
		var err_cb = function() {
			if ( typeof err === "function" )
				err.apply(err.prototype, arguments)
		}

		// Create the parser instance with the local logger so that the title and options are matched and linked.
		var api = navlink(up)

		// The parser uses all of the option data passed into the constructor which can can also be the object returned from the cli script. Here is
		// where any additional option mis-configuration checking logic should be added.
		api.parser = parser

		parser = parser || {}
		// The option can be a commander instance or a object literal.
		if ( typeof parser.option === "object" ) 
			api.option = parser.option
		else
			api.option = parser

		this.runThrough = function(structure, data, cb, err) {
			
			cb = typeof cb === "function" && cb || function(){}
			// Create the error callback which will transfer the logger from this method into the calling method error callback.
			var err_cb = function() {
				if ( typeof err === "function" )
					err.apply(err.prototype, arguments)
			}

			parser.findUrl(parser.project_root, (url) => {
				api.modifyData(structure, data, url, (data) => { 
					cb(24)
				}, err_cb)
			}, err_cb)
		}

		return this
	}

})



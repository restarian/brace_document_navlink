/* Copyright (c) 2020 Robert Steckroth <RobertSteckroth@gmail.com> -- MIT License

Brace Document Navlink resides under the MIT license

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

  Brace Document Navlink is module which generates markdown page navigation links.

  this file is a part of Brace Document Navlink  

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. */

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
		var err_cb = function() { if ( typeof err === "function" ) err.apply(err.prototype, arguments) }

		var nav = navlink(up)
		parser.addPlugin(nav)

		this.runThrough = function(structure, data, cb, err) {
			
			cb = typeof cb === "function" && cb || function(){}
			// Create the error callback which will transfer the logger from this method into the calling method error callback.
			var err_cb = function() { if ( typeof err === "function" ) err.apply(err.prototype, arguments) }

			nav.findUrl(parser.project_root, (url) => {
				nav.modifyData(structure, data, url, (data) => { 
					cb(24)
				}, err_cb)
			}, err_cb)
		}

		return this
	}

})



if (typeof define !== 'function') { var define = require('amdefine')(module) }

var path = require("path"),
	utils = require("bracket_utils"),
	url = require("url")

define(["bracket_print"], function(print) {
	
	var def = function(up, cb, err) {

		// This iterator returns an instanced link of the module regardless if the new keyword is used.
		var call_instance
		if ( !(this instanceof (call_instance = def) ) )
			return new (Array.prototype.slice.call(arguments).reduce(function(accumulator, value) {
				return accumulator = accumulator.bind(accumulator.prototype, value)
			}, call_instance))()

		cb = typeof cb === "function" && cb || function(){}
		err = typeof err === "function" && err || function(){}
	
		if ( up instanceof print ) 
			this.up = up = up.spawn(up.log_title+" -> ") 
		else {
			if ( typeof up === "function" )
				cb = up
			this.up = up = print({title: true, title_stamp: false})
		}

		up.log_title = up.log_title + "navlink"
		this.up_err = up.spawn({title: true, level: 2, title_stamp: false, title: up.log_title+" - ERROR:"})	

		this._origin_url = ""
		this.title = ""
		this.force_title = false
		this.url = ""
	}
	
	def.prototype = { 

		findUrl: function(dir, cb, err) {

			// Set the chaining logging titles to also have this member name. -------------------------------------
			var up_err = this.up_err.s(), up = this.up.s()
			up.log_title = up.log_title + " - findUrl()"
			up_err.log_title = up.log_title + " - ERROR"
			cb = typeof cb === "function" && cb || function(){}
			// Create the error callback which will transfer the logger from this method into the calling method error callback.
			var err_cb = function() {
				if ( typeof err === "function" )
					err.apply(err.prototype, arguments)
			} // --------------------------------------------------------------------------------------------------

			utils.Spawn("git", ["config", "--get", "remote.origin.url"], {cwd: dir}, (code, stdout, stderr) => { 

				if ( stderr || !stdout ) 
					return err_cb(up_err.log("The origin url for this project is not available and will not set."))
				
				this._origin_url = url.parse(stdout)

				// The current branch is used so that the other branches commit separate docs.
				utils.Spawn("git", ["rev-parse", "--abbrev-ref", "HEAD"], {cwd: dir}, (code, stdout, stderr) => {

					if ( stderr || !stdout ) 
						return err_cb(up_err.log(stderr, "The branch name url for this project is not available and will not set."))

					this.branch = stdout.replace(/\s*\*\s*/, "").replace(/[\n\r]*/g, "")
					// The url is constructed using the git repository information in the directory found above.
					this.origin_url = this.url || (this._origin_url.protocol + "//"+ this._origin_url.hostname + 
						path.posix.join(this._origin_url.path.replace(/\.git$/, ""), "/blob", "/", this.branch, "/") )//, this.relative_backup_dir) )

					cb()

				}, err_cb)
			}, err_cb)
		},
		acquireDocument: function(structure, page_data, navlink_url, backup_dir, cb, err) {
			// This makes an Object with information regarding the markdown files found in the directory.
			// Read the markdown file into a string. The synchronous version is used so it will be closed before it is re-opened and over-written to.

			// Set the chaining logging titles to also have this member name. -------------------------------------
			var up_err = this.up_err.s(), up = this.up.s()
			up.log_title = up.log_title + " - acquireDocument()"
			up_err.log_title = up.log_title + " - ERROR"
			cb = typeof cb === "function" && cb || function(){}
			// Create the error callback which will transfer the logger from this method into the calling method error callback.
			var err_cb = function() {
				if ( typeof err === "function" )
					err.apply(err.prototype, arguments)
			} // --------------------------------------------------------------------------------------------------

			var data, cnt = 0

			Object.keys(page_data).forEach(function(location, index, proto) {

				data = page_data[location]
				content = data.content
				
				// create_navlink is always synchronous.
				var nav_list = this.create_navlink(structure, page_data, location, navlink_url, null, err)
				var nav_header = content.match(this.header_regex)
				var found_link = !!nav_header

				// If the nav_header is not found than the file sub-heading will be used to inject the navigation links. The links are put directly under 
				// the file sub-heading. The links are put under the navigation sub-header is that is found otherwise.
				if ( !found_link ) 
					// The navigation sub-heading is added to the page if the page sub-heading is needed to inject the links text. This will not happen
					// the next time this script is run unless the navigation data is removed somehow otherwise.
					content = content.replace(this.title_regex, nav_header.shift()+"\n\n----\n### " + this.title + "\n"+nav_list.join("\n")+"\n\n----\n")
				else
					while ( found_link ) {

						found_link = false
						// The loop is continued if another link is found under the navigation sub-heading. The loop will stop when all of the links that are
						// directly under the navigation sub-heading are removed from the contents string.
						content = content.replace(this.header_link_regex, function(all, navlink_header, navlink_title, navlink_page ) { 
							// Set the loop to go again and return the first match to be matched again. 
							return found_link = true && (navlink_header + navlink_title) 

						})
					}

				var nav_title = this.force_title && this.title || nav_header[2] 
				var nav_markup = nav_header[1]
					
				content = content.replace(this.header_regex, nav_markup + nav_title + "\n" + nav_list.join("\n") + "\n\n")

			}, this)

		},
		createNavlink: function(structure, page_data, location, navlink_url, cb, err) {

			// Set the chaining logging titles to also have this member name.
			var up_err = this.up_err.s(), up = this.up.s()
			up.log_title = up.log_title + " - createNavlink()"
			up_err.log_title = up.log_title + " - ERROR"

			cb = typeof cb === "function" && cb || function(){}
			// Create the error callback which will transfer the logger from this method into the calling method error callback.
			var err_cb = function() {
				if ( typeof err === "function" )
					err.apply(err.prototype, arguments)
			}

			// This finds the pattern above and also finds a markdown style link immediately after it. The navigation links sub-heading title and the 
			// links are in separate regex matching groups.
			var navlist = [], level = ""

			var make_navlink = function(structure, level) {

				structure.forEach(function(value) {

					if ( Object.prototype.toString.call(value) === "[object Object]" ) {
						// This happens when the link for the navlist is the same as the current document being viewed.
						var dir_name = Object.keys(value).pop()
						// Instead of creating a link the list entry will be bold text to identify the current page.
						navlist.push(level + "* " + dir_name.charAt(0).toUpperCase()+dir_name.substr(1))
						make_navlink(value[dir_name], level + "  ")
						return
					}

					if ( location === value )
						navlist.push(level+"* **"+page_data[value].title.replace(/\s+$/, "")+"**") 
					else 
						// Create an array with all of the links to all of the other pages except for the current page (value), sense there is no need to have
						// a link to the current page being viewed in the navlink.
						navlist.push(level+"* ["+page_data[value].title+"]("+
							// Make sure to add the url before the join so that the double slashes are not seen as superfluous.
							navlink_url + path.posix.join("/", page_data[value].relative_dir, "/", page_data[value].file_name)+")"
						)
					
				})
			}

			make_navlink(structure, level)

			cb(navlist)
			return navlist
		},
	
	}

	return def
})



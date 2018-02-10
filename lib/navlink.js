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

		this.url = ""
		this.title = ""
		this.force_title = false

		this._origin_url = ""
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

					this.branch = stdout.replace(/\s/g, "")
					// The url is constructed using the git repository information in the directory found above.
					this.origin_url = this.url || (this._origin_url.protocol + "//"+ this._origin_url.hostname + 
						path.posix.join(this._origin_url.path.replace(/\.git$/, ""), "/blob", "/", this.branch, "/") )//, this.relative_backup_dir) )

					cb()

				}, err_cb)
			}, err_cb)
		},
		modifyData: function(structure, data, navlink_url, cb, err) {
			// Alter the data with the plugin objective and return the new data object. Any mutations must keep object links to the page object so that the
			// original data object is mutated. There is no way to get the original data back so any changes should not break other plugin design hopes.

			// The navlink url parameter is optional.
			if ( typeof navlink_url !== "string" ) {
				err = cb
				cb = navlink_url
				navlink_url = this.origin_url
			}

			// Set the chaining logging titles to also have this member name. -------------------------------------
			var up_err = this.up_err.s(), up = this.up.s()
			up.log_title = up.log_title + " - modifyData()"
			up_err.log_title = up.log_title + " - ERROR"
			cb = typeof cb === "function" && cb || function(){}
			// Create the error callback which will transfer the logger from this method into the calling method error callback.
			var err_cb = function() {
				if ( typeof err === "function" )
					err.apply(err.prototype, arguments)
			} // --------------------------------------------------------------------------------------------------

			var data, cnt = 0

			Object.keys(data).forEach((dir, index, proto) => {

				page = data[dir]
				
				// createNavlink is always synchronous.
				var nav_list = this.createNavlink(structure, data, dir, navlink_url, null, err)
				var nav_header = content.match(this.header_regex)
				var found_link = !!nav_header

				// If the nav_header is not found than the file sub-heading will be used to inject the navigation links. The links are put directly under 
				// the file sub-heading. The links are put under the navigation sub-header is that is found otherwise.
				if ( !found_link ) 
					// The navigation sub-heading is added to the page if the page sub-heading is needed to inject the links text. This will not happen
					// the next time this script is run unless the navigation data is removed somehow otherwise.
					page.content = page.content.replace(this.title_regex, nav_header.shift()+"\n\n----\n### " + this.title + "\n"+nav_list.join("\n")+"\n\n----\n")
				else
					while ( found_link ) {

						found_link = false
						// The loop is continued if another link is found under the navigation sub-heading. The loop will stop when all of the links that are
						// directly under the navigation sub-heading are removed from the contents string.
						page.content = page.content.replace(this.header_link_regex, function(all, navlink_header, navlink_title, navlink_page ) { 
							// Set the loop to go again and return the first match to be matched again. 
							return found_link = true && (navlink_header + navlink_title) 

						})
					}

				var nav_title = this.force_title && this.title || nav_header[2] 
				var nav_markup = nav_header[1]
					
				page.content = page.content.replace(this.header_regex, nav_markup + nav_title + "\n" + nav_list.join("\n") + "\n\n")

			})

		},
		createSentence: function(str, cb) {
			// Turn a string into words by converting the non-letter characters into spaces and capitalizing the first letter of the first word.
			
			cb = typeof cb === "function" && cb || function(){}

			// Convert camel case into spaces
			str = str.replace(/([a-z]+)([A-Z])/g, "$1 $2")
			// Turn everything which is not a letter into a space (including underscore which is matched by \w).
			.replace(/\W+/g, " ").replace(/\_+/g, " ")

			// The first letter will be capitalized.
			str = str.charAt(0).toUpperCase() + str.substr(1)

			// All of the words should have the first letter capitalized.
			//.replace(/\w+/g, function(mat) { return mat.charAt(0).toUpperCase() + mat.substr(1) })

			cb(str)
			return str

		},
		createNavlink: function(structure, data, full_path, navlink_url, cb, err) {
		// This method is tasked with creating a navigation list for a single documentation page that represents the structure passed in. All of 
		// the properties within the data object is optional but it should at least have a title, relative_dir and file_name values for all of 
		// the paths in the structure. The full_path parameter is used to identify which document the navigation list is being generated for as 
		// that page will not contain a link to itself in the list. The navlink_url is completely optional as it will be set to the origin_url
		// which is created in the findUrl member. Note: the data object passed in will be mutated via ecma object linking. 

			// The navlink url parameter is optional.
			if ( typeof navlink_url !== "string" ) {
				err = cb
				cb = navlink_url
				navlink_url = this.origin_url
			}

			// Set the chaining logging titles to also have this member name. -------------------------------------
			var up_err = this.up_err.s(), up = this.up.s()
			up.log_title = up.log_title + " - createNavlink()"
			up_err.log_title = up.log_title + " - ERROR"
			cb = typeof cb === "function" && cb || function(){}
			// Create the error callback which will transfer the logger from this method into the calling method error callback.
			var err_cb = function() {
				if ( typeof err === "function" )
					err.apply(err.prototype, arguments)
			} // --------------------------------------------------------------------------------------------------

			// This finds the pattern above and also finds a markdown style link immediately after it. The navigation links sub-heading title and the 
			// links are in separate regex matching groups.
			var navlist = [], level = ""

			var make_navlink = (structure, level) => {

				structure.forEach((value) => {

					if ( Object.prototype.toString.call(value) === "[object Object]" ) {
						// This happens when the link for the navlist is the same as the current document being viewed.
						var dir_name = Object.keys(value).pop()
						// Instead of creating a link the list entry will be bold text to identify the current page.
						navlist.push(level + "* " + this.createSentence(dir_name))
						make_navlink(value[dir_name], level + "  ")
						return
					}

					var page = data[value] || {}

					if ( full_path === value )
						// If the page matches full_path then a bold text is created to identify it as the current page.
						navlist.push(level+"* **"+ (page.title||"/").replace(/\s+$/, "")+"**") 
					else 
						// Create an array with all of the links to all of the other pages except for the current page (value), sense there is no need to have
						// a link to the current page being viewed in the navlink.
						navlist.push(level+"* ["+(page.title||"")+"]("+
							// Make sure to add the url before the join so that the double slashes are not seen as superfluous.
							navlink_url + path.posix.join("/", (page.relative_dir||""), "/", (page.file_name||""))+")"
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



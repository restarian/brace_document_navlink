if (typeof define !== 'function') { var define = require('amdefine')(module) }

var path = require("path"),
	parse_url = require("url"),
	os = require("os")

var EOL = os.platform() === "win32" && "\r\n" || "\n"

define(["bracket_print", "bracket_utils"], function(print, utils) {
	
	var def = function(up, cb, err) {

		// This iterator returns an instanced link of the module regardless if the new keyword is used.
		var call_instance
		if ( !(this instanceof (call_instance = def) ) )
			return new (Array.prototype.slice.call(arguments).reduce(function(accumulator, value) {
				return accumulator = accumulator.bind(accumulator.prototype, value)
			}, call_instance))()
	
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

		up.log_title = up.log_title + "navlink"
		this.up_err = up.spawn({title: true, level: 2, title_stamp: false, title: up.log_title+" - ERROR:"})	

		cb = typeof cb === "function" && cb || function(){}
		err = typeof err === "function" && err || function(){}

		this._origin_url = ""

		this.parser = {}
		// These are used when a non-commander instance is used with the parser.
		this.option = {
			indentation: "  ",
			title: "Document pages",
			forceTitle: false,
			url: ""
		}

		cb.call(this)

	}
	
	def.prototype = { 

		findUrl: function(dir, cb, err) {
		// Create a url of the hosting server from the git repository which incorporates the current repository branch. This API member requires the
		// brace document instance to be set to it. Note: it relies on the relative_backup_dir and project_root properties from the brace_document instance.

			if ( typeof dir === "function" ) {
				err = cb
				cb = dir
				dir = this.parser.project_root
			}

			// Set the chaining logging titles to also have this member name. -------------------------------------
			var up = this.up.spawn(this.up.log_title + " - findUrl")
			var up_err = this.up_err.spawn(up.log_title + " - ERROR")
			cb = typeof cb === "function" && cb || function(){}
			// Create the error callback which will transfer the logger from this method into the calling method error callback.
			var err_cb = function() {
				if ( typeof err === "function" )
					err.apply(err.prototype, arguments)
			} // ----------------------------------------------------------------------------------------------------

			utils.Spawn("git", ["config", "--get", "remote.origin.url"], {cwd: dir}, (code, stdout, stderr) => { 

				if ( stderr || !stdout ) 
					return err_cb(up_err.log("The origin url for this project is not available and will not set.", stdout, stderr))
				
				this._origin_url = parse_url.parse(stdout)
				up.log("Using url", stdout)

				// The current branch is used so that the other branches commit separate docs.
				utils.Spawn("git", ["rev-parse", "--abbrev-ref", "HEAD"], {cwd: dir}, (code, stdout, stderr) => {

					if ( stderr || !stdout ) 
						return err_cb(up_err.log(stderr, "The branch name url for this project is not available and will not set.", stdout, stderr))

					this.branch = stdout.replace(/\s/g, "")
					up.log("Using repository branch", this.branch)

					// The url is constructed using the git repository information in the directory found above.
					this.origin_url = this.option.url || (this._origin_url.protocol + "//"+ this._origin_url.hostname + 
						path.posix.join(this._origin_url.path.replace(/\.git$/, ""), "/blob", "/", this.branch, "/", this.parser.relative_backup_dir||"") )

					cb(this.origin_url)

				}, err_cb)
			}, err_cb)
		},
		modifyData: function(structure, data, navlink_url, cb, err) {
		// This member will alter the data object to contain the navlink text generated in acquireNavlink member. All mutations keep object links to the 
		// data object so that the original data object is mutated. There is no way to get the original values in data object back so any changes made 
		// here need to be considered by other plugins which mutate the data object as well. Note: this member is not asynchronous so it returns 
		// the data object as well.

			// The navlink url parameter is optional.
			if ( typeof navlink_url === "function" ) {
				err = cb
				cb = navlink_url
				navlink_url = this.origin_url
			}
			// Set the chaining logging titles to also have this member name. -------------------------------------
			var up = this.up.spawn(this.up.log_title + " - modifiyData()")
			var up_err = this.up_err.spawn(up.log_title + " - ERROR")
			cb = typeof cb === "function" && cb || function(){}
			// Create the error callback which will transfer the logger from this method into the calling method error callback.
			var err_cb = function() {
				if ( typeof err === "function" )
					err.apply(err.prototype, arguments)
			} // --------------------------------------------------------------------------------------------------


			// A heading will be found by using this regex after any markdown horizontal line (see https://github.com/adam-p/markdown-here/
			// wiki/Markdown-Cheatsheet#lines) for more information on markdown syntax). The horizontal line must be blow a blank line (or else it 
			// will be used for to enhance the text above it instead of creating a horizontal line.
			var header_regex_text = "((?:\\r\\n|\\n)+[\\s,\\t,\\-,\\*,\\_]{3,}(?:\\r\\n|\\n)+)(#+[\\ ,\\t]+)([^(?:\n||\r\n)]+)(?:\\r\\n|\\n)"

			// Find a link underneath the navigation list denotation (horizontal line on top of a heading).
			var header_regex = RegExp(header_regex_text)
			var bullet_regex = RegExp(header_regex_text + "([\\ ,\\t]*[\\*,\\+,\\-]\\s+.*(?:\\r\\n|\\n)+)")
			// Use to loop through the data object.
			var data_keys = Object.keys(data)

			up.log("Modifing", data_keys.length, "data object document entries.")

			data_keys.forEach((location, index, proto) => {
				
				page = data[location]
				page.content = page.content || ""	

				// acquireNavlink is always synchronous.
				var nav_list = this.acquireNavlink(structure, location, navlink_url, null, err_cb)
				var navlink_denotation = page.content.match(header_regex)
				var found_bullet = !!navlink_denotation
				if ( Object.prototype.toString.call(navlink_denotation) !== "[object Array]" )
					navlink_denotation = []
					
				found = (navlink_denotation[1]||"").replace(/[\n,(?:\r\n),\t,\s]/g, "").length >= 3
				var nav_title = this.option.forceTitle && this.option.title || (navlink_denotation[3] || this.option.title)

				if ( !found ) {
					// The navigation heading is added to the page if the navlink denotation is needed to inject the navlinks text. This will not happen
					// the next time this script is run unless the navigation data is removed somehow otherwise.
					page.content = EOL + "---" + EOL + "### " + nav_title + EOL + nav_list.join(EOL) + EOL + page.content
					
					return
				}
				else
					while ( found ) {

						found = false
						// The loop is continued if another bullet is found under the navigation link heading. The loop will stop when all of the bullets 
						// that are directly under the navigation heading are removed from the contents string.
						page.content = page.content.replace(bullet_regex, function(entire_match, horizontal_rule, heading_identifier, heading_text, navlink_bullet){

							if ( navlink_bullet.replace(/[\t,\ ]/g, "").match(/^(?:\r\n|\n)/) )
								return entire_match

							// Set the loop to go again and return the first match to be matched again. This effectively removes all of the markdown bullets which 
							// are directly underneath the horizontal rule and heading. Note: blank lines are not matched and cause this loop to break.
							return found = true && (horizontal_rule + heading_identifier + heading_text + EOL) 

						}) 
					}

				var nav_markup = navlink_denotation[1] + navlink_denotation[2]
					
				page.content = page.content.replace(header_regex, nav_markup + nav_title + EOL + nav_list.join(EOL) + EOL)

			})

			cb(data)
			return data

		},
		sentenceConvert: function(str, cb) {
		// Turn a string into words by converting the non-letter characters into spaces and capitalizing the first letter of the first word.
			
			cb = typeof cb === "function" && cb || function(){}

			// Convert camel case into spaces
			str = (str||"").replace(/^[^a-z,A-Z]+/, "").replace(/([a-z]+)([A-Z])/g, "$1 $2").toLowerCase()
			// Turn everything which is not a letter into a space (including underscore which is matched by \w).
			.replace(/\r\n|\n/g, "").replace(/\t|\W+/g, " ").replace(/\_+/g, " ")

			// The first letter will be capitalized.
			str = str.charAt(0).toUpperCase() + str.substr(1)

			// All of the words should have the first letter capitalized.
			//.replace(/\w+/g, function(mat) { return mat.charAt(0).toUpperCase() + mat.substr(1) })

			cb(str)
			return str

		},
		acquireNavlink: function(structure, current_page, navlink_url, cb, err) {
		// This method is tasked with creating a navigation list for a single documentation page that represents the structure passed in. The 
		// current_path parameter is used to identify which document the navigation list is being generated for as a page will not contain a link 
		// to itself in the navigation list. The navlink_url is optional as it will be set to the origin_url which is created in the findUrl member.
		// Note: this member is not asynchronous so it returns the generated value as well.

			// The navlink url parameter is optional.
			if ( typeof navlink_url !== "string" ) {
				err = cb
				cb = navlink_url
				navlink_url = this.origin_url
			}

			// Set the chaining logging titles to also have this member name. -------------------------------------
			var up = this.up.spawn(this.up.log_title + " - acquireNavlink()")
			var up_err = this.up_err.spawn(up.log_title + " - ERROR")
			cb = typeof cb === "function" && cb || function(){}
			// Create the error callback which will transfer the logger from this method into the calling method error callback.
			var err_cb = function() {
				if ( typeof err === "function" )
					err.apply(err.prototype, arguments)
			} // --------------------------------------------------------------------------------------------------

			up.log("Generating navlink for", current_page)
			// This finds the pattern above and also finds a markdown style link immediately after it. The navigation links sub-heading title and the 
			// links are in separate regex matching groups.
			var navlist = []

			var parse_navlink = (structure, relative_dir) => {

				if ( Object.prototype.toString.call(structure) !== "[object Array]" )
					return

				// The indention level of the navigation entry
				var depth = relative_dir.length && relative_dir.split(/[\/,\\]/).length
				var indent_str = Array(depth).fill(String(this.option.indentation)).join("")

				structure.forEach(value => {

					if ( Object.prototype.toString.call(value) === "[object Object]" ) {

						// This happens when the link for the navlist is the same as the current document being viewed.
						var sub_directory = Object.keys(value).pop()
						if ( !sub_directory )
							return 
						// prepended and trailing path separators are removed (posix or win32).
						sub_directory = sub_directory.replace(/^[\/,\\]+|[\/,\\]+$/g, "")

						// It is important to use the unix path processor as the relative_dir will also be used to generate the url.
						var rel_dir = path.posix.join(relative_dir, sub_directory)

						// Instead of creating a link the list entry will be bold text to identify the current page.
						navlist.push(indent_str + "* " + this.sentenceConvert(sub_directory))
						parse_navlink(value[sub_directory], rel_dir)
						return
					}

					var location = path.parse(value)
					var page_title = this.sentenceConvert( location.name ) || "pending.."

					if ( current_page === value )
						// If the page matches full_path then a bold text is created to identify it as the current page.
						navlist.push(indent_str + "* **"+ page_title + "**") 
					else 
						// Create an array with all of the links to all of the other pages except for the current page (value), sense there is no need to have
						// a link to the current page being viewed in the navlink.
						navlist.push(indent_str + "* [" + page_title + "](" +
							// Make sure to add the url before the join so that the double slashes are not seen as superfluous.
							navlink_url + path.posix.join("/", relative_dir, location.base) + ")"
						)
				})
			}

			parse_navlink(structure, "")

			cb(navlist)
			return navlist
		},
	
	}

	return def
})



## How the plugin operates 

---
### Brace document navlink

#### The navigation links are inserted into markdown pages using a regular expression match.
The navigation link test will be injected at the very top of the page if a match is not found. The program looks for a markdown horizontal rule followed by a markdown heading.  

The regular expression uses by this plugin to locate a navigation list: ```/([\n,\r]+[\-,\*\_]{3,}[\n,\r]+#+[\ ,\t]+)([^\n,\r]+)[\n,\r]+/```
The regular expression uses by this plugin to locate a navigation list bullet: ```/(\s*[\*,\+,\-]\s+.*[\n,\r]+)/```


##### Below are some examples of what is matched as a navigation list when parsing the markdown files. 
*note the newline above horizontal rule which markdown syntax requires*

```markdown

--------
##### The title

```

```markdown

***
##### The title
This text remains
```

```markdown

***
# A BIG ONE
* This text is replaced
	* This text is replaced
	This text remains
```

```markdown

___
# Another title 
* This text is replaced

	* This text is not replaced because of the empty line above
```

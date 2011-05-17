<?php
	/** TIDEngine default paths define */
	$this->domain 				= '';						/** You can define domain or it will be defined by function */
	$this->root_cache  			= 'cache/';					/** Root cache directory path. . Default : 'cache/' */
	$this->pages_cache 			= 'pages/';					/** Pages cache directory name. Default : 'pages/' */
	$this->css_cache   			= 'css/';					/** Css cache directory name. Default :  'css/' */
	$this->js_cache    			= 'javascript/';			/** Javascript cache directory name. Default : 'javascript/' */
	$this->javascript_source		= 'javascript/native/';
	$this->frameworks_source		= 'javascript/frameworks/';
	$this->css_source 			= 'css/';

	/** TIDEngine Pages Caching settings */

	$this->cache_naming 			= 'md5';					/** md5|sha1|native  - Pages cache files naming. */
	$this->cache_name_pre 		= '(';						/** Cache name prefix */
	$this->cache_name_post 		= ')-';						/** Cache name sufix */
	$this->cache_extension 		= '.tpl.php';				/** Pages cache extension in use. Default : '.tpl.php' */
	$this->server_caching			= true;						/** true|false - Use Server Side Caching for pages. */

	$this->client_caching			= true;						/**
	* true|false - Use Client Caching.
	* If enabled on every page access script will check for
	* Client Cache existance and if Cache is current set 304 redirect
	* use Browser cached content
	*/

	$this->gzip 					= true;						/** true|false - Use gzip compression. Compress Server Side cached pages. */

	$this->compression_level  	= 4;						/**
	* 1-9 - gzip compression level:
	* fast: 1-4,
	* slower: 5-6 (but better compression),
	* slow:7-9 (up to 2x faster, best compression)
	* On files under 300K level 4 is good enought.
	*/

	$this->xhtml_code_operations	 = 'indent';				/**
	* compact|indent|false
	* compact - optimize XHTML code and remove whitespace complete XHTML in one line,
	* indent - set XHTML code indentation,
	*/

	$this->xhtml_code_indentation  = '   ';					/** Set default indentation space only. EG. '   '*/

	/**
	 *
	 * Set Cache Life Time in seconds EG. 60 seconds x 60 minutes x 24 hours = one day cache life time.
	 * You can set cache lifetime in miliseconds or as string 'permanent' means.
	 * @var array $cache_lifetime  EG. 1.minute 1.hour 1.day 1.month 1.year
	 * $this->cache_lifetime = array('page'=>'1.minute',
	 'css'=>'1.hour',
	 'javascript'=>'1.day',
	 'frameworks'=>'1.month');
	 *
	 * Other possibility is to set one lifetime for all cache files:
	 * $this->cache_lifetime = '1.month';
	 * or
	 * $this->cache_lifetime = 'permanent';
	 *
	 * array|permanent - Set cache lifetime in miliseconds
	 */
	$this->cache_lifetime  		=  array('page'=>'1.month',
									 		 'css'=>'6.month', 
									 		 'javascript'=>'6.month', 
									 		 'frameworks'=>'6.month'); 			
	/** TIDEngine CSS Caching settings */

	$this->optimize_css 			= true;						/** true|false - Use CSS optimization */
	$this->optimize_css_gz 		= true;						/** true|false - Compress CSS files*/
	$this->compact_css 			= true;						/** true|false - Combine all CSS files in one*/
	$this->css_file_name 			= 'master';					/** If we combine all CSS files combined CSS file name */

	/** TIDEngine Javascript Caching settings */

	$this->compact_javascript		= true;						/** true|false|all - Combine all javascript files in one*/
	$this->optimize_javascript	= true;						/** true|false - Use javascript optimization, some of build in javascript packers */
	$this->optimize_javascript_gz = true;						/** true|false - Compress javascript files*/
	$this->combine_all_javascript = false;

	$this->packer					= 'jsmin';					/**
	*	packer|jsmin|jshrink|jsminplus|native
	* Native is fastest way infact there are no compression at all.
	* But anyway this feature will be finished soon and implemented.
	* If you intend to use build in external packers I suggest you to use them just once
	* and set $cache_lifetime = 'permanent'; on live sites.
	* Compression  takes too many time and you have  high server load.
	*
	*/


	$this->javascript_filename	= 'javascript';				/** New combined javascript file name. */
	$this->framework_filename		= 'framework';				/** New combined Frameworks javascript file name. */
	$this->frameworks_type		= 'minified';  				/** minified|source - You have build in 3 types of most used Ajax Frameworks */

	$this->js_ext 				= '.js';					/** Jaascript extension default we can have .js.gz or js.gz.js*/
	$this->css_ext 				= '.css';					/** CSS extension default we can have .css.gz or .css.gz.css*/

	$this->shortcodes = array();								/** Shortcodes array defined for specific template */
	$this->data_changes_check;								/** Data send to TempEngine md5 for checking for changes */
	$this->modification_time;									/** Cache file modification time*/
	$this->template_id;										/**  Template file name/id */

	$this->configuration_file = 'TIDEngine/configuration/config.php';  							 /** If you leave empty this path, you must set settings when you init Class
	* If there are no defined settings default settings will be used.
	*/
	$this->meta_spec = array('Content-Language', 'Expires', 'Pragma', 'Cache-Control', 'imagetoolbar');
	$this->Browscap_cache;									 /** Possiblity to use Browscap native PHP get_browser() function */
	$this->debug_meta	= false;								/** Use Meta Tags Debugger */
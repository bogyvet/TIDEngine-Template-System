TIDEngine is PHP Based Template Engine/Sysytem  build for Content Management System with codename "TIDEngine".

As "TIDEngine" is still under heavy development by Site Info Service Development Team and will not be published for some time, TIDEngine Template System was born as separate component.
TIDEngine CMS

TIDEngine CMS is based on  MVC Model and Singleton Design Patern width key concepts

    * SEO and Performance Optimization
    * Friendly User Interface
    * Easy Plug-in and Modules System
    * Control over every Web Page Element
    * Easy Tempating

By default Friendly URLS's , posibility to manipulate with most important SEO parameters from Admin Panel. Cross Browser Optimization...

 

As most other Template Engines, TIDEngine Template System have one purpose to seperate code and layout. TIDEngine Template System take power of PHP for complete code processing, so there are no new syntax to learn. Also TIDEngine do not mix coding with design at all, means there are no loops, conditions...
That is PHP job to be done. There are also build in powerfull Caching Engine with Javascript , CSS Optimization, Combining and Compressing. This Caching Engine gives high speed to your Web Page, lower number of HTTP requests and gives quality experience to site visitor.

You just need to include reviously defined {SHORTCODE} in yours template files.

You can use this Template System as standalone component or to incorporate in your projects. Send data to Engine and Generate Web Page. More info you can find in other selections.

    * Configuration
    * Instructions
    * Well documented TIDEngine API

 

In further versions will be implemented PHP functions that predprocess all loops, conditions, array manipulations.

This is  Starter Version, so a lot of features that already exist are removed:

   1. SEO Optimization Adviser - will be included version 2.0.
   2. TIDEngine Template Engine Debugger
   3. CSS unused code cleaner
   4. Loops and condition functions.

Reason for that is that TIDEngine  isn't complete tested. Most features that exist in TIDEngine Starter Version are tested, but I can't be 100% sure that this version is bug free. In that matter you can submit any problem, bug in Problems-Bugs Page of this site as comment.

Also there are always place for improvement so for all suggestons, improvements, code changes can be submited in Suggestions Page or you can contact  contact developer on the Contact Page.

 
  TIDEngine MAIN ASPECTS:


TIDEngine Template System main aspect is Web Site and SEO Optimization. So complete development is based on main Web Site and SEO Optimization Rules. Means that TIDEngine Template System gets maximum points with Google Page Speed and  Yahoo YSlow.

With optimal configuration included Test Page Results:

   - 10 Javascript files in size of 300K, after processing gives 1 Javascript Cache File in size of 59K or 2    Javascript Cache Files in size of 60K.
    - 2 CSS files in size 7.5K, after processing gives 1 CSS Files in size of 2K.
   On Locahost Test Page gets :

    * Google Page Speed = 100 points
    * Yahoo YSlow = 98 points

   Final page size YSlow = 62.8K.
   Page load time:

    * First time load with minified Javascript files complete cache creation = 4.75 seconds,
    * Second time load without clearnig Browser Cache = 2.416 seconds,
    * Second time load with clearnig Browser Cache = 3.931 seconds.

 
  FEATURES:

   1. Optimize Javascript files with one of included Javascript packers:
          * Packer
          * JSmin
          * JShrink
          * JSminPlus
          * JSminPlus

      Use native Javascript and Framework minified version of files. If they do not exist TIDEngine create them.
      You should expet High Server load so please use it only once and set expire headers in far future, or them on local machine.
   2. Optimize CSS files with native TIDEngine CSS Files Optimizer not CSS Cleaner just removing whitespace and comments.
   3. Reduces the number of HTTP requests:
          * combinig all Javascript Files in one or two files (native Javascript and Framework).
          * combinig all CSS Files in one file.
   4. Reduces the size of the HTTP response by compressing all componets with gzip (Javacript, CSS and Template Files).
   5. Use Client Caching for all Page Components (Javacript, CSS and Template Files).
   6. Use Server Caching for all Optimized Page Components (Javacript, CSS and Template Files).
   7. Page cache versioning and on fly page data changes check. So if any there are any data changes on page new cache file will be created.
   8. Cache expiration check. If one of Cache Files expire new will be created, all other wil be in use untill they expires.
   9. XHTML Code Optimization. There are 2 possibilities. You can indent XHTML or remove all whitespace and put complete XHTML in one line.
  10. Browser detection TIDEngine and Browscap build in support for native get_browser() function.

 
  CONFIGURATION:

You can configure TIDEngine Template Engine in few different ways:

    * Inside TIDEngine Class change Default Settings.
    * Use Configuration File or
    * Use default TIDEngine Configuration Settings.

Complete Configuration and Settings Parameters you can find in more details on Configuration Page

 
  BROWSER COMPATIBILITY:

TIDEngine Browser Compatibility

TIDEngine was  tested with major browsers. All included features are Browser independent.

    * Firefox,
    * Internet Explorer 6+,
    * Chrome,
    * Opera and
    * Safari.

SAFARI FIX: implemented fix for bug Safari with .gz extension. Safari render just gzipped files with extension eg. js.gz.js or .css.gz.css.

 
  IMPLEMENTATION:

It is easy to implement in any PHP based site or System. As it is orginaly made for MCV Singleton based CMS System you can easily use it by extending parent class with TIDEngine Class.

Just include TIDEngine Template Engine file path, this is default path:

include('TIDEngine/core/TIDEngine.php');

 
  FURTHER VERSIONS FEATURES:

TIDEngine Template System  Version 2.0:

    * SEO Optimization Adviser.
    * TIDEngine Template Debugger.
    * CSS unused code cleaner.
    * Loops and condition functions...
    * Implement CSSTidy and some other.
    * Add YUI Compressor and Google Closure.
    * Finish Native TIDEngine Javascript Compressor code optimizer.
    * Client Caching improvements.
    * Server Caching CSS and Javascript versioning.
    * More XHTML Code optimization Libaries.
    * Meta data optimization for Mobile Devices.
    * CSS3 Support for Internet Explorer and Browsers that do not support CSS3 Standard.
    * Syntax Highlighter Support
    * Mobile Browsers Meta Data Support
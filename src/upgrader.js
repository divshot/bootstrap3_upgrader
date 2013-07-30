(function() {
  var RULESET = [
    {
      title: "Upgrade CSS/JS CDN Reference",
      description: "Inspect HTML for references to a recognized CDN version of Bootstrap and swapping it out for Bootstrap 3. Remove references to <code>bootstrap-responsive.css</code>.",
      run: function(doc) {
        var count = 0;
        
        // Replace Bootstrap CDN CSS with 3.0.0-rc1 version
        $(doc).find("link[rel=stylesheet][href]").each(function() {
          $link = $(this);
          var href = $link.attr('href')
          if ( href && href.match(new RegExp("//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.[0-2]/css/bootstrap-combined.(no-icons\.)?min.css")) ) {
            $link.attr("href","//netdna.bootstrapcdn.com/bootstrap/3.0.0-rc1/css/bootstrap.min.css");
            count++;
          }
        });
          
        // Replace Bootstrap CDN JS with 3.0.0-rc1 version
        $(doc).find("script[src]").each(function() {
          $script = $(this);
          var src = $script.attr('src')
          if ( src && src.match(new RegExp("//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.[0-2]/js/bootstrap.min.js")) ) {
            $script.attr("href","//netdna.bootstrapcdn.com/bootstrap/3.0.0-rc1/js/bootstrap.min.js");
            count++;
          }
        });
        
        return (count > 0) ? count + " Replaced" : false;
      }
    },
    
    {
      title: "Upgrade Grid System",
      description: "Look for <code>spanX</code> non-form containers and replace with <code>col-lg-X col-sm-X</code> (leaving mobile to collapse into a single column). Change <code>row-fluid</code> to <code>row</code> since they are now the same. Remove <code>container-fluid</code> since it is now a noop.",
      run: function(doc) {
        var count = 0;
        
        for (var i = 1; i <= 12; i++) {
          var sI = i.toString();
          $(doc).find(".span" + sI).each(function() {
            $this = $(this);
            // Make sure we're dealing with a container, not a form element
            if ( $this.is("section, div, aside, article") ) {
              $this.removeClass("span" + sI).addClass("col-sm-" + sI + " col-lg-" + sI);
              count += $this.length;
            }
          });
        }
        
        // Remove .row-fluid and replace with .row since they are equivalent now
        $fluidRows = $(doc).find(".row-fluid")
        if ($fluidRows.length > 0) {
          count += $fluidRows.length;
          $fluidRows.removeClass('row-fluid').addClass('row');
        }
        
        // Remove .container-fluid since it doesn't do anything
        $fluidContainers = $(doc).find(".container-fluid")
        if ($fluidContainers.length > 0) {
          count += $fluidContainers.length;
          $fluidRows.removeClass('container-fluid');
        }
        
        return (count > 0) ? count + " Replaced" : false;
      }
    },
    
    {
      title: "Fix Button Color Classes",
      description: "Add <code>btn-default</code> to <code>btn</code> elements with no other color. Replace <code>btn-inverse</code> with <code>btn-default</code> since inverse has been removed from Bootstrap 3.",
      run: function(doc) {
        var $buttons = $(doc).find(".btn:not(.btn-primary,.btn-success,.btn-info,.btn-warning,.btn-danger)");
        var count = $buttons.length;
        
        // Remove btn-inverse, add btn-default if no existing color class is matched
        $buttons.removeClass('btn-inverse').addClass('btn-default');
        
        return (count > 0) ? count + " Replaced" : false;
      }
    },
    
    {
      title: "Remove Dividers from Breadcrumbs",
      description: "Bootstrap 3 uses CSS to add the dividers between breadcrumbs. Remove all <code>span.divider</code> elements inside breadcrumbs.",
      run: function(doc) {
        $dividers = $(doc).find(".breadcrumb .divider")
        var count = $dividers.length;
        
        $dividers.remove();
        return (count > 0) ? count + " Replaced" : false;
      }
    },
    
    {
      title: "Replace 'mini' sizes with 'small'",
      description: "The 'mini' sizes on buttons and pagination have been removed. Switch <code>btn-mini</code> and <code>pagination-mini</code> for their <code>-small</code> versions instead.",
      run: function(doc) {
        
      }
    }
  ];
  
  var Upgrader = {
    rules: RULESET,
    perform: function(input, report) {
      var doc = (new DOMParser()).parseFromString(input, 'text/html');
      var results = [];
      for (var i = 0; i < Upgrader.rules.length; i++) {
        var rule = Upgrader.rules[i];
        results.push(rule.run(doc));
      }
      
      var output = "<!doctype html>\n" + doc.getElementsByTagName("html")[0].outerHTML;
      
      if (report) {
        return {
          output: output,
          results: results
        }
      } else {
        return output;
      }
    }
  }
  
  window.BootstrapUpgrader = Upgrader;
})()
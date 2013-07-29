(function() {
  var RULESET = [
    {
      title: "Upgrade CSS/JS CDN Reference",
      description: "Inspect HTML for references to a recognized CDN version of Bootstrap and swapping it out for Bootstrap 3. Remove references to <code>bootstrap-responsive.css</code>."
    },
    
    {
      title: "Upgrade Grid System",
      description: "Look for <code>spanX</code> non-form containers and replace with <code>col-lg-X col-sm-X</code> (leaving mobile to collapse into a single column). Change <code>row-fluid</code> to <code>row</code> since they are now the same. Remove <code>container-fluid</code> since it is now a noop."
    },
    
    {
      title: "Fix Button Color Classes",
      description: "Add <code>btn-default</code> to <code>btn</code> elements with no other color. Replace <code>btn-inverse</code> with <code>btn-default</code> since inverse has been removed from Bootstrap 3."
    },
    
    {
      title: "Remove Dividers from Breadcrumbs",
      description: "Bootstrap 3 uses CSS to add the dividers between breadcrumbs. Remove all <code>span.divider</code> elements inside breadcrumbs."
    },
    
    {
      title: "Replace 'mini' sizes with 'small'",
      description: "The 'mini' sizes on buttons and pagination have been removed. Switch <code>btn-mini</code> and <code>pagination-mini</code> for their <code>-small</code> versions instead."
    }
  ];
  
  var BootstrapUpgrader = {
    rules: RULESET
  }
  
  window.BootstrapUpgrader = BootstrapUpgrader;
})()
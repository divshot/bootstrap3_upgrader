function ConverterCtrl($scope) {
  $scope.rules = angular.copy(BootstrapUpgrader.rules);
  $scope.source = '<!doctype html>\n<html>\n  <head>\n    <title>Example</title>\n    <link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/css/bootstrap-combined.min.css" rel="stylesheet">\n  </head>\n  <body>\n    <!-- Bootstrap 2 Code Here -->\n  </body>\n</html>';
  $scope.result = "";
  
  $scope.runRules = function() {
    var report = BootstrapUpgrader.perform($scope.source, true);
    $scope.result = report.output;
    for (var i = 0; i < report.results.length; i++) {
      $scope.rules[i].runMessage = report.results[i] || "No Changes";
    }
    $scope.hasRun = true;
  }
}
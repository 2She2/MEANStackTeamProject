app.directive('validNumber', function() {
    return function(scope, element, attrs) {

        var keyCode = [8,9,46,48,49,50,51,52,53,54,55,56,57,190];
        element.bind("keydown", function(event) {
            console.log(event.which,keyCode);
            console.log($.inArray(event.which,keyCode));
            if($.inArray(event.which,keyCode) == -1) {
                scope.$apply(function(){
                    scope.$eval(attrs.onlyNum);
                    event.preventDefault();
                });
                event.preventDefault();
            }

        });
    };
});
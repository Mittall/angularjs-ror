//textbox autofocus
AngularAppDirectives.directive('autoFocus', function() {
  return function(scope, element) {
    return element.focus();
  };
});

//For hidding the flash message
AngularAppDirectives.directive('hideFlashMessage', function() {
  return function(scope, element) {
    return element.click(function() {
      scope.flash_message = null;
      return scope.$digest();
    });
  };
});

//Directive which load the popup message at the time of delete
AngularAppDirectives.directive('ngConfirmClick', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attr) {
      var clickAction, msg;
      msg = attr.ngConfirmClick || "Are you sure?";
      clickAction = attr.confirmedClick;
      element.bind("click", function(event) {
        if (window.confirm(msg)) {
          scope.$eval(clickAction);
        }
      });
    }
  };
});

//Directive which display the date calender
AngularAppDirectives.directive('datepicker', function(){
  return {
    restrict: 'A',
    link: function ($scope, $element) {
      $element.datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        todayHighlight: true
      });
    }
  };
});

//Directive display the pagination
AngularAppDirectives.directive('paginator', function() {
  return {
    restrict:'E',
    controller: function ($scope, Paginator) {
        $scope.paginator = Paginator;
    },
    templateUrl: 'index.html'
  };
});

//Directive use for the google map place autocomplete text
AngularAppDirectives.directive('googleplace', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, model) {
      var options = {
        types: [],
        componentRestrictions: {}
      };
      scope.gPlace = new google.maps.places.Autocomplete(element[0], options);
 
      google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
        scope.$apply(function() {
          model.$setViewValue(element.val());
        });
      });
    }
  };
});

//Directive use for showing modal popoup
AngularAppDirectives.directive("openDialog", function() {
  var openDialog;
  ({
    restrict: "A"
  });
  openDialog = {
    link: function(scope, element, attrs) {
      openDialog = function() {
        element = $(attrs.modalName);
        element.modal("show");
        return element.on("keyup.dismiss.bs.modal", $.proxy(function(e) {
          if (e.isDefaultPrevented()) {
            return;
          }
          if (e.which === 27) {
            scope.$apply("cancel()");
            element.modal("hide");
          }
        }, this));
      };
      element.bind("click", openDialog);
    }
  };
  return openDialog;
});

/*AngularAppAnimations.directive("hideMe", function($animate) {
    return function(scope, element, attrs) {
        scope.$watch(attrs.hideMe, function(newVal) {
            if (newVal) {
                $animate.addClass(element, "fade")
            } else {
                $animate.removeClass(element, "fade")
            }
        })
    }
});*/

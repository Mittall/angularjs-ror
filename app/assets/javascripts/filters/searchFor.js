//Search product by their name
AngularAppFilter.filter('searchFor', function(){
	return function(arr, searchString){
		if(!searchString){
			return arr;
		}
		var result = [];
		searchString1 = searchString.toLowerCase();
		angular.forEach(arr, function(product){
			if(product.pname.toLowerCase().indexOf(searchString1) !== -1 || product.price >= searchString){
				result.push(product); 
			}
		});
		return result;
	};
});

//Count the unique collection
AngularAppFilter.filter('count', function() {
  return function(collection, key) {
    var out = "test";
    for (var i = 0; i < collection.length; i++) {
        //console.log(collection[i].pants);
        //var out = AngularAppFilter.filter('filter')(collection[i].price, "42", true);
    }
    return out;
  }
});

//***
AngularAppFilter.filter('groupBy', function () {
  return function (collection, key) {
    if (collection === null) return;
      return uniquePrices(collection, key);
  };
});

//display the paginaton
AngularAppFilter.filter('pagination', function() {
  var input = 0;
  return function(input, start) {
    start = +start;
    return input.slice(start);
  };
});


//display the pagination in bootstrap style
AngularAppFilter.filter('paginate', function(Paginator) {
  return function(input, rowsPerPage) {
    if (!input) {
      return input;
    }
    if (rowsPerPage) {
      Paginator.rowsPerPage = rowsPerPage;
    }
    Paginator.itemCount = input.length;
    return input.slice(parseInt(Paginator.page * Paginator.rowsPerPage), parseInt((Paginator.page + 1) * Paginator.rowsPerPage + 1) - 1);
  };
});

//Loop to display the number of page links
AngularAppFilter.filter('forLoop', function() {
  return function(input, start, end) {
    input = new Array(end - start);
    for (var i = 0; start < end; start++, i++) {
      input[i] = start;
    }
    return input;
  };
});

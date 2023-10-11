app.directive('colist', function(){
    return{
        restrict : 'E',
        scope: {
            mylist:'='
        },
        templateUrl: 'js/directives/colist.html'
    }
})

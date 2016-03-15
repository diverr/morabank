angular.module('morabanc')
.service('Helper', helperService);

function helperService() {
    return {
        transformDate: function(date) {
            date = date.split("/").join("-");
            var ary = date.split('-');
            return ary[1] + '-' + ary[0] + '-' + ary[2];
        }
    };
}
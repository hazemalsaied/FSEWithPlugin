angular.module('fseControllers', ['fseServices', 'ngCordova'])

.controller('AppCtrl', function ($scope, apiService) {

        apiService.getCats($scope);
    })
    .controller('postsCtrl', function ($scope, apiService) {

        $scope.pageNum = 1;
        apiService.getPosts($scope, $scope.pageNum);

        $scope.noMoreItemsAvailable = false;

        $scope.loadMore = function () {

            if ($scope.pageNum <= $scope.totalPageNum) {
                $scope.pageNum = $scope.pageNum + 1;
                apiService.getPosts($scope, $scope.pageNum);
            }

            if ($scope.pageNum == $scope.totalPageNum) {
                $scope.noMoreItemsAvailable = true;
            }
            $scope.$broadcast('scroll.infiniteScrollComplete');
        };
    })

.controller('catPostsCtrl', function ($scope, $stateParams, apiService) {

    $scope.pageNum = 1;
    apiService.getCatPosts($scope, $stateParams, $scope.pageNum);

    $scope.loadMore = function () {

        if ($scope.pageNum <= $scope.totalPageNum) {
            $scope.pageNum = $scope.pageNum + 1;
            apiService.getCatPosts($scope, $stateParams, $scope.pageNum);
        }

        if ($scope.pageNum == $scope.totlaPageNum) {
            $scope.noMoreItemsAvailable = true;
        }

        $scope.$broadcast('scroll.infiniteScrollComplete');
    };

})

.controller('tagPostsCtrl', function ($scope, $stateParams, apiService) {

    apiService.getTagPosts($scope, $stateParams);
    $scope.pageNum = 1;
    apiService.getTagPosts($scope, $stateParams, $scope.pageNum);

    $scope.loadMore = function () {

        if ($scope.pageNum <= $scope.totalPageNum) {
            $scope.pageNum = $scope.pageNum + 1;
            apiService.getTagPosts($scope, $stateParams, $scope.pageNum);
        }

        if ($scope.pageNum == $scope.totlaPageNum) {
            $scope.noMoreItemsAvailable = true;
        }

        $scope.$broadcast('scroll.infiniteScrollComplete');
    };

})

.controller('postCtrl', function ($scope, $stateParams, apiService, SITE_NAME, $cordovaSocialSharing) {

    $scope.shareAnywhere = function (message, subject, image, link) {
        window.plugins.socialsharing.share(message, subject, image, link);
    }

    $scope.pageTitle = SITE_NAME.name;
    apiService.getPost($scope, $stateParams);

})

.controller('contactCtrl', function ($scope, SITE_NAME, CONTACT_MAIL, $cordovaEmailComposer) {

    $scope.pageTitle = SITE_NAME.name;

    $scope.submit = function (username, email, msg) {

        cordova.plugins.email.isAvailable().then(function() {
          
            var email = {
            to: CONTACT_MAIL.mail,
            subject: 'رسالة من :' + username + '  '+ email ,
            body: msg,
            isHtml: true
            };

            cordova.plugins.email.open(email).then(null, function () {
                // user cancelled email
            });
            
        }, function () {
            // not available
        });
        

    };


});
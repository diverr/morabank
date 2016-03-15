function config($stateProvider, $urlRouterProvider, IdleProvider, KeepaliveProvider) {

    // Configure Idle settings
    IdleProvider.idle(5); // in seconds
    IdleProvider.timeout(120); // in seconds

    $urlRouterProvider.otherwise("/app/desktop");

    $stateProvider
        
        .state('app', {
            abstract: true,
            url: "/app",
            templateUrl: "views/common/content.html",
        })
        .state('app.desktop', {
            url: "/desktop",
            templateUrl: "views/desktop.html",
            data: { pageTitle: 'Escritorio' }
        })
        .state('app.calendar', {
            url: "/calendar",
            templateUrl: "views/calendar.html",
            data: { pageTitle: 'Calendario de Citas' }
        })

        .state('chats', {
            abstract: true,
            url: "/chats",
            templateUrl: "views/common/content.html",
        })
        .state('chats.index', {
            url: "/index",
            templateUrl: "views/chats.html",
            data: { pageTitle: 'Conversaciones' }
        })
        .state('chats.view', {
            url: "/view/:id",
            templateUrl: "views/chat_view.html",
            data: { pageTitle: 'Conversaciones' }
        })
        .state('chats.archive', {
            url: "/archive/:id",
            templateUrl: "views/chat_archive.html",
            data: { pageTitle: 'Citas' }
        })

        .state('meetings', {
            abstract: true,
            url: "/meetings",
            templateUrl: "views/common/content.html",
        })
        .state('meetings.index', {
            url: "/index",
            templateUrl: "views/meetings.html",
            data: { pageTitle: 'Citas' }
        })
        .state('meetings.new', {
            url: "/new",
            templateUrl: "views/meetings_new.html",
            data: { pageTitle: 'Citas' }
        })
        .state('meetings.edit', {
            url: "/edit/:id",
            templateUrl: "views/meetings_edit.html",
            data: { pageTitle: 'Citas' }
        })
        .state('meetings.search', {
            url: "/search",
            templateUrl: "views/meetings_search.html",
            data: { pageTitle: 'Citas' }
        })
        .state('meetings.archive', {
            url: "/archive/:id",
            templateUrl: "views/meetings_archive.html",
            data: { pageTitle: 'Citas' }
        })

        .state('login', {
            url: "/login",
            templateUrl: "views/login.html",
            data: { pageTitle: 'Login', specialClass: 'gray-bg' }
        })
        .state('forgot_password', {
            url: "/forgot_password",
            templateUrl: "views/forgot_password.html",
            data: { pageTitle: 'Forgot password', specialClass: 'gray-bg' }
        })

}
angular
    .module('morabanc')
    .config(config)
    .run(function($rootScope, $state) {
        $rootScope.$state = $state;
    });

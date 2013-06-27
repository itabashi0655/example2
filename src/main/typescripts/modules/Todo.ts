///<reference path='../libs/DefinitelyTyped/angularjs/angular.d.ts' />
///<reference path='../controllers/todo/TodoController.ts' />
///<reference path='../services/todo/TodoService.ts' />

module Modules.Todo{
    angular.module('example2.todo', ['ui.calendar'],
        ($routeProvider: ng.IRouteProvider, $locationProvider: ng.ILocationProvider) => {
            /*
                // ルーティングの設定を行います。(１モジュールを複数ページで使うときに使用する？）
                $routeProvider
                    .when("/sample", {
                        templateUrl: "/template/sample.html"
                    })
                    .otherwise({
                        templateUrl: "/template/main.html"
                    });
                // hashの書き換えの代わりにHTML5のHistory API関係を使うモードを設定する。
                $locationProvider.html5Mode(true);
            */
        })
    // コントローラの登録
    /*
    public $scope: Controller.Todo.IScope,
    private $window: ng.IWindowService,
    private $http: ng.IHttpService,
    private todoService: Service.Todo.TodoService
     */
    //        .controller('TodoController', ($scope: Controller.Todo.IScope, $window: ng.IWindowService, $http: ng.IHttpService, todoService: Service.Todo.TodoService) => {
    //            console.log('create todo controller!!')
    //            return new Controller.Todo.TodoController($scope, $window, $http, todoService);
    //        })
        .controller('TodoController', Controller.Todo.TodoController)
    // サービスの登録
        .factory('todoService' , ($http: ng.IHttpService): Service.Todo.TodoService=>{
			return new Service.Todo.TodoService($http);
        })
    // モジュールの登録
        .run(($rootScope: ng.IRootScopeService, $routeParams: ng.IRouteParamsService) => {
            //Run
        })
}
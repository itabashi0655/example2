///<reference path='../libs/DefinitelyTyped/angularjs/angular.d.ts' />
///<reference path='../controllers/todo/TodoController.ts' />
///<reference path='../services/todo/TodoService.ts' />

module Modules.Todo{
    angular.module('example2.todo', ['ui.calendar'],
        ($routeProvider: ng.IRouteProvider, $locationProvider: ng.ILocationProvider) => {
            /*
                // ���[�e�B���O�̐ݒ���s���܂��B(�P���W���[���𕡐��y�[�W�Ŏg���Ƃ��Ɏg�p����H�j
                $routeProvider
                    .when("/sample", {
                        templateUrl: "/template/sample.html"
                    })
                    .otherwise({
                        templateUrl: "/template/main.html"
                    });
                // hash�̏��������̑����HTML5��History API�֌W���g�����[�h��ݒ肷��B
                $locationProvider.html5Mode(true);
            */
        })
    // �R���g���[���̓o�^
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
    // �T�[�r�X�̓o�^
        .factory('todoService' , ($http: ng.IHttpService): Service.Todo.TodoService=>{
			return new Service.Todo.TodoService($http);
        })
    // ���W���[���̓o�^
        .run(($rootScope: ng.IRootScopeService, $routeParams: ng.IRouteParamsService) => {
            //Run
        })
}
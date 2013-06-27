///<reference path='libs/DefinitelyTyped/jasmine/jasmine.d.ts' />
///<reference path='libs/DefinitelyTyped/sinon/sinon.d.ts' />
///<reference path='libs/DefinitelyTyped/angularjs/angular-mocks.d.ts' />

///<reference path='../../main/typescripts/modules/Todo.ts' />
///<reference path='../../main/typescripts/models/todo/Todo.ts' />
///<reference path='../../main/typescripts/services/todo/TodoService.ts' />

describe("Controllerの", () => {

    var $injector: ng.auto.IInjectorService;

    beforeEach(() => {
        $injector = angular.injector(['ngMock', 'example2.todo']);
    });

    describe("Todo.Controllerの", () => {

        var $scope: Controller.Todo.IScope;
        var $controller: ng.IControllerService;
        var $http: ng.IHttpService;
        var $httpBackend: ng.IHttpBackendService;
        var $window: ng.IWindowService;
        var service: Service.Todo.TodoService;

        beforeEach(() => {
            $httpBackend = $injector.get("$httpBackend");
            $controller = $injector.get("$controller");
            $scope = <any>$injector.get("$rootScope").$new();
            $http = $injector.get("$http");

            ////////////////////////////////////////////////////////////
            // service create start.
            ////////////////////////////////////////////////////////////
            service = new Service.Todo.TodoService($http);
            ////////////////////////////////////////////////////////////
            // service create end.
            ////////////////////////////////////////////////////////////
        });

        //////////////////////////////////////////////////////////////////////
        // postメソッドのテスト
        //////////////////////////////////////////////////////////////////////
        it('TodoServiceのpostメソッド', () => {

            //            var spy: SinonSpy = sinon.spy($http, 'post');
            var spy: SinonSpy = sinon.spy(service, '$http');

            var promise: ng.IHttpPromise;
            
            // リクエストの設定と、対象メソッドのコールを行います。
            runs(() => {
                $httpBackend.expect('POST', 'api/todo/post', 'content=newcontent',
                    (headers: any): boolean => {
                        return headers['Content-Type'] === 'application/x-www-form-urlencoded';
                    })
                    .respond(201);
                
                promise = service.post(new Model.Todo({
                    id: 0,
                    content: 'newcontent',
                    createdBy: 'loginuser',
                    createdAt: 0
                }));

                $httpBackend.flush();
            });

            // 対象メソッドが終了するまで待機します。
            waitsFor((): boolean => {
                return (promise != null);
            }, '時既に時間切れ', 5000);

            // 対象メソッドの実行結果をテストします。
            runs(() => {
                // 1) POST送信が行われること
                expect(spy)
                    .toHaveBeenCalled();
                spy.restore();
            });
        });
        //////////////////////////////////////////////////////////////////////
        // deleteメソッドのテスト
        //////////////////////////////////////////////////////////////////////
        it('TodoServiceのdeleteメソッド', () => {

//            var spy: SinonSpy = sinon.spy($http, 'post');
            var spy: SinonSpy = sinon.spy(service,'$http');
            var promise: ng.IHttpPromise;

            // deleteメソッドの実行
            runs(() => {
                $httpBackend.expect('POST', 'api/todo/delete', 'id=0',
                    (headers: any): boolean=> {
                        return headers['Content-Type'] === 'application/x-www-form-urlencoded';
                    })
                    .respond(201);

                promise = service.delete(0);
                $httpBackend.flush();
            });

            waitsFor((): boolean => {
                return (promise != null);
            }, '時既に時間切れ', 5000);

            runs(() => {
                // 1) POST送信が行われること
                expect(spy)
                    .toHaveBeenCalled();
                spy.restore();
            });
        });

        //////////////////////////////////////////////////////////////////////
        // getListメソッドのテスト
        //////////////////////////////////////////////////////////////////////
        it('TodoServiceのgetListメソッド', () => {

            var promise: ng.IHttpPromise;

            var spy: SinonSpy = sinon.spy(service, '$http');
            var spy2: SinonSpy;
            var response: boolean = false;
            var todos: any;

            runs(() => {
                $httpBackend.expect('GET', 'api/todo/list')
                    .respond(200, [
                        { "id": 1, "content": "test-a", "createdBy": "ccc", "createdAt": 10000 },
                        { "id": 2, "content": "test-b", "createdBy": "ddd", "createdAt": 10100 },
                        { "id": 3, "content": "test-c", "createdBy": "eee", "createdAt": 10200 },
                        { "id": 4, "content": "test-d", "createdBy": "fff", "createdAt": 10300 },
                        { "id": 5, "content": "test-e", "createdBy": "ggg", "createdAt": 10400 }
                    ]);
                promise = service.getList();
                spy2 = sinon.spy(promise, 'success');

                promise
                    .success((data: Model.Todo[]): void => {
                        response = true;
                        todos = data;
                    })
                    .error((data: any): void=> { response = true; })
                    .then((response: any): void => { response = true; });
                $httpBackend.flush();
            });

            waitsFor((): boolean => {
                return response;
            }, '時既に時間切れ', 5000);

            // サーバに追加されたTODO情報を送信すること
            runs(() => {
                expect(spy)
                    .toHaveBeenCalled();
                expect(spy2)
                    .toHaveBeenCalled();
                expect(Array.isArray(todos))
                    .toBeTruthy();
                expect(todos.length)
                    .toBe(5);
                expect(todos[0].content)
                    .toBe('test-a');

                spy.restore();
                spy2.restore();
            });
        });
    });
})
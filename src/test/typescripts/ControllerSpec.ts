///<reference path='libs/DefinitelyTyped/jasmine/jasmine.d.ts' />
///<reference path='libs/DefinitelyTyped/sinon/sinon.d.ts' />
///<reference path='libs/DefinitelyTyped/angularjs/angular-mocks.d.ts' />

///<reference path='../../main/typescripts/modules/Todo.ts' />
///<reference path='../../main/typescripts/models/todo/Todo.ts' />
///<reference path='../../main/typescripts/controllers/todo/TodoController.ts' />
///<reference path='../../main/typescripts/services/todo/TodoService.ts' />

describe("Controllerの", () => {

    var $injector: ng.auto.IInjectorService;

    beforeEach(() => {
        $injector = angular.injector(['ngMock', 'example2.todo']);
    });

    describe("Controller.Todo.TodoControllerのテスト", () => {

        var $scope: Controller.Todo.IScope;
        var $controller: ng.IControllerService;
        var $http: ng.IHttpService;
        var $httpBackend: ng.IHttpBackendService;
        var $window: ng.IWindowService;
        var service: Service.Todo.TodoService;
        var controller: Controller.Todo.TodoController;

        beforeEach(() => {
            $httpBackend = $injector.get("$httpBackend");
            $controller = $injector.get("$controller");
            $scope = <any>$injector.get("$rootScope").$new();
            $http = $injector.get("$http");

            ////////////////////////////////////////////////////////////
            // controller create start.
            ////////////////////////////////////////////////////////////
            service
                = new Service.Todo.TodoService($http);

            // コントローラの作成（コンストラクタ内でrefreshがコールされる）
            $httpBackend.expect('GET', 'api/todo/list')
                .respond(200, [
                    { "id": 1, "content": "test-a", "createdBy": "ccc", "createdAt": 10000 },
                    { "id": 2, "content": "test-b", "createdBy": "ddd", "createdAt": 10100 }
                ]);

            controller
                = $controller(Controller.Todo.TodoController, {
                    $scope: $scope,
                    $window: $window,
                    todoService: service
            });

            $httpBackend.flush();
            ////////////////////////////////////////////////////////////
            // controller create end.
            ////////////////////////////////////////////////////////////
        });

        //////////////////////////////////////////////////////////////////////////
        // コントローラの生成
        //////////////////////////////////////////////////////////////////////////
        it('コンストラクタの動作テスト', () => {

            // 1) サーバから取得したTODOリストが作成されること
            expect(controller.todos.length)
                .toBe(2);
        });

        //////////////////////////////////////////////////////////////////////////
        // $scopeの初期化
        //////////////////////////////////////////////////////////////////////////
        it('コンストラクタの動作テスト', () => {

            // TODOリストが正しく設定されていること
            expect($scope.todos.length)
                .toBe(2);
            // 新規TODOが正しく設定されていること
            expect($scope.newTodo)
                .not.toBe(null);
            // 新規TODOの内容がクリアされていること
            expect($scope.newTodo.content)
                .toBe('');

            expect($scope.newTodo.id)
                .toBe(0);
            expect($scope.newTodo.createdBy)
                .toBe('');
            expect($scope.newTodo.createdAt)
                .toBe(0);
// コールバック設定のやり方はどうするのか？
//            expect($scope.onAdd)
//                .toEqual(controller.onAdd);
//            expect($scope.onRemove)
//                .toBe(controller.onRemove);
        });
        //////////////////////////////////////////////////////////////////////////
        // refreshメソッドの動作テスト（正常系）
        //////////////////////////////////////////////////////////////////////////
        it('refreshメソッドの動作テスト（正常系）', () => {

            // リクエストの設定と、対象メソッドのコールを行います。
            runs(() => {
                $httpBackend.expect('GET', 'api/todo/list')
                    .respond(200, [
                        { "id": 1, "content": "test-a", "createdBy": "ccc", "createdAt": 10000 },
                        { "id": 2, "content": "test-b", "createdBy": "ddd", "createdAt": 10100 },
                        { "id": 3, "content": "test-c", "createdBy": "eee", "createdAt": 10200 }
                    ]);
                controller.refresh();
                $httpBackend.flush();
            });

            // 対象メソッドの終了を待機します。
            waitsFor((): boolean => {
                return !controller.isProcessing;
            }, 'timedout', 3000);

            // 対象メソッドの実行結果をテストします。
            runs(() => {
                // コントローラのTODOリストの値が正しく取得できていること
                expect(controller.todos.length)
                    .toBe(3);
                // コントローラのエラーコードがクリアされていること
                expect(controller.errorInfo.code)
                    .toBe(0);
                // コントローラのエラーメッセージがクリアされていること
                expect(controller.errorInfo.message)
                    .toBe('');
                // スコープのTODOリストの値が正しく取得できていること
                expect($scope.todos.length)
                    .toBe(3);
                // スコープのエラーコードがクリアされていること
                expect($scope.errorInfo.code)
                    .toBe(0);
                // スコープのエラーメッセージがクリアされていること
                expect($scope.errorInfo.message)
                    .toBe('');
            });
        });

        //////////////////////////////////////////////////////////////////////////
        // refreshメソッドの動作テスト（タイムアウト）
        //////////////////////////////////////////////////////////////////////////
        // タイムアウト系のテスト方法が不明・・・
/*
        it('TodoControllerのrefreshメソッド（準正常系）', () => {

            runs(() => {
                $httpBackend.expect('GET', 'api/todo/list')
                    .respond(500);

                controller.refresh();

                $httpBackend.flush();
            });

            waitsFor((): boolean => {
                return !controller.isProcessing;
            }, 'timedout', 3000);

            // 1) todosの内容がもとのままになっていること
            runs(() => {
                expect(controller.todos.length)
                    .toBe(2);
                expect(controller.errorInfo.code)
                    .toBe(30001);
                expect(controller.errorInfo.message)
                    .toBe('タイムアウトしました。');
                expect($scope.todos.length)
                    .toBe(2);
                expect($scope.errorInfo.code)
                    .toBe(30001);
                expect($scope.errorInfo.message)
                    .toBe('タイムアウトしました。');
            });

        });
*/
        //////////////////////////////////////////////////////////////////////////
        // refreshメソッドの動作テスト（異常系）
        //////////////////////////////////////////////////////////////////////////
        it('refreshメソッドの動作テスト（異常系）', () => {

            var oldLen: number = controller.todos.length;

            // リクエストの設定と、対象メソッドのコールを行います。
            runs(() => {
                $httpBackend.expect('GET', 'api/todo/list')
                    .respond(500);
                controller.refresh();
                $httpBackend.flush();
            });

            // 対象メソッドの終了を待機します。
            waitsFor((): boolean => {
                return !controller.isProcessing;
            }, 'timedout', 3000);

            // 対象メソッドの実行結果をテストします。
            runs(() => {
                // コントローラのTODOリストの長さがメソッドの実行前と同じであること
                expect(controller.todos.length)
                    .toBe(oldLen);
                // コントローラのエラーコードに正しい値が設定されていること
                expect(controller.errorInfo.code)
                    .toBe(30000);
                // コントローラのエラーメッセージに正しい値が設定されていること
                expect(controller.errorInfo.message)
                    .toBe('情報の更新に失敗しました。');
                // スコープのTODOリストの長さがメソッドの実行前と同じであること
                expect($scope.todos.length)
                    .toBe(oldLen);
                // スコープのエラーコードに正しい値が設定されていること
                expect($scope.errorInfo.code)
                    .toBe(30000);
                // スコープのエラーメッセージに正しい値が設定されていること
                expect($scope.errorInfo.message)
                    .toBe('情報の更新に失敗しました。');
            });
        });

        //////////////////////////////////////////////////////////////////////////
        // onAddメソッドの動作テスト
        //////////////////////////////////////////////////////////////////////////
        it('onAddメソッドの動作テスト（正常系）', () => {

            //var spy: jasmine.Spy= spyOn(service, 'post');
            var spy: SinonSpy = sinon.spy(service, 'post');

            // リクエストの設定と、対象メソッドのコールを行います。
            runs(() => {
                $httpBackend.expect('POST', 'api/todo/post')
                    .respond(201);

                $httpBackend.expect('GET', 'api/todo/list')
                    .respond(200, [
                        { "id": 1, "content": "test-a", "createdBy": "ccc", "createdAt": 10000 },
                        { "id": 2, "content": "test-b", "createdBy": "ddd", "createdAt": 10100 },
                        { "id": 3, "content": "test-c", "createdBy": "eee", "createdAt": 10200 },
                        { "id": 4, "content": "test-d", "createdBy": "fff", "createdAt": 10300 },
                        { "id": 5, "content": "test-e", "createdBy": "ggg", "createdAt": 10400 }
                    ]);

                // データを設定する
                controller.newTodo.content = 'newTodo content ';
                controller.onAdd();

                $httpBackend.flush();
            });

            // 対象メソッドの終了を待機します。
            waitsFor((): boolean => {
                return !controller.isProcessing;
            }, 'timedout', 3000);

            // 対象メソッドの実行結果をテストします。
            runs(() => {
                // TodoServiceのpostメソッドをコールしていること
                expect(spy)
                    .toHaveBeenCalled();
                // コントローラの新規TODOの内容がクリアされていること
                expect(controller.newTodo.content)
                    .toBe('');
                // コントローラのエラーコードがクリアされていること
                expect(controller.errorInfo.code)
                    .toBe(0);
                // コントローラのエラーメッセージがクリアされていること
                expect(controller.errorInfo.message)
                    .toBe('');
                // スコープの新規TODOの内容がクリアされていること
                expect($scope.newTodo.content)
                    .toBe('');
                // スコープのエラーコードがクリアされていること
                expect($scope.errorInfo.code)
                    .toBe(0);
                // スコープのエラーメッセージがクリアされていること
                expect($scope.errorInfo.message)
                    .toBe('');

                spy.restore();
            });
        });

        //////////////////////////////////////////////////////////////////////////
        // onAddメソッドの動作テスト
        //////////////////////////////////////////////////////////////////////////
        it('onAddメソッドの動作テスト（正常系）', () => {

            //var spy: jasmine.Spy = spyOn(controller, 'refresh');
            var spy: SinonSpy = sinon.spy(controller, 'refresh');

            // リクエストの設定と対象メソッドのコールを行います
            runs(()=>{
                $httpBackend.expect('POST', 'api/todo/post')
                    .respond(201);

                $httpBackend.expect('GET', 'api/todo/list')
                    .respond(200, [
                        { "id": 1, "content": "test-a", "createdBy": "ccc", "createdAt": 10000 },
                        { "id": 2, "content": "test-b", "createdBy": "ddd", "createdAt": 10100 },
                        { "id": 3, "content": "test-c", "createdBy": "eee", "createdAt": 10200 },
                        { "id": 4, "content": "test-d", "createdBy": "fff", "createdAt": 10300 },
                        { "id": 5, "content": "test-e", "createdBy": "ggg", "createdAt": 10400 }
                    ]);

                $scope.newTodo.content = 'newTodo content ';
                $scope.newTodo.createdBy = 'logonuser';

                controller.onAdd();
                $httpBackend.flush();
            });

            // 対象メソッドの終了を待機します
            waitsFor((): boolean => {
                return !controller.isProcessing;
            }, 'timedout', 3000);

            // 対象メソッドの実行結果をテストします
            runs(() => {
                // コントローラのrefreshメソッドが呼ばれていること
                expect(spy)
                    .toHaveBeenCalled();
                // コントローラのTODOリストが正しく取得できていること
                expect(controller.todos.length)
                    .toBe(5);
                // コントローラのエラーコードがクリアされていること
                expect(controller.errorInfo.code)
                    .toBe(0);
                // コントローラのエラーメッセージがクリアされていること
                expect(controller.errorInfo.message)
                    .toBe('');
                // スコープのTODOリストが正しく再取得されていること
                expect($scope.todos.length)
                    .toBe(5);
                // スコープのエラーコードがクリアされていること
                expect($scope.errorInfo.code)
                    .toBe(0);
                // スコープのエラーメッセージがクリアされていること
                expect($scope.errorInfo.message)
                    .toBe('');
                spy.restore();
            });
        });

        //////////////////////////////////////////////////////////////////////////
        // onAddメソッドの動作テスト
        //////////////////////////////////////////////////////////////////////////
        it('onAddメソッドの動作テスト（準正常系）', () => {

            controller.newTodo.content = 'newTodo content ';
            controller.newTodo.createdBy = 'logonuser';

            var oldLen: number = controller.todos.length;

            // リクエストの設定とテスト対象メソッドの呼び出しを行います。
            runs(() => {
                $httpBackend.expect('POST', 'api/todo/post')
                    .respond(400);

                controller.onAdd();

                $httpBackend.flush();
            });

            // メソッドが終了するまで待機します。
            waitsFor((): boolean => {
                return !controller.isProcessing;
            }, 'timedout', 3000);

            // メソッドの実行結果をテストします。
            runs(() => {
                // コントローラのTODOリストの長さがメソッドの実行前と同じであること
                expect(controller.todos.length)
                    .toBe(oldLen);
                // コントローラのエラーコードに正しい値が設定されていること
                expect(controller.errorInfo.code)
                    .toBe(10000);
                // コントローラのエラーメッセージに正しい値が設定されていること
                expect(controller.errorInfo.message)
                    .toBe('登録に失敗しました。');
                // スコープのTODOリストの長さがメソッドの実行前と同じであること
                expect($scope.todos.length)
                    .toBe(oldLen);
                // スコープのエラーコードに正しい値が設定されていること
                expect($scope.errorInfo.code)
                    .toBe(10000);
                // スコープのエラーメッセージに正しい値が設定されていること
                expect($scope.errorInfo.message)
                    .toBe('登録に失敗しました。');

            });
        });

        //////////////////////////////////////////////////////////////////////////
        // onRemoveメソッドの動作テスト
        //////////////////////////////////////////////////////////////////////////
        it('onRemoveメソッドの動作テスト（正常系）', () => {

            //var spy: jasmine.Spy = spyOn(service, 'remove');
            var spy: SinonSpy = sinon.spy(service, 'delete');

            // リクエストの設定とテスト対象メソッドの呼び出しを行います
            runs(() => {
                $httpBackend.expect('POST', 'api/todo/delete')
                    .respond(201);

                $httpBackend.expect('GET', 'api/todo/list')
                    .respond(200, [
                        { "id": 1, "content": "test-a", "createdBy": "ccc", "createdAt": 10000 },
                        { "id": 2, "content": "test-b", "createdBy": "ddd", "createdAt": 10100 },
                        { "id": 3, "content": "test-c", "createdBy": "eee", "createdAt": 10200 },
                        { "id": 4, "content": "test-d", "createdBy": "fff", "createdAt": 10300 },
                        { "id": 5, "content": "test-e", "createdBy": "ggg", "createdAt": 10400 }
                    ]);

                controller.onRemove(0);

                $httpBackend.flush();
            });

            // メソッドが終了するまで待機します
            waitsFor((): boolean => {
                return !controller.isProcessing;
            }, 'timedout', 3000);

            // メソッドの実行結果をテストします。
            runs(() => {
                // TodoServiceのdeleteメソッドがコールされていること
                expect(spy)
                    .toHaveBeenCalled();
                // コントローラのエラーコードがクリアされていること
                expect(controller.errorInfo.code)
                    .toBe(0);
                // コントローラのエラーメッセージがクリアされていること
                expect(controller.errorInfo.message)
                    .toBe('');
                // スコープのエラーコードがクリアされていること
                expect($scope.errorInfo.code)
                    .toBe(0);
                // スコープのエラーメッセージがクリアされていること
                expect($scope.errorInfo.message)
                    .toBe('');
                spy.restore();
            });
        });

        //////////////////////////////////////////////////////////////////////////
        // onRemoveメソッドの動作テスト
        //////////////////////////////////////////////////////////////////////////
        it('onRemoveメソッドの動作テスト（正常系）', () => {

            //var spy: jasmine.Spy = spyOn(service, 'refresh');
            var spy: SinonSpy = sinon.spy(controller, 'refresh');

            // リクエストの設定とテスト対象メソッドの呼び出しを行います
            runs(() => {
                $httpBackend.expect('POST', 'api/todo/delete')
                    .respond(201);

                $httpBackend.expect('GET', 'api/todo/list')
                    .respond(200, [
                        { "id": 1, "content": "test-a", "createdBy": "ccc", "createdAt": 10000 },
                        { "id": 2, "content": "test-b", "createdBy": "ddd", "createdAt": 10100 },
                        { "id": 3, "content": "test-c", "createdBy": "eee", "createdAt": 10200 },
                        { "id": 4, "content": "test-d", "createdBy": "fff", "createdAt": 10300 },
                        { "id": 5, "content": "test-e", "createdBy": "ggg", "createdAt": 10400 }
                    ]);

                controller.onRemove(0);
                $httpBackend.flush();
            });

            // メソッドが終了するまで待機します
            waitsFor((): boolean => {
                return !controller.isProcessing;
            }, 'timedout', 3000);

            // メソッドの実行結果をテストします。
            runs(() => {
                // コントローラのrefreshメソッドがコールされていること
                expect(spy)
                    .toHaveBeenCalled();
                // コントローラのエラーコードがクリアされていること
                expect(controller.errorInfo.code)
                    .toBe(0);
                // コントローラのエラーメッセージがクリアされていること
                expect(controller.errorInfo.message)
                    .toBe('');
                // スコープのエラーコードがクリアされていること
                expect($scope.errorInfo.code)
                    .toBe(0);
                // スコープのエラーメッセージがクリアされていること
                expect($scope.errorInfo.message)
                    .toBe('');
                spy.restore();
            });
        });

        //////////////////////////////////////////////////////////////////////////
        // onRemoveメソッドの動作テスト
        //////////////////////////////////////////////////////////////////////////
        it('onRemoveメソッドの動作テスト（準正常系）', () => {

            // リクエストの設定とテスト対象メソッドの呼び出しを行います
            runs(() => {
                $httpBackend.expect('POST', 'api/todo/delete')
                    .respond(400);

                controller.onRemove(0);

                $httpBackend.flush();
            });

            // メソッドが終了するまで待機します
            waitsFor((): boolean => {
                return !controller.isProcessing;
            }, 'timedout', 3000);

            // メソッドの実行結果をテストします。
            runs(() => {
                // コントローラのエラーコードが正しく設定されていること
                expect(controller.errorInfo.code)
                    .toBe(20000);
                // コントローラのエラーメッセージが正しく設定されていること
                expect(controller.errorInfo.message)
                    .toBe('削除に失敗しました。');
                // スコープのエラーコードが正しく設定されていること
                expect($scope.errorInfo.code)
                    .toBe(20000);
                // スコープのエラーメッセージが正しく設定されていること
                expect($scope.errorInfo.message)
                    .toBe('削除に失敗しました。');
            });
        });
    });
})
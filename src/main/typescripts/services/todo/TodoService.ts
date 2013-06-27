///<reference path='../../libs/DefinitelyTyped/angularjs/angular.d.ts' />
///<reference path='../../models/todo/Todo.ts' />

module Service.Todo{
    /**
     * TODOに関するサービスを提供するクラスです。
     *
     * @class TodoService
     */
    export class TodoService {
        
        /**
         * コンストラクタ
         *
         * @constructor
         * @param $http {ng.IHttpService}
         */
        constructor(private $http: ng.IHttpService) {
        }

        /**
         * TODOを登録します。
         *
         * @public
         * @method post
         * @param todo {Model.Todo} 登録するTODO
         * @return ng.IHttpPromise
         */
        public post(todo: Model.Todo): ng.IHttpPromise {
            return this.$http({
                method: 'POST',
                url: 'api/todo/post', 
                data: $.param({ content: todo.content }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                cache: false
            });
        }

        /**
         * 指定されたIDに該当するTODOを削除します。
         *
         * @public
         * @method delete
         * @param id {number} 削除するTODOのID
         * @return ng.IHttpPromise
         */
        public delete(id: number) : ng.IHttpPromise {
//            return this.$http.post('api/todo/delete', $.param({id:id}));
            return this.$http({
                method: 'POST',
                url: 'api/todo/delete',
                data: $.param({ id: id }),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                cache: false
            }); 

        }

        /**
         * TODOのリストを取得します。
         *
         * @public
         * @method getList
         * @return ng.IHttpPromise
         */
        public getList(): ng.IHttpPromise {

            var promise: ng.IHttpPromise
                = this.$http({
                    method: 'GET',
                    url: 'api/todo/list',
                    cache: false
                }); 

            // データを使う側にJSONを意識させないように、既存のコールバックをラッピングします。
            var wrappedPromise: ng.IHttpPromise = {
                success: (callback: (todos: Model.Todo[], status?: number,
                            headers?: (headerName: string) => string, config?: ng.IRequestConfig) => ng.IHttpPromise) => {

                    // 既存のコールバックの中でJSON -> TODOのリストに変換します。
                    promise.success((data: any, status: number, headers, config) => {
                        var readTodos: Model.Todo[] = [];
                        data.forEach((todo) => {
                            readTodos.push(new Model.Todo(todo));
                        });
                        // ラップしたコールバックに変換したTODOリストを渡します。
                        callback(readTodos, status, headers, config);
                    });
                    return wrappedPromise;
                },
                error: promise.error,
                then:promise.then
            };
            return wrappedPromise;
        }
    }
}
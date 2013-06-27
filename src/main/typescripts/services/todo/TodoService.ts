///<reference path='../../libs/DefinitelyTyped/angularjs/angular.d.ts' />
///<reference path='../../models/todo/Todo.ts' />

module Service.Todo{
    /**
     * TODO�Ɋւ���T�[�r�X��񋟂���N���X�ł��B
     *
     * @class TodoService
     */
    export class TodoService {
        
        /**
         * �R���X�g���N�^
         *
         * @constructor
         * @param $http {ng.IHttpService}
         */
        constructor(private $http: ng.IHttpService) {
        }

        /**
         * TODO��o�^���܂��B
         *
         * @public
         * @method post
         * @param todo {Model.Todo} �o�^����TODO
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
         * �w�肳�ꂽID�ɊY������TODO���폜���܂��B
         *
         * @public
         * @method delete
         * @param id {number} �폜����TODO��ID
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
         * TODO�̃��X�g���擾���܂��B
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

            // �f�[�^���g������JSON���ӎ������Ȃ��悤�ɁA�����̃R�[���o�b�N�����b�s���O���܂��B
            var wrappedPromise: ng.IHttpPromise = {
                success: (callback: (todos: Model.Todo[], status?: number,
                            headers?: (headerName: string) => string, config?: ng.IRequestConfig) => ng.IHttpPromise) => {

                    // �����̃R�[���o�b�N�̒���JSON -> TODO�̃��X�g�ɕϊ����܂��B
                    promise.success((data: any, status: number, headers, config) => {
                        var readTodos: Model.Todo[] = [];
                        data.forEach((todo) => {
                            readTodos.push(new Model.Todo(todo));
                        });
                        // ���b�v�����R�[���o�b�N�ɕϊ�����TODO���X�g��n���܂��B
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
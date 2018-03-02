(function()
{
    agnular
        .module("WhiteBoardApp")
        .factory("UserService", UserService);

    function UserService($http)
    {
        var service = {
            createUser: createUser,
            loginUser: loginUser
        };
        return service;
        
        function createUser(user, callback)
        {
            $http.post("/res/register", user)
            .success(callback);
        }

        function loginUser(user, callback)
        {
            $http.post('/res/login', user)
            .success(callback);
        }
    }
})();
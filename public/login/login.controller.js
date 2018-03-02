(function()
{
    angular
        .module("WhiteBordApp")
        .controller("LoginController", LoingController);

    function LoginController(UserService)
    {
        var vm = this;
        var login =  login;

        function login(user)
        {
            UserService.loginUser(user, function(response)
            {
                console.log(response);
            });
        }
    }
})();
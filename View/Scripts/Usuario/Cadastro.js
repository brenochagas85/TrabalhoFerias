
$(() => {
    $id = -1;

   
    function obterTodos() {
        $("#lista-usuarios").empty();

        $.ajax({
            url: '/usuario/obtertodos',
            method: 'get',
            data: {

            },
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    var registro = data[i];

                    var linha = document.createElement('tr');

                    var colunaCodigo = document.createElement('td');
                    colunaCodigo.innerHTML = registro.Id;

                    var colunaNome = document.createElement('td');
                    colunaNome.innerHTML = registro.Nome;

                    var colunaLogin = document.createElement('td');
                    colunaLogin.innerHTML = registro.Login;

                    var colunaSenha = document.createElement('td');
                    colunaSenha.innerHTML = registro.Senha;

                    var colunaAcao = document.createElement('td');

                    var botaoEditar = document.createElement('button');
                    botaoEditar.innerHTML = "<i class=\"fas fa-pen\"></i> Editar";
                    botaoEditar.classList.add("btn", "btn-primary", "mr-3", "botao-editar")
                    botaoEditar.setAttribute("data-id", registro.Id);

                    var botaoApagar = document.createElement('button');
                    botaoApagar.innerHTML = "<i class=\"fas fa-trash\"></i> Apagar";
                    botaoApagar.classList.add("btn", "btn-danger", "botao-apagar")
                    botaoApagar.setAttribute("data-id", registro.Id);

                    colunaAcao.appendChild(botaoEditar);
                    colunaAcao.appendChild(botaoApagar);

                    linha.appendChild(colunaCodigo);
                    linha.appendChild(colunaNome);
                    linha.appendChild(colunaLogin);
                    linha.appendChild(colunaSenha);
                    linha.appendChild(colunaAcao);
                    document.getElementById("lista-usuarios").appendChild(linha);
                }
            },
            error: function (data) {
                alert("DEU RUIM");
            }
        });
    }

    $('.table').on('click', '.botao-editar', function (){
        $id = $(this).data('id');
        $.ajax({
            url: '/usuario/obterpeloid/' + $id,
            method: 'get',
            success: function (data) {
                $id = data.Id;
                $("#campo-nome").val(data.Nome);
                $("#campo-login").val(data.Login);
                $("#campo-senha").val(data.Senha);
                $('#modalCadastroUsuario').modal('show');
            }
        });
    });

    $('.table').on('click', '.botao-apagar', function () {
        $id = $(this).data('id');   
        $.ajax({
            url: '/usuario/apagar/' + $id,
            method: 'get',
            success: function (data) {
                obterTodos();
            }
        });
    });

    $('#usuario-botao-salvar').on('click', function () {
        if ($id == -1 && $('#form').valid()) {
            inserir();
        } else if ($id != -1 && $('#form').valid()){
            alterar();
        }
    });

    function alterar() {
        $nome = $("#campo-nome").val();
        $login = $("#campo-login").val();
        $senha = $("#campo-senha").val();

        $.ajax({
            method: 'post',
            url: '/usuario/update',
            data: {
                Nome: $nome,
                Login: $login,
                Senha: $senha,
                Id: $id
            },
            success: function (data) {
                $id = -1;
                $("#modalCadastroUsuario").modal("hide");
                obterTodos();
                limparCampos();
            },
            error: function (data) {
                console.log("ERRO");
            }
        });
    }

    function inserir() {
        $nome = $("#campo-nome").val();
        $login = $("#campo-login").val();
        $senha = $("#campo-senha").val();

        $.ajax({
            method: 'post',
            url: '/usuario/store',
            data: {
                Nome: $nome,
                Login: $login,
                Senha: $senha
            },
            success: function (data) {
                $id = -1;
                $("#modalCadastroUsuario").modal("hide");
                obterTodos();
                limparCampos();
            },
            error: function (data) {
                console.log("ERRO");
            }
        });
    }

    function limparCampos() {
        $('#campo-nome').val("");
        $('#campo-login').val("");
        $('#campo-senha').val("");
        $('.toggle-senha').attr("type", "password");
    }

    obterTodos();
});
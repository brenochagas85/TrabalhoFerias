$(() => {
    $id = -1;
    function obterTodos() {
        $("#lista-estados").empty();

        $.ajax({
            url: '/estado/obtertodos',
            method: 'get',
            data: {

            },
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    var registro = data[i];

                    var linha = document.createElement('tr');

                    var colunaCodigo = document.createElement('tr');
                    colunaCodigo.innerHTML = registro.Id;

                    var colunaNome = document.createElement('tr');
                    colunaNome.innerHTML = registro.Nome;

                    var colunaSigla = document.createElement('tr');
                    colunaSigla.innerHTML = registro.Sigla;

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
                    linha.appendChild(colunaSigla);
                    linha.appendChild(colunaAcao);
                    document.getElementById("lista-estados").appendChild;
                }
            },
            error: function (data) {
                alert("deu ruim");
            }
        });
    }

    $('.table').on('click', '.botao-editar', function () {
        $id = $(this).data('id');
        $.ajax({
            url: '/estado/apagar' + $id,
            method: 'get',
            success: function (data) {
                obterTodos();
            }
        });
    });

    $('.table').on('click', '.botao-apagar', function () {
        $id = $(this).data('id');
        $.ajax({
            url: '/estado/apagar/' + $id,
            method: 'get',
            success: function (data) {
                obterTodos();
            }
        });
    });

    $('#estado-botao-salvar').on('click', function () {
        $('form').validate;
        if ($id == -1) {
            inserir();
        } else {
            alterar();
        }
    });

    function alterar() {
        $nome = $("#campo-nome").val();
        $sigla = $("#campo-sigla").val();

        $.ajax({
            method: 'post',
            url: '/estado/update',
            data: {
                Nome: $nome,
                Sigla: $sigla,
                Id: $id
            },
            success: function (data) {
                $id = -1;
                $("#modalCadastroEstado").modal("hide");
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
        $sigla = $("#campo-sigla").val();

        $.ajax({
            method: 'post',
            url: 'estado/store',
            data: {
                Nome: $nome,
                Sigla: $sigla,
            },
            success: function (data) {
                $id = -1;
                $("#modalCadastroEstado").modal("hide");
                obterTodos();
                limparCampos();
            },
            error: function (data) {
                console.log("TENTE NOVAMENTE");
            }
        });
    }
    function limparCampos() {
        $('#campo-nome').val("");
        $('#campo-sigla').val("");
    }
    obterTodos();
});

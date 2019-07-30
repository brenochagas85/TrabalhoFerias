$(() => {
    $id = -1;
    function obterTodos() {
        $("#lista-projetos").empty();

        $.ajax({
            url: '/projeto/obtertodos',
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

                    var colunaDataCriacao = document.createElement('tr');
                    colunaDataCriacao.innerHTML = registro.DataCriacao;

                    var colunaDataFinalizacao = document.createElement('tr');
                    colunaDataFinalizacao.innerHTML = registro.DataFinalizacao;

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
                    linha.appendChild(colunaDataCriacao);
                    linha.appendChild(colunaDataFinalizacao);
                    linha.appendChild(colunaAcao);
                    document.getElementById("lista-projetos").appendChild;
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
            url: '/projeto/apagar' + $id,
            method: 'get',
            success: function (data) {
                obterTodos();
            }
        });
    });

    $('.table').on('click', '.botao-apagar', function () {
        $id = $(this).data('id');
        $.ajax({
            url: '/projeto/apagar/' + $id,
            method: 'get',
            success: function (data) {
                obterTodos();
            }
        });
    });

    $('#projeto-botao-salvar').on('click', function () {
        $('form').validate;
        if ($id == -1) {
            inserir();
        } else {
            alterar();
        }
    });

    function alterar() {
        $nome = $("#campo-nome").val();
        $dataCriacao = $("#campo-dataCriacao").val();
        $dataFinalizacao = $("#campo-dataFinalizacao").val();

        $.ajax({
            method: 'post',
            url: '/projeto/update',
            data: {
                Nome: $nome,
                DataCriacao: $dataCriacao,
                DataFinalizacao: $dataFinalizacao,
                Id: $id
            },
            success: function (data) {
                $id = -1;
                $("#modalCadastroProjeto").modal("hide");
                obterTodos();
                limparCampos();

            },
            error: function (data) {
                console.log("TENTE NOVAMENTE");
            }
        });
    }
    function inserir() {
        $nome = $("#campo-nome").val();
        $dataCriacao = $("#campo-dataCriacao").val();
        $dataFinalizacao = $("#campo-dataFinalizacao").val();

        $.ajax({
            method: 'post',
            url: 'projeto/store',
            data: {
                Nome: $nome,
                DataCriacao: $dataCriacao,
                DataFinalizacao: $dataFinalizacao,
                Id: $id

            },
            success: function (data) {
                $id = -1;
                $("#modalCadastroProjeto").modal("hide");
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
        $('#campo-dataCriacao').val("");
        $('#campo-dataFinalizacao').val("");

    }
    obterTodos();
});

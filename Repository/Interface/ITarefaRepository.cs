using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    interface ITarefaRepository
    {
        int Inserir(Tarefa tarefa);

        bool Atualizar(Tarefa tarefa);

        bool Apagar(int id);

        Tarefa ObterPeloId(int id);

        List<Tarefa> ObterTodos(string busca);
    }
}

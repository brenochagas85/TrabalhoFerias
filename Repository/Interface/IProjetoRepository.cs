using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    interface IProjetoRepository
    {
        int Inserir(Projeto projeto);

        bool Atualizar(Projeto projeto);

        bool Apagar(int id);

        Projeto ObterPeloId(int id);

        List<Projeto> ObterTodos(string busca);
    }
}

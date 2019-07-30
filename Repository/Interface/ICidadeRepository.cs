using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    interface ICidadeRepository
    {
        int Inserir(Cidade cidade);

        bool Atualizar(Cidade cidade);

        bool Apagar(int id);

        Cidade ObterPeloId(int id);

        List<Cidade> ObterTodos(string busca);
    }
}

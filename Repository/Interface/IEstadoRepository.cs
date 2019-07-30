using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    interface IEstadoRepository
    {
        int Inserir(Estado estado);

        bool Atualizar(Estado estado);

        bool Apagar(int id);

        Estado ObterPeloId(int id);

        List<Estado> ObterTodos(string busca);
    }
}

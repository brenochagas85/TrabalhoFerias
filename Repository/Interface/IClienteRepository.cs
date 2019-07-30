using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    interface IClienteRepository
    {
        int Inserir(Cliente cliente);

        bool Atualizar(Cliente cliente);

        bool Apagar(int id);

        Cliente ObterPeloId(int id);

        List<Cliente> ObterTodos(string busca);
    }
}

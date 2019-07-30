using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    [Table("projetos")]
    public class Projeto : Base
    {
        public int IdCliente { get; set; }
        [ForeignKey("Id_cliente")]
        public Cliente Cliente { get; set; }

        [Column("nome")]
        public string Nome { get; set; }

        [Column("data_criacao_projeto")]
        public DateTime DataCriacaoProjeto { get; set; }

        [Column("data_finalizacao")]
        public DateTime DataFinalizacao { get; set; }

    }
}

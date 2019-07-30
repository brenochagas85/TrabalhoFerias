using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    [Table("tarefas")]
    public class Tarefa : Base
    {
        public int IdUsuarioResponsavel { get; set; }
        [ForeignKey("IdUsuarioResponsavel")]
        public Usuario Usuario { get; set; }

        public int IdProjeto { get; set; }
        [ForeignKey("IdProjeto")]
        public Projeto Projeto { get; set; }

        public int IdCategoria { get; set; }
        [ForeignKey("IdCategoria")]
        public Categoria Categoria { get; set; }
        
        [Column("titulo")]
        public string Titulo { get; set; }

        [Column("descricao")]
        public string Descricao { get; set; }

        [Column("duracao")]
        public DateTime Duracao { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    [Table("categorias")]
    public class Categoria : Base
    {
        [Column("nome")]
        public string Nome { get; set; }

        public List<Tarefa> Tarefas { get; set; }
    }
}

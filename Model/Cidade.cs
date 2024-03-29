﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    [Table("cidades")]
    public class Cidade : Base
    {
        [Column("id_estado")]
        public int IdEstado { get; set; }

        [Column("nome")]
        public string Nome { get; set; }

        [Column("numero_habitante")]
        public int NumeroHabitante { get; set; }

    }
}

import { Avaliacao } from 'src/entities/avaliacoes.entity';
import { Categoria } from 'src/entities/categoria.entity';
 
 
import { Cozinha } from 'src/entities/cozinha.entity';
import { Desconto } from 'src/entities/descontos.entity';
import { Estoque } from 'src/entities/estoque.entity';
import { HistoricoPedido } from 'src/entities/historico_pedido.entity';
import { ItemProdutosPedidos } from 'src/entities/itemProdutosPedidos.entity';
import { NotaFiscal } from 'src/entities/nota-fiscal.entity';
import { Pagamento } from 'src/entities/pagamento.entity';
import { Pedido } from 'src/entities/pedido.entity';
import { Pontuacao } from 'src/entities/pontuacao.entity';
import { Produto } from 'src/entities/produto.entity';
import { Role } from 'src/entities/role.entity';
 
import { User } from 'src/entities/user.entity';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

const config: MysqlConnectionOptions = {
  type: 'mysql',
  database: 'db_pedido', // Nome do banco de dados MySQL
  host: 'localhost',
  port: 3306, // Porta padrão do MySQL
  username: 'root', // Seu nome de usuário do MySQL
  password: '', // Sua senha do MySQL
  entities: [User,Avaliacao, Produto,   Pedido, Cozinha,Categoria,
    Pontuacao,Estoque, Role, Pagamento, Desconto, ItemProdutosPedidos,
    NotaFiscal,HistoricoPedido],
  synchronize: true, // Define para "true" para sincronizar automaticamente o esquema com o banco de dados (apenas em ambiente de desenvolvimento)
};

export default config;

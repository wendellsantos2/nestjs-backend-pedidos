// src/produtos/dto/produto.dto.ts

export class CreateProdutoDTO {
  produto_id?: number; // Opcional, pois pode ser gerado automaticamente pelo banco de dados.
  descricao: string;
  }
  
// src/produtos/dto/produto.dto.ts

export class CreateProdutoDTO {
    id_produto?: number; // Opcional, pois pode ser gerado automaticamente pelo banco de dados.
    descricao: string;
  }
  
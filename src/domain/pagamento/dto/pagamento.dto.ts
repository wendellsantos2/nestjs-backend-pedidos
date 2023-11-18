// src/pagamentos/dto/pagamento.dto.ts

export class CreatePagamentoDTO {
    id_pagamento?: number; // Opcional, pois pode ser gerado automaticamente pelo banco de dados.
    id_pedido: number;
  }
  
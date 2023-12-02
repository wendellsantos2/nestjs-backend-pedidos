export class CreateAvaliacaoDTO {
    usuario_id: number;  // ID of the User
    produto_id: number;  // ID of the Produto
    avaliacao: number;   // Rating
    comentario?: string; // Optional Comment
}

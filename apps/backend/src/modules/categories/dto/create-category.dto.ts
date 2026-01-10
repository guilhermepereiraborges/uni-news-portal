import { IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'O nome da categoria é obrigatório' })
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  @Matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
    message: 'O código de cor deve ser um Hex válido (ex: #FF0000)',
  })
  colorCode?: string;
}

import { IsString } from 'class-validator';

export class CreatePokemonDto {
  no: number;
  @IsString()
  name: string;
}

import { Test } from '@nestjs/testing';
import { PaginationDto } from '../common/dto/pagination.dto';
import { CreatePokemonDto } from './dto/create-pokemon.dto';

import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';

describe('PokemonController', () => {
  let pokemonController: PokemonController;
  let pokemonService: PokemonService;
  const createpPokemonDto: CreatePokemonDto = {
    name: 'Bulbasour',
    no: 1,
  };
  const mockPokemon = {
    name: 'Bulbasour',
    no: 1,
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [PokemonController],
      providers: [
        {
          provide: PokemonService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                name: 'Bulbasour',
                no: 1,
              },
              {
                name: 'Charmander',
                no: 4,
              },
              {
                name: 'Squirtel',
                no: 7,
              },
            ]),
            create: jest.fn().mockResolvedValue(createpPokemonDto),
          },
        },
      ],
    }).compile();

    pokemonService = moduleRef.get<PokemonService>(PokemonService);
    pokemonController = moduleRef.get<PokemonController>(PokemonController);
  });

  describe('create()', () => {
    it('should create a new pokemon', async () => {
      const createSpy = jest.spyOn(pokemonService, 'create');
      // .mockResolvedValueOnce(mockPokemon);

      await pokemonController.create(createpPokemonDto);
      expect(createSpy).toHaveBeenCalledWith(createpPokemonDto);
    });
  });
  describe('findAll()', () => {
    it('should return an array of pokemons', async () => {
      const mockPagination: PaginationDto = {
        limit: 5,
      };
      expect(pokemonController.findAll(mockPagination)).resolves.toEqual([
        {
          name: 'Bulbasour',
          no: 1,
        },
        {
          name: 'Charmander',
          no: 4,
        },
        {
          name: 'Squirtel',
          no: 7,
        },
      ]);
      expect(pokemonService.findAll).toHaveBeenCalled();
    });
  });
});

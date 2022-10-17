/* eslint-disable consistent-return */
import { Test } from '@nestjs/testing';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { SnippetsController } from './snippets.controller';
import { SnippetsService } from './snippets.service';

const moduleMocker = new ModuleMocker(global);

describe('SnippetController', () => {
  let dataSnippets: any;
  let snippetsController: SnippetsController;
  let snippetsService: SnippetsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [SnippetsController],
    })
      .useMocker((token) => {
        if (token === SnippetsService) {
          return {
            findAll: jest.fn().mockResolvedValue(dataSnippets),
            findOne: jest.fn(() => []),
            create: jest.fn(() => []),
            update: jest.fn(() => []),
            delete: jest.fn(() => []),
          };
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    snippetsController = moduleRef.get(SnippetsController);
    snippetsService = moduleRef.get(SnippetsService);
  });

  describe('snippets', () => {
    it('should return all snippets', async () => {
      jest.spyOn(snippetsController, 'findAll');
      await snippetsController.findAll();

      expect(snippetsService.findAll).toHaveBeenCalled();
    });

    it('should return snippet', async () => {
      jest.spyOn(snippetsController, 'findOne');
      await snippetsController.findOne(2);

      expect(snippetsService.findOne).toBeCalledWith(2);
    });

    it('should create snippet', async () => {
      const userData = {
        id: 3,
        email: 'test@mail.ru',
      };
      const createData = { code: 'test' };
      jest.spyOn(snippetsController, 'create');
      await snippetsController.create(userData, createData);
      expect(snippetsService.create).toHaveBeenCalledWith(createData, userData);
    });

    it('should delete snippet', async () => {
      jest.spyOn(snippetsController, 'delete');
      await snippetsController.delete(3);
      expect(snippetsService.delete).toHaveBeenCalledWith(3);
    });

    it('should update snippet', async () => {
      const updateData = {
        name: 'changedName',
      };
      jest.spyOn(snippetsController, 'update');
      await snippetsController.update(3, updateData);
      expect(snippetsService.update).toHaveBeenCalledWith(3, updateData);
    });
  });
});

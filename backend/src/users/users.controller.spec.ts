/* eslint-disable consistent-return */
import { Test } from '@nestjs/testing';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const moduleMocker = new ModuleMocker(global);

describe('SnippetController', () => {
  let dataUsers: any;
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
    })
      .useMocker((token) => {
        if (token === UsersService) {
          return {
            findAll: jest.fn().mockResolvedValue(dataUsers),
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

    usersController = moduleRef.get(UsersController);
    usersService = moduleRef.get(UsersService);
  });

  describe('users', () => {
    it('should return all users', async () => {
      jest.spyOn(usersController, 'findAll');
      await usersController.findAll();

      expect(usersService.findAll).toHaveBeenCalled();
    });

    it('should create user', async () => {
      const createData = {
        username: 'user',
        email: 'user@mail.ru',
        password: '#43T#!^',
        confirmPassword: '#43T#!^',
      };
      jest.spyOn(usersController, 'create');
      await usersController.create(createData, {});
      expect(usersService.create).toHaveBeenCalledWith(createData);
    });

    it('should delete user', async () => {
      jest.spyOn(usersController, 'delete');
      await usersController.delete(3);
      expect(usersService.delete).toHaveBeenCalledWith(3);
    });

    it('should update user', async () => {
      const updateData = {
        username: 'changedName',
        email: 'changedEmail',
        password: '%#!%&!#%!#%!#',
      };
      jest.spyOn(usersController, 'update');
      await usersController.update(3, updateData);
      expect(usersService.update).toHaveBeenCalledWith(3, updateData);
    });
  });
});

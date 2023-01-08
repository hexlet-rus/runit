/* eslint-disable consistent-return */
import { Test, TestingModule } from '@nestjs/testing';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const moduleMocker = new ModuleMocker(global);

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;
  let dataUsers: any;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    })
      .useMocker((token) => {
        if (token === AppService) {
          return {
            run: jest.fn().mockResolvedValue(dataUsers),
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

    appController = moduleRef.get(AppController);
    appService = moduleRef.get(AppService);
  });

  describe('app', () => {
    it('should run code', async () => {
      jest.spyOn(appController, 'getLogs');
      await appController.getLogs('console.log("hello");');

      expect(appService.run).toHaveBeenCalledWith('console.log("hello");');
    });
  });
});

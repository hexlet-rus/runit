/* eslint-disable consistent-return */
import { Test, TestingModule } from '@nestjs/testing';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { RunnerController } from './runner.controller';
import { RunnerService } from './runner.service';

const moduleMocker = new ModuleMocker(global);

describe('AppController', () => {
  let runnerController: RunnerController;
  let runnerService: RunnerService;
  let dataUsers: any;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [RunnerController],
    })
      .useMocker((token) => {
        if (token === RunnerService) {
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

    runnerController = moduleRef.get(RunnerController);
    runnerService = moduleRef.get(RunnerService);
  });

  describe('runner', () => {
    it('should run code', async () => {
      jest.spyOn(runnerController, 'getLogs');
      await runnerController.getLogs({
        code: 'console.log("hello");',
        language: 'javascript',
      });

      expect(runnerService.run).toHaveBeenCalledWith(
        'console.log("hello");',
        'javascript',
      );
    });
  });
});

/* eslint-disable consistent-return */
import { Test, TestingModule } from '@nestjs/testing';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { DockerController } from './docker.controller';
import { DockerService } from './docker.service';

const moduleMocker = new ModuleMocker(global);

describe('AppController', () => {
  let dockerController: DockerController;
  let dockerService: DockerService;
  let dataUsers: any;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [DockerController],
    })
      .useMocker((token) => {
        if (token === DockerService) {
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

    dockerController = moduleRef.get(DockerController);
    dockerService = moduleRef.get(DockerService);
  });

  describe('docker', () => {
    it('should run code', async () => {
      jest.spyOn(dockerController, 'getLogs');
      await dockerController.getLogs({
        code: 'console.log("hello");',
        language: 'javascript',
      });

      expect(dockerService.run).toHaveBeenCalledWith(
        'console.log("hello");',
        'javascript',
      );
    });
  });
});

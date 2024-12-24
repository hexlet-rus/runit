import { Output } from '../console/interfaces/output.interface';

export default interface Runner {
  run(code: string): Promise<Output>;
}

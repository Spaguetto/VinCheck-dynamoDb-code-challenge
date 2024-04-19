import { float } from 'aws-sdk/clients/lightsail';
import { FineInputDto} from './fine-input.dto';

export class FineDto extends FineInputDto {
  fineId: string;
  fineType: string;
  costValue: float;
  fineCreationDate: Date;

  constructor() {
    super();
    this.fineCreationDate = new Date(); // Current datetime stamp
  }
}

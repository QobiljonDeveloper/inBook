import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { AudioPart } from "./models/audio-part.model";
import { CreateAudioPartDto } from "./dto/create-audio-part.dto";
import { UpdateAudioPartDto } from "./dto/update-audio-part.dto";

@Injectable()
export class AudioPartsService {
  constructor(
    @InjectModel(AudioPart)
    private audioPartRepo: typeof AudioPart
  ) {}

  async create(dto: CreateAudioPartDto) {
    return await this.audioPartRepo.create(dto);
  }

  async findAll() {
    return await this.audioPartRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const part = await this.audioPartRepo.findByPk(id, {
      include: { all: true },
    });
    if (!part) throw new NotFoundException("Audio part not found");
    return part;
  }

  async update(id: number, dto: UpdateAudioPartDto) {
    const part = await this.findOne(id);
    return await part.update(dto);
  }

  async remove(id: number) {
    const part = await this.findOne(id);
    return await part.destroy();
  }
}

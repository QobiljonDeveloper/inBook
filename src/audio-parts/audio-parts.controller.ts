import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { AudioPartsService } from "./audio-parts.service";
import { CreateAudioPartDto } from "./dto/create-audio-part.dto";
import { UpdateAudioPartDto } from "./dto/update-audio-part.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Audio Parts")
@Controller("audio-parts")
export class AudioPartsController {
  constructor(private readonly audioPartsService: AudioPartsService) {}

  @Post()
  @ApiOperation({ summary: "Create audio part" })
  @ApiResponse({ status: 201, description: "Audio part created" })
  create(@Body() createAudioPartDto: CreateAudioPartDto) {
    return this.audioPartsService.create(createAudioPartDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all audio parts" })
  @ApiResponse({ status: 200, description: "List of audio parts" })
  findAll() {
    return this.audioPartsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get one audio part by ID" })
  @ApiResponse({ status: 200, description: "Audio part found" })
  findOne(@Param("id") id: string) {
    return this.audioPartsService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update audio part by ID" })
  @ApiResponse({ status: 200, description: "Audio part updated" })
  update(
    @Param("id") id: string,
    @Body() updateAudioPartDto: UpdateAudioPartDto
  ) {
    return this.audioPartsService.update(+id, updateAudioPartDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete audio part by ID" })
  @ApiResponse({ status: 200, description: "Audio part deleted" })
  remove(@Param("id") id: string) {
    return this.audioPartsService.remove(+id);
  }
}

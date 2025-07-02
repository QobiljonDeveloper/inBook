import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { AudioBookService } from "./audio_book.service";
import { CreateAudioBookDto } from "./dto/create-audio_book.dto";
import { UpdateAudioBookDto } from "./dto/update-audio_book.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AudioBook } from "./models/audio_book.model";

@ApiTags("AudioBook") 
@Controller("audio-book")
export class AudioBookController {
  constructor(private readonly audioBookService: AudioBookService) {}

  @Post()
  @ApiOperation({ summary: "Yangi audio kitob yaratish" })
  @ApiResponse({
    status: 201,
    description: "AudioBook yaratildi",
    type: AudioBook,
  })
  create(@Body() createAudioBookDto: CreateAudioBookDto) {
    return this.audioBookService.create(createAudioBookDto);
  }

  @Get()
  @ApiOperation({ summary: "Barcha audio kitoblarni olish" })
  @ApiResponse({
    status: 200,
    description: "AudioBook ro‘yxati",
    type: [AudioBook],
  })
  findAll() {
    return this.audioBookService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Bitta audio kitobni ID orqali olish" })
  @ApiResponse({
    status: 200,
    description: "AudioBook topildi",
    type: AudioBook,
  })
  findOne(@Param("id") id: string) {
    return this.audioBookService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "AudioBook maʼlumotlarini yangilash" })
  @ApiResponse({
    status: 200,
    description: "AudioBook yangilandi",
    type: AudioBook,
  })
  update(
    @Param("id") id: string,
    @Body() updateAudioBookDto: UpdateAudioBookDto
  ) {
    return this.audioBookService.update(+id, updateAudioBookDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "AudioBookni o‘chirish" })
  @ApiResponse({ status: 200, description: "AudioBook o‘chirildi" })
  remove(@Param("id") id: string) {
    return this.audioBookService.remove(+id);
  }
}

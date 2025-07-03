import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CollectionService } from "./collection.service";
import { CreateCollectionDto } from "./dto/create-collection.dto";
import { UpdateCollectionDto } from "./dto/update-collection.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("Collection")
@Controller("collection")
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Post()
  @ApiOperation({ summary: "Create new collection" })
  @ApiResponse({ status: 201, description: "Collection created successfully" })
  create(@Body() createCollectionDto: CreateCollectionDto) {
    return this.collectionService.create(createCollectionDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all collections" })
  @ApiResponse({ status: 200, description: "All collections returned" })
  findAll() {
    return this.collectionService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get one collection by ID" })
  @ApiResponse({ status: 200, description: "Collection found" })
  findOne(@Param("id") id: string) {
    return this.collectionService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update collection by ID" })
  @ApiResponse({ status: 200, description: "Collection updated successfully" })
  update(
    @Param("id") id: string,
    @Body() updateCollectionDto: UpdateCollectionDto
  ) {
    return this.collectionService.update(+id, updateCollectionDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete collection by ID" })
  @ApiResponse({ status: 200, description: "Collection deleted successfully" })
  remove(@Param("id") id: string) {
    return this.collectionService.remove(+id);
  }
}

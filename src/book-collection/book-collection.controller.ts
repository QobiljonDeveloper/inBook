import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { BookCollectionService } from "./book-collection.service";
import { CreateBookCollectionDto } from "./dto/create-book-collection.dto";
import { UpdateBookCollectionDto } from "./dto/update-book-collection.dto";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";

@ApiTags("Book-Collection")
@Controller("book-collection")
export class BookCollectionController {
  constructor(private readonly bookCollectionService: BookCollectionService) {}

  @Post()
  @ApiOperation({ summary: "Create book-collection relationship" })
  @ApiResponse({
    status: 201,
    description: "BookCollection created successfully",
  })
  create(@Body() createBookCollectionDto: CreateBookCollectionDto) {
    return this.bookCollectionService.create(createBookCollectionDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all book-collection relationships" })
  @ApiResponse({
    status: 200,
    description: "List of book-collection relations",
  })
  findAll() {
    return this.bookCollectionService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get one book-collection relationship by ID" })
  @ApiResponse({ status: 200, description: "Single book-collection found" })
  findOne(@Param("id") id: string) {
    return this.bookCollectionService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a book-collection relationship by ID" })
  @ApiResponse({
    status: 200,
    description: "BookCollection updated successfully",
  })
  update(
    @Param("id") id: string,
    @Body() updateBookCollectionDto: UpdateBookCollectionDto
  ) {
    return this.bookCollectionService.update(+id, updateBookCollectionDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a book-collection relationship by ID" })
  @ApiResponse({
    status: 200,
    description: "BookCollection deleted successfully",
  })
  remove(@Param("id") id: string) {
    return this.bookCollectionService.remove(+id);
  }
}

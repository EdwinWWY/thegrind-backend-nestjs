import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { LessonsService } from "./lessons.service";
import { CreateLessonDto } from "./dto/create-lesson.dto";
import { UpdateLessonDto } from "./dto/update-lesson.dto";
import { ApiTags } from "@nestjs/swagger";
import { VideosService } from "../videos/videos.service";
import { Lesson } from "./entities/lesson.entity";
import { ReadLessonDto } from "./dto/read-lesson.dto";

@ApiTags("Lessons")
@Controller("lessons")
export class LessonsController {
  constructor(
    private readonly lessonsService: LessonsService,
    private readonly videosService: VideosService
  ) {}

  @Post()
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonsService.create(createLessonDto);
  }

  @Get()
  findAll() {
    return this.lessonsService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    var lesson = await this.lessonsService.findOne(+id);
    var videos = await this.videosService.findAllByCourseId(lesson.course.id);
    const result: ReadLessonDto = { ...lesson, videos: videos };
    return result;
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonsService.update(+id, updateLessonDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.lessonsService.remove(+id);
  }
}

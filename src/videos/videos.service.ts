import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateVideoDto } from "./dto/create-video.dto";
import { UpdateVideoDto } from "./dto/update-video.dto";
import { Video } from "./entities/video.entity";

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private VideosRepository: Repository<Video>
  ) {}

  create(createVideoDto: CreateVideoDto) {
    return "This action adds a new video";
  }

  findAll() {
    return this.VideosRepository.createQueryBuilder("video")
      .leftJoinAndSelect("video.owner", "user")
      .leftJoinAndSelect("user.partner", "partner")
      .leftJoinAndSelect("video.channel", "channel")
      .getMany();
  }

  findAllByCourseId(id: number) {
    return this.VideosRepository.createQueryBuilder("video")
      .leftJoinAndSelect("video.owner", "user")
      .leftJoinAndSelect("user.partner", "partner")
      .where("video.channel_id = :id", { id })
      .getMany();
  }

  findOne(id: number) {
    return this.VideosRepository.createQueryBuilder("video")
      .leftJoinAndSelect("video.owner", "user")
      .leftJoinAndSelect("user.partner", "partner")
      .leftJoinAndSelect("video.channel", "channel")
      .where("video.id = :id", { id })
      .getOne();
  }

  update(id: number, updateVideoDto: UpdateVideoDto) {
    return `This action updates a #${id} video`;
  }

  remove(id: number) {
    return `This action removes a #${id} video`;
  }
}

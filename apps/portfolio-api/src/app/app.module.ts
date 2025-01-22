import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PortfoliosModule } from './portfolios/portfolios.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectModule } from './projects/project.module';

@Module({
  imports: [
    UsersModule,
    PortfoliosModule,
    MongooseModule.forRoot(
      'mongodb+srv://husain:Z3uNrZYYyTYALJaA@penny.0fdej.mongodb.net/?retryWrites=true&w=majority&appName=Penny'
    ),
    ProjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

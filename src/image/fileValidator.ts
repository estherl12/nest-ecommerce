import { BadRequestException } from "@nestjs/common";


type fileFilter = (
    req: any,
    file: {
      fieldname: string;
      originalname: string;
      encoding: string;
      mimetype: string;
      size: number;
      destination: string;
      filename: string;
      path: string;
      buffer: Buffer;
    },
    cb: (error: Error | null, acceptFile: boolean) => void,
  ) => void;

  export const imageFilter:fileFilter = (req,file,cb) =>{
    if(file.mimetype.startsWith('image')){
        cb(null,true);
    }else{
        cb(new BadRequestException("only image file are allowed"),false)
    }
  }
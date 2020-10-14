import multer from 'multer';
import path from 'path';

export default {
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'uploads'),
    filename: (request, file, cb) => {
      const fileName = `${Date.now()}-${file.originalname}`;
      cb(null, fileName); // em caso de dúvidas, olhar a documentação do multer https://github.com/expressjs/multer#readme
    },
  }),
};

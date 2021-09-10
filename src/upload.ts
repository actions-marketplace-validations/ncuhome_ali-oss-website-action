import OSS from "ali-oss";
import { walkdirCallback, walkdir } from './walkdir';
import fs from 'fs';
import path from 'path';
import { getEnv } from './env';
import chalk from "chalk";

export function getUploadCallback(client: OSS, base: string): walkdirCallback {
  console.log('Current working Directory is', process.env);

  let callback: walkdirCallback = async (filepath) => {
    if (fs.lstatSync(filepath).isFile()) {
      console.log(chalk.green('UPLOAD'), filepath);
      await client.put(filepath.substr(base.length), filepath);
    }
  }
  return callback;
}

export async function uploadFolder(client: OSS) {
  const uploadBase = path.resolve(process.cwd(), getEnv('FOLDER'));
  const callback = getUploadCallback(client, uploadBase);
  const result = await walkdir(uploadBase, callback);
}

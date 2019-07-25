import path from 'path';
import chalk from 'chalk';
import Client from 'ssh2-sftp-client';
import recursive from 'recursive-readdir';
import uniq from 'lodash/uniq';
import packageJson from '../package.json';

const sftp = new Client();
const resourceDirpath = path.resolve(__dirname, '../dist');
const targetDirpath = '/var/www/spa-projects/' + packageJson.name;
const connection = {
    host: '94.191.98.222',
    port: '22',
    username: 'pmm',
    password: 'peng940805'
};

const dirRegExp = /\/(.*\/|)(.*)$/g;

const putDir = (localDir, remoteDir, sftp) => {
    return new Promise((resolve, reject) => {
        recursive(localDir, ['.DS_Store'])
          .then(files => (
            files
              .map(file => file.replace(localDir, ''))
              .map(file => file.replace(dirRegExp, `$1`))
              .filter(Boolean)
          ))
          .then(uniq)
          .then(dirs => Promise.all(
            dirs.map(dir => sftp.mkdir(`${remoteDir}/${dir}`, true))
          ))
          .then(() => recursive(localDir, ['.DS_Store']))
          .then(files => (
            files
              .map(file => file.replace(localDir, ''))
              .map(file => file.replace(dirRegExp, `$1`) + file.replace(dirRegExp, `$2`))
          ))
          .then(files => Promise.all(
            files.map(file => new Promise((resolve, reject) => {
                sftp.put(`${localDir}/${file}`, `${remoteDir}/${file}`)
                  .then(() => {
                    console.log(chalk.gray(`${file}\t\t`, 'uploaded.'));
                    resolve();
                  })
                  .catch(reject)
            }))
          ))
          .then(resolve)
          .catch(err => reject(Error(err)));
      });
};

const rmDir = async (remoteDir) => {
    const recursive = async (inpath) => {
        const list = await sftp.list(inpath);
        for (let i = 0; i < list.length; ++i) {
            const item = list[i];
            const itempath = inpath + '/' + item.name;
            if (item.type === '-') {
                await sftp.delete(itempath);
            } else if (item.type === 'd') {
                await recursive(itempath);
            }
        }
        await sftp.rmdir(inpath);
        return ;
    };
    await recursive(remoteDir);
    return ;
};

const isDirExisted = (pathname) => new Promise((resolve) => {
    sftp.list(pathname).then(() => resolve(true)).catch(() => resolve(false));
});

async function main(params) {
    try {
        console.log(chalk.blue('Connectiong to server ...'));
        await sftp.connect(params);
        console.log(chalk.blue('Connected to server.'))
        const dirExisted = await isDirExisted(targetDirpath);
        if (dirExisted) {
            console.log(chalk.yellow.bold(targetDirpath, 'existed, try remove it...'));
            await rmDir(targetDirpath);
            console.log(chalk.yellow.bold(targetDirpath, 'has beed removed.'));
        }
        await sftp.mkdir(targetDirpath);
        await putDir(resourceDirpath, targetDirpath, sftp);
        console.log(chalk.green.bold('Publish done!'));
    } catch (error) {
        console.log(error);
    } finally {
        sftp.end();
    }
    return;
}

main(connection);
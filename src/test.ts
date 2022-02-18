import { spawn, exec } from 'child_process';
import fs from 'fs';
import * as path from 'path';

const servers = fs
  .readdirSync(__dirname)
  .filter((item) => item.match(/^v.+js$/));

async function testServer(file: string, showLorum: boolean) {
  // Start server
  console.log(
    `Starting ${file} server ${showLorum ? 'with' : 'without'} lorum`
  );
  const server = spawn('node', [file], {
    env: { ...process.env, [showLorum ? 'LORUM' : 'BLAH']: 'true' },
  });
  // Wait for a second for it to start
  await sleep(1000);

  return new Promise((resolve, reject) => {
    console.log(`Running bombardier against ${file} server`);
    exec(
      '~/bombardier -c 125 -d 1s -o json -p r http://localhost:8080',
      (err, stdout, stderr) => {
        // Stop the server
        server.kill('SIGTERM');

        if (err || stderr) {
          console.log(err || stderr);
          reject(err || stderr);
          return;
        }

        resolve(stdout);
      }
    );
  });
}

async function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function run() {
  console.log('Starting tests...');
  const lorumResults = [];
  const noLorumResults = [];

  for (let i = 0; i < servers.length; i++) {
    const server = servers[i];
    const lorum = (await testServer(server, true)) as any;

    lorumResults.push({
      file: server,
      ...JSON.parse(lorum).result,
    });

    fs.writeFileSync(
      path.join(__dirname, '..', 'lorum.json'),
      JSON.stringify(lorumResults)
    );

    const noLorum = (await testServer(server, false)) as any;

    noLorumResults.push({
      file: server,
      ...JSON.parse(noLorum).result,
    });

    fs.writeFileSync(
      path.join(__dirname, '..', 'no-lorum.json'),
      JSON.stringify(noLorumResults)
    );
  }

  console.log('Done!');
}

run();

import { NextApiRequest, NextApiResponse } from "next";

const extensions = {
  cpp : 'cpp',
  python : 'py',
  javascript : 'js',
  typescript : 'ts',
  java : 'java',
  go : 'go',
  haskell : 'hs'
}

const code = async (req:NextApiRequest,res:NextApiResponse) : Promise<void|string> => {
    if(req.method !== 'POST') return 'Please make put request';
    const data = req.body;
    const response = await fetch(`https://glot.io/api/run/${data.language}/latest`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${process.env.TOKEN}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        files: [
          {
            name: `main.${extensions[data.language]}`,
            content: data.code,
          }
        ],
        stdin : data.stdin
      })
    });
    const result = await response.json();
    return res.json(result);
}

export default code;
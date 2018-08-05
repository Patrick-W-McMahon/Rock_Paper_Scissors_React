import fetch from 'isomorphic-fetch';

export default function PostMove (choice){
    return fetch("/api/match",{
        method: 'POST',
        //mode: 'CORS',
        body: JSON.stringify({choice}),
        headers: {'Content-Type': 'application/json'}
      }).then(res => res.json())
        .then(data => data).catch(err => { error: err });
}
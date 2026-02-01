import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  // On utilise l'adresse DNS spéciale pour sortir du conteneur
  const res = http.get('http://host.docker.internal/');
  
  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(1);
}
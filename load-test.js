import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10, // 10 utilisateurs virtuels
  duration: '30s', // pendant 30 secondes
};

export default function () {
  // Test de l'endpoint public de la newsletter
  const res = http.get('http://api:5000/api/email/subscribe'); 
  
  check(res, {
    'status is 405 or 200': (r) => r.status === 405 || r.status === 200,
    'transaction time < 200ms': (r) => r.timings.duration < 200,
  });

  sleep(1);
}
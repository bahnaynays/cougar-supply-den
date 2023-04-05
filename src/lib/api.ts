import axios from 'axios';
import { Person } from '../interfaces/Person';

const API_BASE_URL = 'https://axios-http.com/';

export async function getPeople(): Promise<Person[]> {
  const response = await axios.get<Person[]>(`${API_BASE_URL}/api/people`);
  return response.data;
}

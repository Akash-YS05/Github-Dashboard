import {useQuery} from 'react-query';
import { getRepositories } from '../services/github';

export const useRepositories = (org: any) => {
    return useQuery(['repos', org], ()=>getRepositories(org))
}
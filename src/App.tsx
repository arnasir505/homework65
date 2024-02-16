import { useCallback, useEffect, useState } from 'react';
import { ApiPage, Page } from './types';
import axiosApi from './axiosApi';
import { useParams } from 'react-router-dom';

function App() {
  const params = useParams();
  const [page, setPage] = useState<Page>({
    id: '',
    title: '',
    content: '',
  });

  const fetchData = useCallback(async () => {
    try {
      const response = await axiosApi.get<ApiPage | null>(
        params.id ? `/pages.json` : '/pages.json'
      );
      const page = response.data;
      console.log(page);
      console.log(params.id);
    } catch (error) {
      console.log(error);
    }
  }, [params.id]);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return <></>;
}

export default App;

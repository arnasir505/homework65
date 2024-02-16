import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosApi from '../../axiosApi';
import { ApiPage } from '../../types';

const DynamicPage: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState<ApiPage>({
    title: '',
    content: '',
  });

  const fetchPage = useCallback(async () => {
    try {
      const response = await axiosApi.get<ApiPage | null>(
        `/pages/${params.id}.json`
      );
      const page = response.data;
      if (page) {
        setPage({ title: page.title, content: page.content });
      } else {
        navigate('/404');
      }
    } catch (error) {
      console.log(error);
    }
  }, [params.id]);

  useEffect(() => {
    void fetchPage();
  }, [fetchPage]);

  return (
    <div className='container'>
      <h1>{page.title}</h1>
      <p>{page.content}</p>
    </div>
  );
};

export default DynamicPage;

import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosApi from '../../axiosApi';
import { ApiPage } from '../../types';
import Spinner from '../Spinner/Spinner';

const DynamicPage: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState<ApiPage>({
    title: '',
    content: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchPage = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axiosApi.get<ApiPage | null>(
        `/pages/${params.id}.json`
      );
      const page = response.data;
      if (page) {
        setPage({ title: page.title, content: page.content });
      } else {
        navigate('/404');
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    void fetchPage();
  }, [fetchPage]);

  let pageContent = (
    <div className='mt-5'>
      <Spinner />
    </div>
  );

  if (page.title && page.content && !isLoading) {
    pageContent = (
      <div className='container text-light pt-5'>
        <h1 className='text-center mb-3'>{page.title}</h1>
        <p className='fs-4 lh-lg'>{page.content}</p>
      </div>
    );
  }

  return pageContent;
};

export default DynamicPage;

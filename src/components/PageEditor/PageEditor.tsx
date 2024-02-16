import { useState } from 'react';
import React from 'react';
import { ApiPage, Page, Title } from '../../types';
import axiosApi from '../../axiosApi';
import { useNavigate } from 'react-router-dom';

interface Props {
  titles: Title[];
}

const PageEditor: React.FC<Props> = ({ titles }) => {
  const navigate = useNavigate();

  const [page, setPage] = useState<Page>({
    id: '',
    title: '',
    content: '',
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setPage((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      const response = await axiosApi.get<ApiPage | null>(
        `/pages/${e.target.value}.json`
      );
      const page = response.data;
      if (page) {
        setPage((prevState) => ({
          ...prevState,
          title: page.title,
          content: page.content,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axiosApi.put(`/pages/${page.id}.json`, {
      title: page.title,
      content: page.content,
    });
    setPage({ id: '', title: '', content: '' });
    navigate(`/pages/${[page.id]}`);
  };

  return (
    <div className='container'>
      <div className='col-md-6 text-light'>
        <h2 className='my-3'>Edit Page</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='mb-3'>
            <label htmlFor='page' className='form-label'>
              Select Page
            </label>
            <select
              name='id'
              id='page'
              className='form-select bg-dark text-light border-0'
              required
              value={page.id}
              onChange={(e) => (handleSelect(e), handleChange(e))}
            >
              <option disabled value={''}>
                Choose...
              </option>
              {titles.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
          <div className='mb-3'>
            <label htmlFor='title' className='form-label'>
              Title
            </label>
            <input
              type='text'
              name='title'
              id='title'
              className='form-control bg-dark text-light border-0'
              required
              value={page.title}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='content' className='form-label'>
              Content
            </label>
            <textarea
              name='content'
              id='content'
              className='form-control bg-dark text-light border-0'
              rows={8}
              required
              value={page.content}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <button type='submit' className='btn bg-info fw-bold text-dark '>
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default PageEditor;

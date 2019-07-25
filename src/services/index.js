import fetch from './fetch';

export const getArticles = async () => {
  const res = await fetch({
    url: '/article',
    params: {
      start: 0,
      limit: 20,
    },
  });
  return res;
};

export const createArticle = async (article) => {
  const res = await fetch({
    url: '/article',
    method: 'post',
    data: article,
  });
  return res;
};

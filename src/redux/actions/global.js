import * as constant from '../constant';
import * as fetchData from '../../services';

export default {
  updateName: name => (dispatch) => {
    dispatch({
      type: constant.UPDATE_NAME,
      data: name,
    });
  },
  setName: name => ({
    type: constant.SET_NAME,
    data: name,
  }),
  getArticles: () => async (dispatch) => {
    const list = await fetchData.getArticles();
    dispatch({
      type: 'UPDATE_ARTICLES',
      data: list,
    });
    console.log(list);
  },
  createArticle: article => async (dispatch) => {
    const res = await fetchData.createArticle(article);
    console.log(res);
    dispatch({
      type: 'abc',
      data: res,
    });
  },
};

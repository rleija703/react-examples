import CatList from './pages/CatList';
import AddCat from './pages/AddCat';
import SingleCat from './pages/SingleCat';

export default [
  {
    path: '/',
    Component: CatList,
  },
  {
    path: '/add',
    Component: AddCat,
  },
  {
    path: '/cat/:name',
    Component: SingleCat,
  },
];